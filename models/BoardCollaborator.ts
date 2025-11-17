import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize';

export type CollaboratorRole = 'editor' | 'viewer';

export interface BoardCollaboratorAttributes {
  id: string;
  boardId: string;
  userId: string;
  role: CollaboratorRole;
  invitedBy: string;
  acceptedAt: Date | null;
  createdAt: Date;
}

export interface BoardCollaboratorCreationAttributes
  extends Optional<BoardCollaboratorAttributes, 'id' | 'acceptedAt' | 'createdAt'> {}

class BoardCollaborator
  extends Model<BoardCollaboratorAttributes, BoardCollaboratorCreationAttributes>
  implements BoardCollaboratorAttributes
{
  declare id: string;
  declare boardId: string;
  declare userId: string;
  declare role: CollaboratorRole;
  declare invitedBy: string;
  declare acceptedAt: Date | null;
  declare readonly createdAt: Date;

  // Helper method to check if invitation is accepted
  get isAccepted(): boolean {
    return this.acceptedAt !== null;
  }

  // Helper method to check if user can edit
  get canEdit(): boolean {
    return this.role === 'editor' && this.isAccepted;
  }
}

BoardCollaborator.init(
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
    role: {
      type: DataTypes.ENUM('editor', 'viewer'),
      allowNull: false,
      defaultValue: 'viewer',
    },
    invitedBy: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'CASCADE',
    },
    acceptedAt: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'BoardCollaborator',
    tableName: 'board_collaborators',
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

export default BoardCollaborator;
