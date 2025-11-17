import sequelize, { testConnection } from './index';
import { setupAssociations } from './associations';

let initialized = false;

export async function initializeDatabase() {
  if (initialized) {
    return true;
  }

  try {
    // Test database connection
    const connected = await testConnection();
    if (!connected) {
      throw new Error('Failed to connect to database');
    }

    // Setup model associations
    setupAssociations();

    // Sync models in development (use migrations in production)
    if (process.env.NODE_ENV === 'development' && process.env.DB_SYNC === 'true') {
      await sequelize.sync({ alter: false });
      console.log('✅ Database synchronized.');
    }

    initialized = true;
    return true;
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
    return false;
  }
}

export default initializeDatabase;
