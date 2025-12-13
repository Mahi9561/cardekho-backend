import { Model } from "sequelize";
import CarModel from "../../models/models";
import ClientInputError from "../../utils/error-handler";
import { models, updateModel } from "../../utils/interface/model.interfaces";
import Variant from "../../models/variants";
import { NotFoundError } from "../../utils/input-validator";

export const createVariantService = async (body: any) => {
  // Check duplicate variant for same model
  const existingVariant = await Variant.findOne({
    where: {
      model_id: body.model_id,
      name: body.name,
      fuel_type: body.fuel_type,
      transmisstion: body.transmisstion,
    },
  });

  if (existingVariant) {
    throw new ClientInputError("Variant already exists for this model");
  }

  const newVariant = await Variant.create({
    model_id: body.model_id,
    name: body.name,
    fuel_type: body.fuel_type,
    transmisstion: body.transmisstion,
    price: body.price,
    createdBy: body.createdBy || "system",
    updatedBy: body.createdBy || "system",
    createdOn: new Date(),
    updatedOn: new Date(),
    create_at: new Date(),
  });

  return {
    statuscode: 201,
    success: true,
    message: "Variant created successfully",
    data: newVariant,
  };
};


export const updateVariantService = async (body: any) => {
  if (!body.varient_id) {
    throw new ClientInputError("varient_id is required");
  }

  const variant = await Variant.findOne({
    where: { varient_id: body.varient_id },
  });

  if (!variant) {
    throw new NotFoundError("Variant not found");
  }

  const isUpdateProvided =
    body.name || body.fuel_type || body.transmisstion || body.price;

  if (!isUpdateProvided) {
    throw new ClientInputError(
      "At least one field must be provided for update"
    );
  }

  if (body.name) variant.name = body.name;
  if (body.fuel_type) variant.fuel_type = body.fuel_type;
  if (body.transmisstion) variant.transmisstion = body.transmisstion;
  if (body.price) variant.price = body.price;

  variant.updatedOn = new Date();
  variant.updatedBy = body.updatedBy || "system";

  await variant.save();

  return {
    statuscode: 200,
    success: true,
    message: "Variant updated successfully",
    data: variant,
  };
};


export const deleteVariantService = async (variantId: number) => {
  const variant = await Variant.findOne({
    where: { varient_id: variantId },
  });

  if (!variant) {
    throw new NotFoundError("Variant not found");
  }

  await variant.destroy();

  return {
    statuscode: 200,
    success: true,
    message: "Variant deleted successfully",
  };
};
