import User from '@/models/User';
import Board from '@/models/Board';
import Pin from '@/models/Pin';
import Category from '@/models/Category';
import Follow from '@/models/Follow';
import Save from '@/models/Save';
import Like from '@/models/Like';
import Comment from '@/models/Comment';
import BoardCollaborator from '@/models/BoardCollaborator';
import BoardFollower from '@/models/BoardFollower';
import Notification from '@/models/Notification';
import SearchHistory from '@/models/SearchHistory';
import PinView from '@/models/PinView';

let associationsSetup = false;

export function setupAssociations() {
  // Prevent duplicate association setup
  if (associationsSetup) {
    return;
  }

  // User associations
  User.hasMany(Board, { foreignKey: 'userId', as: 'boards', onDelete: 'CASCADE' });
  User.hasMany(Pin, { foreignKey: 'userId', as: 'pins', onDelete: 'CASCADE' });
  User.hasMany(Save, { foreignKey: 'userId', as: 'saves', onDelete: 'CASCADE' });
  User.hasMany(Like, { foreignKey: 'userId', as: 'likes', onDelete: 'CASCADE' });
  User.hasMany(Comment, { foreignKey: 'userId', as: 'comments', onDelete: 'CASCADE' });
  User.hasMany(Notification, { foreignKey: 'userId', as: 'notifications', onDelete: 'CASCADE' });
  User.hasMany(SearchHistory, { foreignKey: 'userId', as: 'searchHistory', onDelete: 'CASCADE' });
  User.hasMany(PinView, { foreignKey: 'userId', as: 'pinViews', onDelete: 'SET NULL' });

  // Follow associations (User follows)
  User.belongsToMany(User, {
    through: Follow,
    as: 'followers',
    foreignKey: 'followingId',
    otherKey: 'followerId',
  });
  User.belongsToMany(User, {
    through: Follow,
    as: 'following',
    foreignKey: 'followerId',
    otherKey: 'followingId',
  });

  Follow.belongsTo(User, { foreignKey: 'followerId', as: 'follower' });
  Follow.belongsTo(User, { foreignKey: 'followingId', as: 'following' });

  // Board associations
  Board.belongsTo(User, { foreignKey: 'userId', as: 'owner', onDelete: 'CASCADE' });
  Board.belongsTo(Category, { foreignKey: 'categoryId', as: 'category', onDelete: 'SET NULL' });
  Board.hasMany(Pin, { foreignKey: 'boardId', as: 'pins', onDelete: 'SET NULL' });

  // Board collaborators association
  Board.belongsToMany(User, {
    through: BoardCollaborator,
    as: 'collaborators',
    foreignKey: 'boardId',
    otherKey: 'userId',
  });
  Board.hasMany(BoardCollaborator, { foreignKey: 'boardId', as: 'collaboratorships', onDelete: 'CASCADE' });

  BoardCollaborator.belongsTo(Board, { foreignKey: 'boardId', as: 'board', onDelete: 'CASCADE' });
  BoardCollaborator.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
  BoardCollaborator.belongsTo(User, { foreignKey: 'invitedBy', as: 'inviter', onDelete: 'CASCADE' });

  // Board followers association
  Board.belongsToMany(User, {
    through: BoardFollower,
    as: 'followers',
    foreignKey: 'boardId',
    otherKey: 'userId',
  });
  Board.hasMany(BoardFollower, { foreignKey: 'boardId', as: 'followerships', onDelete: 'CASCADE' });

  BoardFollower.belongsTo(Board, { foreignKey: 'boardId', as: 'board', onDelete: 'CASCADE' });
  BoardFollower.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });

  // Pin associations
  Pin.belongsTo(User, { foreignKey: 'userId', as: 'creator', onDelete: 'CASCADE' });
  Pin.belongsTo(Board, { foreignKey: 'boardId', as: 'board', onDelete: 'SET NULL' });
  Pin.belongsTo(Category, { foreignKey: 'categoryId', as: 'category', onDelete: 'SET NULL' });
  Pin.hasMany(Save, { foreignKey: 'pinId', as: 'saves', onDelete: 'CASCADE' });
  Pin.hasMany(Like, { foreignKey: 'pinId', as: 'likes', onDelete: 'CASCADE' });
  Pin.hasMany(Comment, { foreignKey: 'pinId', as: 'comments', onDelete: 'CASCADE' });
  Pin.hasMany(PinView, { foreignKey: 'pinId', as: 'views', onDelete: 'CASCADE' });

  // Save associations
  Save.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
  Save.belongsTo(Pin, { foreignKey: 'pinId', as: 'pin', onDelete: 'CASCADE' });
  Save.belongsTo(Board, { foreignKey: 'boardId', as: 'board', onDelete: 'CASCADE' });

  // Like associations
  Like.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });
  Like.belongsTo(Pin, { foreignKey: 'pinId', as: 'pin', onDelete: 'CASCADE' });

  // Comment associations
  Comment.belongsTo(User, { foreignKey: 'userId', as: 'author', onDelete: 'CASCADE' });
  Comment.belongsTo(Pin, { foreignKey: 'pinId', as: 'pin', onDelete: 'CASCADE' });
  Comment.belongsTo(Comment, { foreignKey: 'parentCommentId', as: 'parentComment', onDelete: 'CASCADE' });
  Comment.hasMany(Comment, { foreignKey: 'parentCommentId', as: 'replies', onDelete: 'CASCADE' });

  // Category associations
  Category.hasMany(Pin, { foreignKey: 'categoryId', as: 'pins', onDelete: 'SET NULL' });
  Category.hasMany(Board, { foreignKey: 'categoryId', as: 'boards', onDelete: 'SET NULL' });

  // Notification associations
  Notification.belongsTo(User, { foreignKey: 'userId', as: 'recipient', onDelete: 'CASCADE' });
  Notification.belongsTo(User, { foreignKey: 'actorId', as: 'actor', onDelete: 'CASCADE' });
  Notification.belongsTo(Pin, { foreignKey: 'pinId', as: 'pin', onDelete: 'CASCADE' });
  Notification.belongsTo(Board, { foreignKey: 'boardId', as: 'board', onDelete: 'CASCADE' });
  Notification.belongsTo(Comment, { foreignKey: 'commentId', as: 'comment', onDelete: 'CASCADE' });

  // SearchHistory associations
  SearchHistory.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'CASCADE' });

  // PinView associations
  PinView.belongsTo(Pin, { foreignKey: 'pinId', as: 'pin', onDelete: 'CASCADE' });
  PinView.belongsTo(User, { foreignKey: 'userId', as: 'user', onDelete: 'SET NULL' });

  associationsSetup = true;
  console.log('✅ Model associations established successfully.');
}

export default setupAssociations;
