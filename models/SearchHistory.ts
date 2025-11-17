import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize';

export interface SearchHistoryAttributes {
  id: string;
  userId: string;
  query: string;
  resultsCount: number;
  createdAt: Date;
}

export interface SearchHistoryCreationAttributes
  extends Optional<SearchHistoryAttributes, 'id' | 'createdAt'> {}

class SearchHistory
  extends Model<SearchHistoryAttributes, SearchHistoryCreationAttributes>
  implements SearchHistoryAttributes
{
  declare id: string;
  declare userId: string;
  declare query: string;
  declare resultsCount: number;
  declare readonly createdAt: Date;
}

SearchHistory.init(
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
    query: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    resultsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'SearchHistory',
    tableName: 'search_histories',
    timestamps: false,
    createdAt: true,
    updatedAt: false,
    indexes: [
      { fields: ['userId'] },
      { fields: ['query'] },
      { fields: ['createdAt'] },
    ],
  }
);

export default SearchHistory;
