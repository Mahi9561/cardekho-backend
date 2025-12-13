/* eslint-disable @typescript-eslint/brace-style */
import { DataTypes, Optional, Model } from "sequelize";
import sequelize from ".";

interface DealerCarAttributes {
  dealer_car_id: number;
  dealer_id: number;
  car_id: number;
  stock_count: number;
  price: number;
  createdBy: string | null;
  updatedBy: string | null;
  createdOn: Date;
  updatedOn: Date;
}

export interface DealerCarInput
  extends Optional<DealerCarAttributes, "dealer_car_id"> {}

class DealerCar
  extends Model<DealerCarAttributes, DealerCarInput>
  implements DealerCarAttributes
{
  public dealer_car_id!: number;
  public dealer_id!: number;
  public car_id!: number;
  public stock_count!: number;
  public price!: number;
  public createdBy!: string | null;
  public updatedBy!: string | null;
  public createdOn!: Date;
  public updatedOn!: Date;
}

DealerCar.init(
  {
    dealer_car_id: {
      field: "Dealer_Car_ID",
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    dealer_id: {
      field: "Dealer_ID",
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    car_id: {
      field: "Car_ID",
      allowNull: false,
      type: DataTypes.INTEGER,
    },
    stock_count: {
      field: "Stock_Count",
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    price: {
      field: "Price",
      type: DataTypes.FLOAT,
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
    tableName: "DealerCars",
    timestamps: false,
    indexes: [
      {
        unique: true,
        fields: ["Dealer_Car_ID"],
      },
    ],
  }
);

export default DealerCar;
