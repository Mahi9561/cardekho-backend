import User from "../models/users";
import { DatabaseError, NotFoundError } from "../utils/error-handler";

export const getAllUsers = async () => {
  try {
    const users = await User.findAll({
      attributes: {
        exclude: ["password"],
      },
    });

    if (users.length === 0) {
      throw new NotFoundError("No records found");
    }

    return {
      statusCode: 200,
      message: users,
    };
  } catch (error: any) {
    throw new DatabaseError(error);
  }
};

export const getUserById = async (id: number) => {
  try {
    const user = await User.findByPk(id, {
      attributes: {
        exclude: ["password"],
      },
    });

    if (!user) {
      throw new NotFoundError("User not found");
    }

    return {
      statusCode: 200,
      message: user,
    };
  } catch (error: any) {
    throw new DatabaseError(error);
  }
};

