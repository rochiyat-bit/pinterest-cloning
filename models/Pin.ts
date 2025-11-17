import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize';

export interface PinAttributes {
  id: string;
  userId: string;
  boardId: string | null;
  title: string;
  description: string | null;
  imageUrl: string;
  imageWidth: number;
  imageHeight: number;
  thumbnailUrl: string;
  originalUrl: string | null;
  altText: string | null;
  dominantColor: string | null;
  isVideo: boolean;
  videoUrl: string | null;
  savesCount: number;
  likesCount: number;
  commentsCount: number;
  viewsCount: number;
  categoryId: string | null;
  tags: string[];
  slug: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface PinCreationAttributes
  extends Optional<
    PinAttributes,
    | 'id'
    | 'boardId'
    | 'description'
    | 'originalUrl'
    | 'altText'
    | 'dominantColor'
    | 'isVideo'
    | 'videoUrl'
    | 'savesCount'
    | 'likesCount'
    | 'commentsCount'
    | 'viewsCount'
    | 'categoryId'
    | 'tags'
    | 'createdAt'
    | 'updatedAt'
  > {}

class Pin extends Model<PinAttributes, PinCreationAttributes> implements PinAttributes {
  declare id: string;
  declare userId: string;
  declare boardId: string | null;
  declare title: string;
  declare description: string | null;
  declare imageUrl: string;
  declare imageWidth: number;
  declare imageHeight: number;
  declare thumbnailUrl: string;
  declare originalUrl: string | null;
  declare altText: string | null;
  declare dominantColor: string | null;
  declare isVideo: boolean;
  declare videoUrl: string | null;
  declare savesCount: number;
  declare likesCount: number;
  declare commentsCount: number;
  declare viewsCount: number;
  declare categoryId: string | null;
  declare tags: string[];
  declare slug: string;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Helper method to get aspect ratio
  get aspectRatio(): number {
    return this.imageWidth / this.imageHeight;
  }

  // Helper method to calculate engagement score
  get engagementScore(): number {
    return this.savesCount * 3 + this.likesCount * 2 + this.commentsCount * 5 + this.viewsCount * 0.1;
  }
}

Pin.init(
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
    boardId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'boards',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
      validate: {
        len: [1, 255],
      },
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
      validate: {
        len: [0, 1000],
      },
    },
    imageUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    imageWidth: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    imageHeight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    thumbnailUrl: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    originalUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
      validate: {
        isUrl: true,
      },
    },
    altText: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    dominantColor: {
      type: DataTypes.STRING(7),
      allowNull: true,
    },
    isVideo: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    videoUrl: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    savesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    likesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    commentsCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
    },
    viewsCount: {
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
    tags: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      defaultValue: [],
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(300),
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
    modelName: 'Pin',
    tableName: 'pins',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['boardId'] },
      { fields: ['categoryId'] },
      { fields: ['slug'] },
      { fields: ['createdAt'] },
      { fields: ['savesCount'] },
      { fields: ['likesCount'] },
      { fields: ['tags'], using: 'gin' }, // For PostgreSQL array search
    ],
  }
);

export default Pin;
