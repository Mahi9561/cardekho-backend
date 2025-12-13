import Schema from "validate";

const modelSchema = new Schema({
  brand_id: {
    type: Number,
    required: true,
    message: {
      required: "Brand ID is required.",
      type: "Brand ID must be a number.",
    },
  },
  name: {
    type: String,
    required: true,
    length: { min: 1, max: 255 },
    message: {
      required: "Model name is required.",
      length: "Model name must be between 1 and 255 characters.",
    },
  },
  launch_year: {
    type: Number,
    required: false,
    match: /^\d{4}$/,
    message: "Launch year must be a valid year (YYYY format).",
  },
});

export default modelSchema;
