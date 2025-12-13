/* eslint-disable @typescript-eslint/brace-style */
import { DataTypes, Optional, Model } from "sequelize";
import sequelize from ".";

interface VariantAttributes {
  varient_id: number;
  model_id: number;
  name: string;
  fuel_type: string;
  transmisstion: string;
  price: number;
  create_at: Date;
  createdBy: string | null;
  updatedBy: string | null;
  createdOn: Date;
  updatedOn: Date;
}

export interface VariantInput
  extends Optional<VariantAttributes, "varient_id"> {}

class Variant
  extends Model<VariantAttributes, VariantInput>
  implements VariantAttributes
{
  public varient_id!: number;
  public model_id!: number;
  public name!: string;
  public fuel_type!: string;
  public transmisstion!: string;
  public price!: number;
  public create_at!: Date;
  public createdBy!: string | null;
  public updatedBy!: string | null;
  public createdOn!: Date;
  public updatedOn!: Date;
}

Variant.init(
  {
    varient_id: {
      field: "variant_id",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    model_id: {
      field: "Model_ID",
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    name: {
      field: "Name",
      type: DataTypes.STRING,
      allowNull: false,
    },
    fuel_type: {
      field: "Fuel_Type",
      type: DataTypes.STRING,
      allowNull: false,
    },
    transmisstion: {
      field: "transmission",
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      field: "Price",
      type: DataTypes.FLOAT,
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
    tableName: "Variants",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["Varient_ID"],
      },
    ],
  }
);

export default Variant;
