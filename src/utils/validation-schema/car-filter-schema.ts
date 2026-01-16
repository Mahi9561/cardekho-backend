import Schema from "validate";

const carFilterSchema = new Schema({
  brand: { type: String, required: false, length: { min: 1 } },
  model: { type: String, required: false, length: { min: 1 } },

  fuel_type: {
    type: String,
    required: false,
    enum: ["Petrol", "Diesel", "Electric", "Hybrid", "CNG"],
    message: "Invalid fuel_type",
  },

  transmission: {
    type: String,
    required: false,
    match: /^(Manual|Automatic)$/i,
    message: "Invalid transmission",
  },

  launch_year: {
    type: Number,
    required: false,
    size: { min: 1900, max: 2100 },
  },

  price_min: {
    type: Number,
    required: false,
    size: { min: 0 },
  },

  price_max: {
    type: Number,
    required: false,
    size: { min: 0 },
  },

  mileage_min: {
    type: Number,
    required: false,
    size: { min: 0, max: 100 },
  },

  mileage_max: {
    type: Number,
    required: false,
    size: { min: 0, max: 100 },
  },

  engine_min: {
    type: Number,
    required: false,
    size: { min: 500, max: 10000 },
  },

  engine_max: {
    type: Number,
    required: false,
    size: { min: 500, max: 10000 },
  },

  seating_capacity: {
    type: Number,
    required: false,
    size: { min: 1, max: 10 },
  },

  safety_rating_min: {
    type: Number,
    required: false,
    size: { min: 0, max: 5 },
  },
});

export default carFilterSchema;
