import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize';

export interface BoardAttributes {
  id: string;
  userId: string;
  name: string;
  description: string | null;
  coverImageUrl: string | null;
  isPrivate: boolean;
  isSecret: boolean;
  pinsCount: number;
  followersCount: number;
  collaboratorsCount: number;
  categoryId: string | null;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface BoardCreationAttributes
  extends Optional<
    BoardAttributes,
    | 'id'
    | 'description'
    | 'coverImageUrl'
    | 'isPrivate'
    | 'isSecret'
    | 'pinsCount'
    | 'followersCount'
    | 'collaboratorsCount'
    | 'categoryId'
    | 'createdAt'
    | 'updatedAt'
  > {}

class Board extends Model<BoardAttributes, BoardCreationAttributes> implements BoardAttributes {
  declare id: string;
  declare userId: string;
  declare name: string;
  declare description: string | null;
  declare coverImageUrl: string | null;
  declare isPrivate: boolean;
  declare isSecret: boolean;
  declare pinsCount: number;
  declare followersCount: number;
  declare collaboratorsCount: number;
  declare categoryId: string | null;
  declare slug: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Helper method to check visibility
  get isPublic(): boolean {
    return !this.isPrivate && !this.isSecret;
  }
}

Board.init(
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
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      validate: {
        len: [1, 100],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 500],
      },
    },
    coverImageUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    isPrivate: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    isSecret: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    pinsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    followersCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    collaboratorsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    categoryId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'categories',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    slug: {
      type: DataTypes.STRING(150),
      allowNull: false,
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
    modelName: 'Board',
    tableName: 'boards',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['slug'] },
      { fields: ['categoryId'] },
      { fields: ['isPrivate', 'isSecret'] },
      { fields: ['createdAt'] },
      { fields: ['pinsCount'] },
    ],
  }
);

export default Board;
