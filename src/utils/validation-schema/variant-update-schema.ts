import Schema from "validate";

const updateVariantSchema = new Schema({
  varient_id: {
    type: Number,
    required: true,
    message: {
      required: "Variant ID is required.",
      type: "Variant ID must be a number.",
    },
  },
  model_id: {
    type: Number,
    required: true,
    message: {
      required: "Model ID is required.",
      type: "Model ID must be a number.",
    },
  },

  name: {
    type: String,
    required: false,
    length: { min: 1, max: 255 },
    message: {
      length: "Variant name must be between 1 and 255 characters.",
    },
  },

  fuel_type: {
    type: String,
    required: false,
    enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"],
    message: {
      enum: "Fuel type must be one of Petrol, Diesel, Electric, Hybrid, Hybrid or CNG.",
    },
  },

  transmisstion: {
    type: String,
    required: false,
    enum: ["Manual", "Automatic"],
    message: {
      enum: "Transmission must be Manual or Automatic.",
    },
  },

  price: {
    type: Number,
    required: false,
    message: {
      type: "Price must be a number.",
    },
  },

  updatedBy: {
    type: String,
    required: false,
    length: { min: 1, max: 100 },
    message: {
      length: "UpdatedBy must be between 1 and 100 characters.",
    },
  },
});

export default updateVariantSchema;
