import Schema from "validate";

const userRegisterSchema = new Schema({
  full_name: { type: String, required: true },
  email: {
    type: String,
    required: true,
  },
  password: { type: String, required: true, length: { min: 8, max: 128 } },
  phone: { type: String, required: true, length: { min: 10, max: 15 } },
  role: {
    type: String,
    enum: ["admin", "seller", "buyer", "dealer"],
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
  },
  avatar_url: { type: String },
  date_of_birth: {
    type: String,
  },
  city: { type: String },
  state: { type: String },
  pincode: { type: String, length: { min: 4, max: 10 } },
  gender: {
    type: String,
    enum: ["Male", "Female", "Other"],
  },
});

export default userRegisterSchema;
