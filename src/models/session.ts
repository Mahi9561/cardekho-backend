/* eslint-disable @typescript-eslint/brace-style */
import { DataTypes, Optional, Model } from "sequelize";
import sequelize from ".";

interface SessionAttributes {
  session_id: number;
  user_id: number;
  token: string;
  device: string | null;
  ip_address: string | null;
  expiresAt: Date;
  createdOn: Date;
}

export interface SessionInput
  extends Optional<SessionAttributes, "session_id"> {}

class Sessions
  extends Model<SessionAttributes, SessionInput>
  implements SessionAttributes
{
  public session_id!: number;
  public user_id!: number;
  public token!: string;
  public device!: string | null;
  public ip_address!: string | null;
  public expiresAt!: Date;
  public createdOn!: Date;
}

Sessions.init(
  {
    user_id: {
      field: "User_ID",
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    token: {
      field: "Token",
      type: DataTypes.TEXT,
      allowNull: false,
    },
    device: {
      field: "Device",
      type: DataTypes.STRING,
      allowNull: true,
    },
    ip_address: {
      field: "IP_Address",
      type: DataTypes.STRING,
      allowNull: true,
    },
    expiresAt: {
      field: "Expires_At",
      type: DataTypes.DATE(6),
      allowNull: false,
    },
    createdOn: {
      field: "created_at",
      type: DataTypes.DATE(6),
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    session_id: ""
  },
  {
    sequelize,
    tableName: "sessions",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["Session_ID"],
      },
    ],
  }
);

export default Sessions;
