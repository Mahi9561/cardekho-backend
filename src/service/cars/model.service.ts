import CarModel from "../../models/models";
import ClientInputError from "../../utils/error-handler";
import { updateModel } from "../../utils/interface/model.interfaces";


export const createModels = async (body: any) => {
  const existingBrand = await CarModel.findOne({
    where: { name: body.name },
  });

  if (existingBrand) {
    throw new ClientInputError("Model already exists");
  }

  const newModel = await CarModel.create({
    brand_id: body.brand_id,
    name: body.name,
    launch_year: body.launch_year,
    create_at: new Date(),
    createdBy: "system",
    updatedBy: "system",
    createdOn: new Date(),
    updatedOn: new Date(),
  });

  return {
    statuscode: 201,
    response: {
      message: "Brand created successfully",
    },
    data: newModel,
  };
};

// Update Model

export const updateModelService = async (body: updateModel) => {
  const model = await CarModel.findOne({
    where: { model_id: body.model_id },
  });

  if (!model) {
    throw new ClientInputError("Model not exists");
  }

  if (body.model_id) {
    model.model_id = body.model_id;
  }
  if (body.name) {
    model.name = body.name;
  }
  if (body.launch_year) {
    model.launch_year = body.launch_year;
  }

  if (body.name || body.name || body.launch_year) {
    model.updatedOn = new Date();
    await model.save();
  }

  return {
    statuscode: 200,
    response: {
      message: "Brand updated successfully",
      data: model,
    },
  };
};

export const deleteModelService = async (modelId: number) => {
  console.log("Deleting brand with ID:", modelId);
  const model = await CarModel.findOne({
    where: { model_id: modelId },
  });

  if (!model) {
    return {
      statuscode: 404,
      response: {
        message: "model not found",
      },
    };
  }

  await model.destroy();

  return {
    statuscode: 200,
    response: {
      message: "model deleted successfully",
    },
  };
};
