import User from "../models/users";
import { DatabaseError } from "../utils/error-handler";
import { userData } from "../utils/interface/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (Users: userData) => {
  try {
    const existingEmail = await User.findOne({ where: { email: Users.email } });
    if (existingEmail) {
      return {
        statusCode: 409,
        message: "Email already registered",
      };
    }

    const existingPhone = await User.findOne({ where: { phone: Users.phone } });
    if (existingPhone) {
      return {
        statusCode: 409,
        message: "Phone number already registered",
      };
    }

    const hashedPassword = await bcrypt.hash(Users.password, 10);

    await User.create({
      full_name: Users.full_name,
      email: Users.email,
      password: hashedPassword,
      phone: Users.phone,
      role: Users.role ?? "buyer",
      status: "active",
      avatar_url: Users.avatar_url,
      date_of_birth: Users.date_of_birth,
      city: Users.city,
      state: Users.state,
      pincode: Users.pincode,
      gender: Users.gender,
      createdBy: Users.email,
      createdOn: new Date(),
      updatedOn: new Date(),
    });

    return {
      statusCode: 201,
      message: "User registered successfully",
    };
  } catch (error: any) {
    throw new DatabaseError(error);
  }
};
