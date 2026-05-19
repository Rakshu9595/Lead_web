import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { User } from "./user.model";
import { RegisterDTO, LoginDTO } from "./auth.types";

export class AuthService {
  static async register(data: RegisterDTO) {
    const existing = await User.findOne({ email: data.email });
    if (existing) throw new Error("User already exists");

    const hashed = await bcrypt.hash(data.password, 10);

    const user = await User.create({
      ...data,
      password: hashed
    });

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return { user, token };
  }

  static async login(data: LoginDTO) {
    const user = await User.findOne({ email: data.email });
    if (!user) throw new Error("Invalid credentials");

    const isMatch = await bcrypt.compare(data.password, user.password);
    if (!isMatch) throw new Error("Invalid credentials");

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET as string,
      { expiresIn: "7d" }
    );

    return { user, token };
  }
}