import sequelize from "../../models";
import { QueryTypes } from "sequelize";

export const getAllCars = async (filters?: Record<string, unknown>) => {
  const whereClauses: string[] = [];
  const replacements: Record<string, unknown> = {};

  if (filters) {
    const { brand, model, fuel_type, transmission, launch_year, price_min, price_max } = filters as any;
    if (brand) {
      whereClauses.push("b.name LIKE :brand");
      replacements.brand = `%${brand}%`;
    }
    if (model) {
      whereClauses.push("m.name LIKE :model");
      replacements.model = `%${model}%`;
    }
    if (fuel_type) {
      whereClauses.push("v.fuel_type = :fuel_type");
      replacements.fuel_type = fuel_type;
    }
    if (transmission) {
      whereClauses.push("v.transmission = :transmission");
      replacements.transmission = transmission;
    }
    if (launch_year) {
      whereClauses.push("m.launch_year = :launch_year");
      replacements.launch_year = launch_year;
    }
    if (price_min) {
      whereClauses.push("v.price >= :price_min");
      replacements.price_min = price_min;
    }
    if (price_max) {
      whereClauses.push("v.price <= :price_max");
      replacements.price_max = price_max;
    }
  }

  const whereSql = whereClauses.length ? `WHERE ${whereClauses.join(" AND ")}` : "";

  const cars = await sequelize.query(
    `
    SELECT
      b.name AS brand_name,
      m.name AS model_name,
      m.launch_year,
      v.name AS variant_name,
      v.fuel_type,
      v.transmission,
      v.price
    FROM brands b
    JOIN models m ON b.brand_id = m.brand_id
    JOIN variants v ON m.model_id = v.model_id
    ${whereSql}
    `,
    {
      type: QueryTypes.SELECT,
      replacements,
    }
  );

  return {
    statuscode: 200,
    response: {
      message: "Cars fetched successfully",
      data: cars,
    },
  };
};
