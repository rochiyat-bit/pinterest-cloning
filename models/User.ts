import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize';

export interface UserAttributes {
  id: string;
  email: string;
  username: string;
  password: string | null;
  firstName: string | null;
  lastName: string | null;
  bio: string | null;
  avatarUrl: string | null;
  coverImageUrl: string | null;
  website: string | null;
  location: string | null;
  emailVerified: Date | null;
  isActive: boolean;
  isPremium: boolean;
  premiumExpiresAt: Date | null;
  followersCount: number;
  followingCount: number;
  pinsCount: number;
  boardsCount: number;
  lastLoginAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface UserCreationAttributes
  extends Optional<
    UserAttributes,
    | 'id'
    | 'password'
    | 'firstName'
    | 'lastName'
    | 'bio'
    | 'avatarUrl'
    | 'coverImageUrl'
    | 'website'
    | 'location'
    | 'emailVerified'
    | 'isActive'
    | 'isPremium'
    | 'premiumExpiresAt'
    | 'followersCount'
    | 'followingCount'
    | 'pinsCount'
    | 'boardsCount'
    | 'lastLoginAt'
    | 'createdAt'
    | 'updatedAt'
  > {}

class User extends Model<UserAttributes, UserCreationAttributes> implements UserAttributes {
  declare id: string;
  declare email: string;
  declare username: string;
  declare password: string | null;
  declare firstName: string | null;
  declare lastName: string | null;
  declare bio: string | null;
  declare avatarUrl: string | null;
  declare coverImageUrl: string | null;
  declare website: string | null;
  declare location: string | null;
  declare emailVerified: Date | null;
  declare isActive: boolean;
  declare isPremium: boolean;
  declare premiumExpiresAt: Date | null;
  declare followersCount: number;
  declare followingCount: number;
  declare pinsCount: number;
  declare boardsCount: number;
  declare lastLoginAt: Date | null;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Helper method to get full name
  get fullName(): string {
    if (this.firstName && this.lastName) {
      return `${this.firstName} ${this.lastName}`;
    }
    return this.firstName || this.lastName || this.username;
  }

  // Helper method to check if premium is active
  get isPremiumActive(): boolean {
    if (!this.isPremium) return false;
    if (!this.premiumExpiresAt) return this.isPremium;
    return new Date() < this.premiumExpiresAt;
  }
}

User.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    email: {
      type: DataTypes.STRING(255),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      unique: true,
      validate: {
        len: [3, 50],
        is: /^[a-zA-Z0-9_]+$/,
      },
    },
    password: {
      type: DataTypes.STRING(255),
      allowNull: true, // Null for OAuth users
    },
    firstName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    lastName: {
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    bio: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 500],
      },
    },
    avatarUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    coverImageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    website: {
      type: DataTypes.STRING(255),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    location: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    emailVerified: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
    isPremium: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    premiumExpiresAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    followersCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    followingCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    pinsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    boardsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    lastLoginAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    updatedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'User',
    tableName: 'users',
    timestamps: true,
    indexes: [
      { fields: ['email'], unique: true },
      { fields: ['username'], unique: true },
      { fields: ['createdAt'] },
      { fields: ['isPremium'] },
      { fields: ['isActive'] },
    ],
  }
);

export default User;
