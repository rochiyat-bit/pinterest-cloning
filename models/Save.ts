import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize';

export interface SaveAttributes {
  id: string;
  userId: string;
  pinId: string;
  boardId: string;
  note: string | null;
  createdAt: Date;
}

export interface SaveCreationAttributes
  extends Optional<SaveAttributes, 'id' | 'note' | 'createdAt'> {}

class Save extends Model<SaveAttributes, SaveCreationAttributes> implements SaveAttributes {
  declare id: string;
  declare userId: string;
  declare pinId: string;
  declare boardId: string;
  declare note: string | null;
  declare readonly createdAt: Date;
}

Save.init(
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
    boardId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'boards',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    note: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 500],
      },
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Save',
    tableName: 'saves',
    timestamps: false,
    createdAt: true,
    updatedAt: false,
    indexes: [
      { fields: ['userId'] },
      { fields: ['pinId'] },
      { fields: ['boardId'] },
      { fields: ['userId', 'pinId', 'boardId'], unique: true },
      { fields: ['createdAt'] },
    ],
  }
);

export default Save;
