/* eslint-disable @typescript-eslint/brace-style */
import { DataTypes, Optional, Model } from "sequelize";
import sequelize from ".";

interface CarModelAttributes {
  model_id: number;
  brand_id: number;
  name: string;
  launch_year: number;
  createdBy: string | null;
  updatedBy: string | null;
  createdOn: Date;
  updatedOn: Date;
  create_at: Date;
}

export interface CarModelInput
  extends Optional<CarModelAttributes, "model_id"> {}

class CarModel
  extends Model<CarModelAttributes, CarModelInput>
  implements CarModelAttributes
{
  public model_id!: number;
  public brand_id!: number;
  public name!: string;
  public launch_year!: number;
  public createdBy!: string | null;
  public updatedBy!: string | null;
  public createdOn!: Date;
  public updatedOn!: Date;
  public create_at!: Date;
}

CarModel.init(
  {
    model_id: {
      field: "Model_ID",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    brand_id: {
      field: "Brand_ID",
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      field: "Name",
      type: DataTypes.STRING,
      allowNull: false,
    },
    launch_year: {
      field: "Launch_Year",
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    create_at: {
      field: "created_at",
      type: DataTypes.DATE(6),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    createdBy: {
      field: "CreatedBy",
      type: DataTypes.STRING,
      allowNull: true,
    },
    updatedBy: {
      field: "UpdatedBy",
      type: DataTypes.STRING,
      allowNull: true,
    },
    createdOn: {
      field: "CreatedOn",
      type: DataTypes.DATE(6),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updatedOn: {
      field: "UpdatedOn",
      type: DataTypes.DATE(6),
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: "Models",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["Model_ID"],
      },
    ],
  }
);

export default CarModel;
