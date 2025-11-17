import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize';

export interface CommentAttributes {
  id: string;
  userId: string;
  pinId: string;
  parentCommentId: string | null;
  content: string;
  likesCount: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface CommentCreationAttributes
  extends Optional<
    CommentAttributes,
    'id' | 'parentCommentId' | 'likesCount' | 'createdAt' | 'updatedAt'
  > {}

class Comment
  extends Model<CommentAttributes, CommentCreationAttributes>
  implements CommentAttributes
{
  declare id: string;
  declare userId: string;
  declare pinId: string;
  declare parentCommentId: string | null;
  declare content: string;
  declare likesCount: number;
  declare readonly createdAt: Date;
  declare readonly updatedAt: Date;

  // Helper method to check if it's a reply
  get isReply(): boolean {
    return this.parentCommentId !== null;
  }
}

Comment.init(
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
    parentCommentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'comments',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [1, 500],
      },
    },
    likesCount: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
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
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: true,
    indexes: [
      { fields: ['userId'] },
      { fields: ['pinId'] },
      { fields: ['parentCommentId'] },
      { fields: ['createdAt'] },
    ],
  }
);

export default Comment;
