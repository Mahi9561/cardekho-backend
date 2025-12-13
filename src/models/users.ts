/* eslint-disable @typescript-eslint/brace-style */
import { DataTypes, Optional, Model } from "sequelize";
import sequelize from ".";

interface UserAttributes {
  user_id: number;
  full_name: string;
  email: string;
  password: string;
  phone: string | null;
  role: string;
  status: string;
  createdBy: string | null;
  createdOn: Date;
  updatedOn: Date;
}

export interface UserInput extends Optional<UserAttributes, "user_id"> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public user_id!: number;
  public full_name!: string;
  public email!: string;
  public password!: string;
  public phone!: string | null;
  public role!: string;
  public status!: string;
  public createdBy!: string | null;
  public createdOn!: Date;
  public updatedOn!: Date;
}

User.init(
  {
    user_id: {
      field: "User_ID",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    full_name: {
      field: "Full_Name",
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      field: "Email",
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      field: "password_hash",
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      field: "Phone",
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    role: {
      field: "Role",
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "user",
    },
    status: {
      field: "Status",
      type: DataTypes.STRING,
      allowNull: false,
      defaultValue: "active",
    },
    createdBy: {
      field: "CreatedBy",
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdOn: {
      field: "CreatedOn",
      type: DataTypes.DATE(6),
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    updatedOn: {
      field: "UpdatedOn",
      type: DataTypes.DATE(6),
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: "Users",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["User_ID"],
      },
      {
        unique: true,
        fields: ["Email"],
      },
    ],
  }
);

export default User;
