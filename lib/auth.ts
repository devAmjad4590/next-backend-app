import jwt from "jsonwebtoken";
import { cookies } from "next/headers";

const SECRET = "123";

export async function verifyToken() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Token not found");
  }

  try {
    const decoded = jwt.verify(token, SECRET);
    return decoded;
  } catch (err) {
    throw new Error("Invalid or expired token");
  }
}
