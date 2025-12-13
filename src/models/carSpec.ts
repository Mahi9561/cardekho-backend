/* eslint-disable @typescript-eslint/brace-style */
import { DataTypes, Optional, Model } from "sequelize";
import sequelize from ".";

interface CarSpecAttributes {
  spec_id: number;
  car_id: number;
  milage: string;
  engine: string;
  seating_capacity: number;
  boot_space: string;
  safety_rating: number;
  createdBy: string | null;
  updatedBy: string | null;
  createdOn: Date;
  updatedOn: Date;
}

export interface CarSpecInput extends Optional<CarSpecAttributes, "spec_id"> {}

class CarSpec
  extends Model<CarSpecAttributes, CarSpecInput>
  implements CarSpecAttributes
{
  public spec_id!: number;
  public car_id!: number;
  public milage!: string;
  public engine!: string;
  public seating_capacity!: number;
  public boot_space!: string;
  public safety_rating!: number;
  public createdBy!: string | null;
  public updatedBy!: string | null;
  public createdOn!: Date;
  public updatedOn!: Date;
}

CarSpec.init(
  {
    spec_id: {
      field: "Spec_ID",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    car_id: {
      field: "Car_ID",
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    milage: {
      field: "Milage",
      type: DataTypes.STRING,
      allowNull: false,
    },
    engine: {
      field: "Engine",
      type: DataTypes.STRING,
      allowNull: false,
    },
    seating_capacity: {
      field: "Seating_Capacity",
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    boot_space: {
      field: "Boot_Space",
      type: DataTypes.STRING,
      allowNull: false,
    },
    safety_rating: {
      field: "Safety_Rating",
      type: DataTypes.INTEGER,
      allowNull: false,
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
    tableName: "CarSpecs",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["Spec_ID"],
      },
    ],
  }
);

export default CarSpec;
