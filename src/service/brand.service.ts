import Brand from "../models/brands";
import ClientInputError from "../utils/error-handler";
import { Brands, UpdateBrands } from "../utils/interface/brand.interface";

export const brandService = async (body: Brands) => {
  const existingBrand = await Brand.findOne({
    where: { name: body.name },
  });

  if (existingBrand) {
    throw new ClientInputError("Brand already exists");
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

export const updateBrandService = async (body: UpdateBrands) => {
  const brand = await Brand.findOne({
    where: { brand_id: body.brand_id },
  });

  if (!brand) {
    return {
      statuscode: 404,
      response: { message: "Brand not found" },
    };
  }

  if (body.name) {
    brand.name = body.name;
  }
  if (body.logo_url) {
    brand.logo_url = body.logo_url;
  }

  if (body.name || body.logo_url) {
    brand.updatedOn = new Date();
    await brand.save();
  }

  return {
    statuscode: 200,
    response: {
      message: "Brand updated successfully",
      data: brand,
    },
  };
};

export const getAllBrands = async () => {
  const brands = await Brand.findAll({
    attributes: ["name", "logo_url"],
  });

  return {
    statuscode: 200,
    response: {
      message: "Brands fetched successfully",
    },
    data: brands,
  };
};

export const getBrandById = async (brandId: number) => {
  console.log("Fetching brand with ID:", brandId);
  const brand = await Brand.findOne({
    where: { brand_id: brandId },
    attributes: ["name", "logo_url"],
  });

  if (!brand) {
    return {
      statuscode: 404,
      response: {
        message: "Brand not found",
      },
      data: null,
    };
  }

  return {
    statuscode: 200,
    response: {
      message: "Brand fetched successfully",
    },
    data: brand,
  };
};

export const deleteBrandService = async (brandId: number) => {
  console.log("Deleting brand with ID:", brandId);
  const brand = await Brand.findOne({
    where: { brand_id: brandId },
  });

  if (!brand) {
    return {
      statuscode: 404,
      response: {
        message: "Brand not found",
      },
    };
  }

  await brand.destroy();

  return {
    statuscode: 200,
    response: {
      message: "Brand deleted successfully",
    },
  };
};
