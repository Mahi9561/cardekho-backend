import Schema from "validate";
const userLoginSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true },
});

export default userLoginSchema;
