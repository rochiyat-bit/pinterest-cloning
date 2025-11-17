import { DataTypes, Model, Optional } from 'sequelize';
import sequelize from '@/lib/sequelize';

export interface PinViewAttributes {
  id: string;
  pinId: string;
  userId: string | null;
  ipAddress: string;
  userAgent: string;
  referrer: string | null;
  createdAt: Date;
}

export interface PinViewCreationAttributes
  extends Optional<PinViewAttributes, 'id' | 'userId' | 'referrer' | 'createdAt'> {}

class PinView
  extends Model<PinViewAttributes, PinViewCreationAttributes>
  implements PinViewAttributes
{
  declare id: string;
  declare pinId: string;
  declare userId: string | null;
  declare ipAddress: string;
  declare userAgent: string;
  declare referrer: string | null;
  declare readonly createdAt: Date;
}

PinView.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
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
    userId: {
      type: DataTypes.UUID,
      allowNull: true,
      references: {
        model: 'users',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    ipAddress: {
      type: DataTypes.INET,
      allowNull: false,
    },
    userAgent: {
      type: DataTypes.STRING(500),
      allowNull: false,
    },
    referrer: {
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    createdAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'PinView',
    tableName: 'pin_views',
    timestamps: false,
    createdAt: true,
    updatedAt: false,
    indexes: [
      { fields: ['pinId'] },
      { fields: ['userId'] },
      { fields: ['createdAt'] },
      { fields: ['ipAddress'] },
    ],
  }
);

export default PinView;
