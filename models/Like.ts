import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize';

export interface LikeAttributes {
  id: string;
  userId: string;
  pinId: string;
  createdAt: Date;
}

export interface LikeCreationAttributes
  extends Optional<LikeAttributes, 'id' | 'createdAt'> {}

class Like extends Model<LikeAttributes, LikeCreationAttributes> implements LikeAttributes {
  declare id: string;
  declare userId: string;
  declare pinId: string;
  declare readonly createdAt: Date;
}

Like.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    pinId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'pins',
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
    modelName: 'Like',
    tableName: 'likes',
    timestamps: false,
    createdAt: true,
    updatedAt: false,
    indexes: [
      { fields: ['userId'] },
      { fields: ['pinId'] },
      { fields: ['userId', 'pinId'], unique: true },
      { fields: ['createdAt'] },
    ],
  }
);

export default Like;
