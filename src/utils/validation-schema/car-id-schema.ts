import Schema from "validate";

const carIdSchema = new Schema({
  id: {
    type: Number,
    required: true,
    message: "Car id must be a number",
  },
});

export default carIdSchema;
