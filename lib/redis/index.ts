import Redis from 'ioredis';

// Create Redis client
const redis = new Redis({
  host: process.env.REDIS_HOST || 'localhost',
  port: parseInt(process.env.REDIS_PORT || '6379'),
  password: process.env.REDIS_PASSWORD,
  maxRetriesPerRequest: 3,
  retryStrategy: (times) => {
    const delay = Math.min(times * 50, 2000);
    return delay;
  },
  enableReadyCheck: true,
  lazyConnect: true,
});

// Handle Redis events
redis.on('connect', () => {
  console.log('✅ Redis client connected');
});

redis.on('ready', () => {
  console.log('✅ Redis client ready');
});

redis.on('error', (err) => {
  console.error('❌ Redis client error:', err);
});

redis.on('close', () => {
  console.log('⚠️  Redis client closed');
});

/**
 * Connect to Redis
 */
export async function connectRedis() {
  try {
    await redis.connect();
    return true;
  } catch (error) {
    console.error('Failed to connect to Redis:', error);
    return false;
  }
}

/**
 * Get value from cache
 */
export async function cacheGet<T>(key: string): Promise<T | null> {
  try {
    const data = await redis.get(key);
    if (!data) return null;
    return JSON.parse(data) as T;
  } catch (error) {
    console.error(`Cache get error for key ${key}:`, error);
    return null;
  }
}

/**
 * Set value in cache with optional TTL
 */
export async function cacheSet(
  key: string,
  value: any,
  ttl: number = 3600
): Promise<boolean> {
  try {
    const serialized = JSON.stringify(value);
    if (ttl > 0) {
      await redis.setex(key, ttl, serialized);
    } else {
      await redis.set(key, serialized);
    }
    return true;
  } catch (error) {
    console.error(`Cache set error for key ${key}:`, error);
    return false;
  }
}

/**
 * Delete key from cache
 */
export async function cacheDelete(key: string): Promise<boolean> {
  try {
    await redis.del(key);
    return true;
  } catch (error) {
    console.error(`Cache delete error for key ${key}:`, error);
    return false;
  }
}

/**
 * Delete multiple keys by pattern
 */
export async function cacheDeletePattern(pattern: string): Promise<number> {
  try {
    const keys = await redis.keys(pattern);
    if (keys.length === 0) return 0;
    return await redis.del(...keys);
  } catch (error) {
    console.error(`Cache delete pattern error for ${pattern}:`, error);
    return 0;
  }
}

/**
 * Check if key exists
 */
export async function cacheExists(key: string): Promise<boolean> {
  try {
    const result = await redis.exists(key);
    return result === 1;
  } catch (error) {
    console.error(`Cache exists error for key ${key}:`, error);
    return false;
  }
}

/**
 * Increment counter
 */
export async function cacheIncrement(key: string, amount: number = 1): Promise<number> {
  try {
    return await redis.incrby(key, amount);
  } catch (error) {
    console.error(`Cache increment error for key ${key}:`, error);
    return 0;
  }
}

/**
 * Decrement counter
 */
export async function cacheDecrement(key: string, amount: number = 1): Promise<number> {
  try {
    return await redis.decrby(key, amount);
  } catch (error) {
    console.error(`Cache decrement error for key ${key}:`, error);
    return 0;
  }
}

/**
 * Set expiration time for key
 */
export async function cacheExpire(key: string, seconds: number): Promise<boolean> {
  try {
    const result = await redis.expire(key, seconds);
    return result === 1;
  } catch (error) {
    console.error(`Cache expire error for key ${key}:`, error);
    return false;
  }
}

/**
 * Get multiple keys
 */
export async function cacheGetMultiple<T>(keys: string[]): Promise<(T | null)[]> {
  try {
    if (keys.length === 0) return [];
    const values = await redis.mget(...keys);
    return values.map(v => v ? JSON.parse(v) as T : null);
  } catch (error) {
    console.error('Cache get multiple error:', error);
    return keys.map(() => null);
  }
}

/**
 * Set multiple keys
 */
export async function cacheSetMultiple(
  items: Array<{ key: string; value: any; ttl?: number }>
): Promise<boolean> {
  try {
    const pipeline = redis.pipeline();

    for (const item of items) {
      const serialized = JSON.stringify(item.value);
      if (item.ttl && item.ttl > 0) {
        pipeline.setex(item.key, item.ttl, serialized);
      } else {
        pipeline.set(item.key, serialized);
      }
    }

    await pipeline.exec();
    return true;
  } catch (error) {
    console.error('Cache set multiple error:', error);
    return false;
  }
}

/**
 * Cache key builders for consistency
 */
export const CacheKeys = {
  user: (id: string) => `user:${id}`,
  userProfile: (username: string) => `user:profile:${username}`,
  pin: (id: string) => `pin:${id}`,
  board: (id: string) => `board:${id}`,
  feed: (userId: string, page: number) => `feed:${userId}:${page}`,
  trending: (timeframe: string, page: number) => `trending:${timeframe}:${page}`,
  search: (query: string, page: number) => `search:${query}:${page}`,
  userPins: (userId: string, page: number) => `user:${userId}:pins:${page}`,
  userBoards: (userId: string, page: number) => `user:${userId}:boards:${page}`,
  boardPins: (boardId: string, page: number) => `board:${boardId}:pins:${page}`,
  categoryPins: (categoryId: string, page: number) => `category:${categoryId}:pins:${page}`,
  userFollowers: (userId: string) => `user:${userId}:followers`,
  userFollowing: (userId: string) => `user:${userId}:following`,
};

export default redis;
