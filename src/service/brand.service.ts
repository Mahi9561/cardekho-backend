import Brand from "../models/brands";
import { Brands } from "../utils/interface/brand.interface";

export const brandService = async (body: Brands) => {
  const existingBrand = await Brand.findOne({
    where: { name: body.name },
  });

  if (existingBrand) {
    throw new Error("Brand already exists");
  }

  const newBrand = await Brand.create({
    name: body.name,
    logo_url: body.logo_url,
    createdOn: new Date(),
    updatedOn: new Date(),
  });

  return {
    statuscode: 201,
    response: {
      message: "Brand created successfully",
    },
    data: newBrand,
  };
};

export const updateBrandService = async (body: Brands) => {
  const existingBrand = await Brand.findOne({
    where: { name: body.name },
  });

  if (!existingBrand) {
    return {
      statuscode: 404,
      response: {
        message: "Brand not found",
      },
    };
  }

  existingBrand.logo_url = body.logo_url || existingBrand.logo_url;
  existingBrand.name = body.name || existingBrand.name;

  await existingBrand.save();

  return {
    statuscode: 200,
    response: {
      message: "Brand updated successfully",
    },
    data: existingBrand,
  };
};
