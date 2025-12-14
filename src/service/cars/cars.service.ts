import sequelize from "../../models";
import { QueryTypes } from "sequelize";

export const getAllCars = async (filters?: Record<string, unknown>) => {
  const whereClauses: string[] = [];
  const replacements: Record<string, unknown> = {};

  if (filters) {
    const {
      brand,
      model,
      fuel_type,
      transmission,
      launch_year,
      price_min,
      price_max,
      mileage_min,
      mileage_max,
      engine_min,
      engine_max,
      seating_capacity,
      safety_rating_min,
    } = filters as any;
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
    if (mileage_min) {
      whereClauses.push("s.mileage_kmpl >= :mileage_min");
      replacements.mileage_min = mileage_min;
    }

    if (mileage_max) {
      whereClauses.push("s.mileage_kmpl <= :mileage_max");
      replacements.mileage_max = mileage_max;
    }

    if (engine_min) {
      whereClauses.push("s.engine_cc >= :engine_min");
      replacements.engine_min = engine_min;
    }

    if (engine_max) {
      whereClauses.push("s.engine_cc <= :engine_max");
      replacements.engine_max = engine_max;
    }

    if (seating_capacity) {
      whereClauses.push("s.seating_capacity = :seating_capacity");
      replacements.seating_capacity = seating_capacity;
    }

    if (safety_rating_min) {
      whereClauses.push("s.safety_rating >= :safety_rating_min");
      replacements.safety_rating_min = safety_rating_min;
    }
  }

  const whereSql = whereClauses.length
    ? `WHERE ${whereClauses.join(" AND ")}`
    : "";

  const cars = await sequelize.query(
    `
    SELECT
      b.name AS brand_name,
      m.name AS model_name,
      m.launch_year,
      v.name AS variant_name,
      v.fuel_type,
      v.transmission,
      v.price,
      s.mileage_kmpl,
      s.engine_cc,
      s.seating_capacity,
      s.bootspace_litres,
      s.safety_rating
    FROM brands b
    JOIN models m ON b.brand_id = m.brand_id
    JOIN variants v ON m.model_id = v.model_id
    JOIN variant_specs s ON s.variant_id = v.variant_id
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

export const getCarById = async (id: number) => {
  const cars = await sequelize.query(
    ` SELECT
      b.name AS brand_name,
      m.name AS model_name,
      m.launch_year,
      v.name AS variant_name,
      v.fuel_type,
      v.transmission,
      v.price,
      s.mileage_kmpl,
      s.engine_cc,
      s.seating_capacity,
      s.bootspace_litres,
      s.safety_rating
    FROM brands b
    JOIN models m ON b.brand_id = m.brand_id
    JOIN variants v ON m.model_id = v.model_id
    JOIN variant_specs s ON s.variant_id = v.variant_id
    WHERE v.variant_id = :id
    LIMIT 1`,
    {
      type: QueryTypes.SELECT,
      replacements: { id },
    }
  );

  const car = Array.isArray(cars) && cars.length ? cars[0] : null;

  if (!car) {
    return {
      statuscode: 404,
      response: {
        message: "Car not found",
      },
    };
  }

  return {
    statuscode: 200,
    response: {
      message: "Car fetched successfully",
      data: car,
    },
  };
};
