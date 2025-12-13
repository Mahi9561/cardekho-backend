/* eslint-disable @typescript-eslint/brace-style */
import { DataTypes, Optional, Model } from "sequelize";
import sequelize from ".";

interface BrandAttributes {
  brand_id: number;
  name: string;
  logo_url: string | null;
  createdBy: string | null;
  updatedBy: string | null;
  createdOn: Date;
  updatedOn: Date;
}

export interface BrandInput extends Optional<BrandAttributes, "brand_id"> {}

class Brand
  extends Model<BrandAttributes, BrandInput>
  implements BrandAttributes
{
  public brand_id!: number;
  public name!: string;
  public logo_url!: string | null;
  public createdBy!: string | null;
  public updatedBy!: string | null;
  public createdOn!: Date;
  public updatedOn!: Date;
}

Brand.init(
  {
    brand_id: {
      field: "Brand_ID",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      field: "Name",
      type: DataTypes.STRING,
      allowNull: false,
    },
    logo_url: {
      field: "Logo_URL",
      type: DataTypes.STRING,
      allowNull: true,
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
    tableName: "Brands",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["Brand_ID"],
      },
    ],
  }
);

export default Brand;
