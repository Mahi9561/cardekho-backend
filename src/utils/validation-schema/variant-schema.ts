import Schema from "validate";

const variantSchema = new Schema({
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
    required: true,
    length: { min: 1, max: 255 },
    message: {
      required: "Variant name is required.",
      length: "Variant name must be between 1 and 255 characters.",
    },
  },

  fuel_type: {
    type: String,
    required: true,
    enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"],
    message: {
      required: "Fuel type is required.",
      enum:
        "Fuel type must be one of Petrol, Diesel, Electric, Hybrid, or CNG.",
    },
  },

  transmisstion: {
    type: String,
    required: true,
    enum: ["Manual", "Automatic"],
    message: {
      required: "Transmission type is required.",
      enum: "Transmission must be Manual or Automatic.",
    },
  },

  price: {
    type: Number,
    required: true,
    message: {
      required: "Price is required.",
      type: "Price must be a number.",
    },
  },

  createdBy: {
    type: String,
    required: false,
    length: { min: 1, max: 100 },
    message: {
      length: "CreatedBy must be between 1 and 100 characters.",
    },
  },
});

export default variantSchema;
