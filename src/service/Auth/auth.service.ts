import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import User from "../../models/users";
import Session from "../../models/session";

export const register = async (data: any) => {
  const { full_name, email, password, phone, role, createdBy } = data;

  // Check existing user
  const existingUser = await User.findOne({ where: { email } });
  if (existingUser) throw new Error("Email already registered");

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    full_name,
    email,
    password: hashedPassword,
    phone,
    role: role ?? "buyer",
    status: "active",
    createdBy: email,
    createdOn: new Date(),
    updatedOn: new Date(),
  });

  return user;
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");

  // Generate JWT
  const token = jwt.sign(
    {
      id: user.user_id,
      email: user.email,
      role: user.role,
    },
    process.env.JWT_SECRET ?? "mysecretkey",
    { expiresIn: "1d" }
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

  return { user, token };
};

export const logout = async (userId: number, token: string) => {
  const deleted = await Session.destroy({
    where: { token },
  });

  if (!deleted) {
    return { success: false, message: "Session not found or already removed" };
  }

  return { success: true, message: "Logged out successfully" };
};
