import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize';

export interface FollowAttributes {
  id: string;
  followerId: string; // User who follows
  followingId: string; // User being followed
  createdAt: Date;
}

export interface FollowCreationAttributes
  extends Optional<FollowAttributes, 'id' | 'createdAt'> {}

class Follow extends Model<FollowAttributes, FollowCreationAttributes> implements FollowAttributes {
  declare id: string;
  declare followerId: string;
  declare followingId: string;
  declare readonly createdAt: Date;
}

Follow.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    followerId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    followingId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Follow',
    tableName: 'follows',
    timestamps: false,
    createdAt: true,
    updatedAt: false,
    indexes: [
      { fields: ['followerId'] },
      { fields: ['followingId'] },
      { fields: ['followerId', 'followingId'], unique: true },
    ],
  }
);

export default Follow;
