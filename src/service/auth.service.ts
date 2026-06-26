import { Op } from "sequelize";
import User from "../models/users";
import Session from "../models/session";
import { DatabaseError } from "../utils/error-handler";
import { loginData, userData } from "../utils/interface/users";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const registerUser = async (Users: userData) => {
  try {
    const existingUser = await User.findOne({
      where: {
        [Op.or]: [{ email: Users.email }, { phone: Users.phone }],
      },
    });

    if (existingUser) {
      if (existingUser.email === Users.email) {
        return {
          statusCode: 409,
          message: "Email already registered",
        };
      }

      if (existingUser.phone === Users.phone) {
        return {
          statusCode: 409,
          message: "Phone number already registered",
        };
      }
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

export const loginUser = async (Users: loginData) => {
  try {
    const user = await User.findOne({ where: { email: Users.email } });
    if (!user) {
      return {
        statusCode: 404,
        message: "User not found",
      };
    }

    const isMatch = await bcrypt.compare(Users.password, user.password);
    if (!isMatch) {
      return {
        statusCode: 401,
        message: "Password is incorrect",
      };
    }

    const token = jwt.sign(
      {
        id: user.user_id,
        email: user.email,
        role: user.role,
      },
      process.env.JWT_SECRET ?? "mysecretkey",
      { expiresIn: "1d" },
    );

    try {
      console.debug("Creating session for user:", user.user_id);
      console.debug("Session payload:", {
        user_id: user.user_id,
        token: token?.substring(0, 10) + "...",
        device: "web",
      });

      await Session.create({
        user_id: user.user_id,
        token,
        device: "web",
        ip_address: "0.0.0.0",
        expiresAt: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000),
        createdOn: new Date(),
      });
      console.log("Session created successfully", { user_id: user.user_id });
    } catch (sessionError) {
      // Log session creation error with details but don't fail login
      if (sessionError && (sessionError as any).stack) {
        console.error((sessionError as any).stack);
      }
    }

    return {
      statusCode: 200,
      message: {
        token,
        Success: "Login successful",
      },
    };
  } catch (error: any) {
    throw new DatabaseError(error);
  }
};

export const logoutUser = async (token: string) => {
  try {
    const session = await Session.findOne({
      where: { token },
    });

    if (!session) {
      return {
        statusCode: 404,
        message: "Session not found",
      };
    }

    await Session.destroy({
      where: { token },
    });

    return {
      statusCode: 200,
      message: "Logout successful",
    };
  } catch (error: any) {
    throw new DatabaseError(error);
  }
};

export const myProfile = async (user_id: number) => {
  try {
    const user = await User.findByPk(user_id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      return {
        statusCode: 404,
        message: "User not found",
      };
    }

    return {
      statusCode: 200,
      message: user,
    };
  } catch (error: any) {
    throw new DatabaseError(error);
  }
};
