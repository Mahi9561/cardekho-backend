/* eslint-disable @typescript-eslint/brace-style */
import { DataTypes, Optional, Model } from "sequelize";
import sequelize from ".";

interface UserAttributes {
  user_id: number;
  full_name: string;
  email: string;
  password: string;
  phone: string | null;
  role: "buyer" | "seller" | "dealer" | "admin";
  status: "active" | "inactive";
  create_at: Date;
  avatar_url: string | null;
  date_of_birth: Date | null;
  city: string | null;
  state: string | null;
  pincode: string | null;
  gender: "Male" | "Female" | "Other" | null;
  is_verified: boolean;
  last_login: Date | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdOn: Date;
  updatedOn: Date;
}

export interface UserInput extends Optional<UserAttributes, "user_id" | "create_at" | "avatar_url" | "date_of_birth" | "city" | "state" | "pincode" | "gender" | "is_verified" | "last_login" | "createdBy" | "updatedBy" | "createdOn" | "updatedOn"> {}

class User extends Model<UserAttributes, UserInput> implements UserAttributes {
  public user_id!: number;
  public full_name!: string;
  public email!: string;
  public password!: string;
  public phone!: string | null;
  public role!: "buyer" | "seller" | "dealer" | "admin";
  public status!: "active" | "inactive";
  public create_at!: Date;
  public avatar_url!: string | null;
  public date_of_birth!: Date | null;
  public city!: string | null;
  public state!: string | null;
  public pincode!: string | null;
  public gender!: "Male" | "Female" | "Other" | null;
  public is_verified!: boolean;
  public last_login!: Date | null;
  public createdBy!: string | null;
  public updatedBy!: string | null;
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
      type: DataTypes.STRING(150),
      allowNull: false,
    },
    email: {
      field: "Email",
      type: DataTypes.STRING(120),
      allowNull: false,
      unique: true,
    },
    password: {
      field: "password_hash",
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    phone: {
      field: "Phone",
      type: DataTypes.STRING(15),
      allowNull: false,
      unique: true,
    },
    role: {
      field: "Role",
      type: DataTypes.ENUM("buyer", "seller", "dealer", "admin"),
      allowNull: false,
      defaultValue: "buyer",
    },
    status: {
      field: "Status",
      type: DataTypes.ENUM("active", "inactive"),
      allowNull: false,
      defaultValue: "active",
    },
    create_at: {
      field: "created_at",
      type: DataTypes.DATE(6),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    avatar_url: {
      field: "avatar_url",
      type: DataTypes.STRING(500),
      allowNull: true,
    },
    date_of_birth: {
      field: "date_of_birth",
      type: DataTypes.DATEONLY,
      allowNull: true,
    },
    city: {
      field: "city",
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    state: {
      field: "state",
      type: DataTypes.STRING(100),
      allowNull: true,
    },
    pincode: {
      field: "pincode",
      type: DataTypes.STRING(10),
      allowNull: true,
    },
    gender: {
      field: "gender",
      type: DataTypes.ENUM("Male", "Female", "Other"),
      allowNull: true,
    },
    is_verified: {
      field: "is_verified",
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    last_login: {
      field: "last_login",
      type: DataTypes.DATE(6),
      allowNull: true,
    },
    createdBy: {
      field: "CreatedBy",
      type: DataTypes.TEXT,
      allowNull: true,
    },
    updatedBy: {
      field: "UpdatedBy",
      type: DataTypes.TEXT,
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
