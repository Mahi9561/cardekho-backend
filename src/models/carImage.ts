/* eslint-disable @typescript-eslint/brace-style */
import { DataTypes, Optional, Model } from "sequelize";
import sequelize from ".";

interface CarImageAttributes {
  image_id: number;
  car_id: number;
  image_url: string;
  is_primary: boolean;
  createdBy: string | null;
  updatedBy: string | null;
  createdOn: Date;
  updatedOn: Date;
}

export interface CarImageInput
  extends Optional<CarImageAttributes, "image_id"> {}

class CarImage
  extends Model<CarImageAttributes, CarImageInput>
  implements CarImageAttributes
{
  public image_id!: number;
  public car_id!: number;
  public image_url!: string;
  public is_primary!: boolean;
  public createdBy!: string | null;
  public updatedBy!: string | null;
  public createdOn!: Date;
  public updatedOn!: Date;
}

CarImage.init(
  {
    image_id: {
      field: "Image_ID",
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
    image_url: {
      field: "Image_URL",
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_primary: {
      field: "Is_Primary",
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
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
    tableName: "CarImages",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["Image_ID"],
      },
    ],
  }
);

export default CarImage;
