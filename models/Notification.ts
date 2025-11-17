import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize';

export type NotificationType = 'follow' | 'like' | 'comment' | 'save' | 'mention' | 'collaborator';

export interface NotificationAttributes {
  id: string;
  userId: string;
  type: NotificationType;
  actorId: string;
  pinId: string | null;
  boardId: string | null;
  commentId: string | null;
  content: string;
  isRead: boolean;
  createdAt: Date;
}

export interface NotificationCreationAttributes
  extends Optional<
    NotificationAttributes,
    'id' | 'pinId' | 'boardId' | 'commentId' | 'isRead' | 'createdAt'
  > {}

class Notification
  extends Model<NotificationAttributes, NotificationCreationAttributes>
  implements NotificationAttributes
{
  declare id: string;
  declare userId: string;
  declare type: NotificationType;
  declare actorId: string;
  declare pinId: string | null;
  declare boardId: string | null;
  declare commentId: string | null;
  declare content: string;
  declare isRead: boolean;
  declare readonly createdAt: Date;
}

Notification.init(
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
    type: {
      type: DataTypes.ENUM('follow', 'like', 'comment', 'save', 'mention', 'collaborator'),
      allowNull: false,
    },
    actorId: {
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
      allowNull: true,
      references: {
        model: 'pins',
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
      onDelete: 'CASCADE',
    },
    commentId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'comments',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    content: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    isRead: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Notification',
    tableName: 'notifications',
    timestamps: false,
    createdAt: true,
    updatedAt: false,
    indexes: [
      { fields: ['userId'] },
      { fields: ['actorId'] },
      { fields: ['type'] },
      { fields: ['isRead'] },
      { fields: ['createdAt'] },
      { fields: ['userId', 'isRead'] },
    ],
  }
);

export default Notification;
