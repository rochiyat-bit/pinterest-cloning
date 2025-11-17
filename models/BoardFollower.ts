import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize';

export interface BoardFollowerAttributes {
  id: string;
  boardId: string;
  userId: string;
  createdAt: Date;
}

export interface BoardFollowerCreationAttributes
  extends Optional<BoardFollowerAttributes, 'id' | 'createdAt'> {}

class BoardFollower
  extends Model<BoardFollowerAttributes, BoardFollowerCreationAttributes>
  implements BoardFollowerAttributes
{
  declare id: string;
  declare boardId: string;
  declare userId: string;
  declare readonly createdAt: Date;
}

BoardFollower.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    boardId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'boards',
        key: 'id',
      },
      onDelete: 'CASCADE',
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
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BoardFollower',
    tableName: 'board_followers',
    timestamps: false,
    createdAt: true,
    updatedAt: false,
    indexes: [
      { fields: ['boardId'] },
      { fields: ['userId'] },
      { fields: ['boardId', 'userId'], unique: true },
    ],
  }
);

export default BoardFollower;
