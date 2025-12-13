import Schema from "validate";

const brandSchema = new Schema({
  name: {
    type: String,
    required: true,
    length: { min: 2, max: 100 },
    match: /^[a-zA-Z0-9\s&-]+$/,
    message: {
      required: "Brand name is required.",
      length: "Brand name must be between 2 and 100 characters.",
      match:
        "Brand name can only contain letters, numbers, spaces, hyphens, and ampersands.",
    },
  },
  logo_url: {
    type: String,
    required: false,
    match: /^(https?:\/\/[^\s$.?#].[^\s]*)$/,
    message: "logoUrl must be a valid URL if provided.",
  },
});

export default brandSchema;
