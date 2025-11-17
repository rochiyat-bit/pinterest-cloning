import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize';

export interface CategoryAttributes {
  id: string;
  name: string;
  slug: string;
  description: string | null;
  iconUrl: string | null;
  pinsCount: number;
  boardsCount: number;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface CategoryCreationAttributes
  extends Optional<
    CategoryAttributes,
    | 'id'
    | 'description'
    | 'iconUrl'
    | 'pinsCount'
    | 'boardsCount'
    | 'isActive'
    | 'createdAt'
    | 'updatedAt'
  > {}

class Category
  extends Model<CategoryAttributes, CategoryCreationAttributes>
  implements CategoryAttributes
{
  declare id: string;
  declare name: string;
  declare slug: string;
  declare description: string | null;
  declare iconUrl: string | null;
  declare pinsCount: number;
  declare boardsCount: number;
  declare isActive: boolean;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;
}

Category.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    slug: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    iconUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
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
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
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
    modelName: 'Category',
    tableName: 'categories',
    timestamps: true,
    indexes: [
      { fields: ['slug'], unique: true },
      { fields: ['name'], unique: true },
      { fields: ['isActive'] },
    ],
  }
);

export default Category;
