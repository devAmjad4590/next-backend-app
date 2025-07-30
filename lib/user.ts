import pool from "./db";
import { UserExistsError, UserNotFoundError } from "./error";

export const createUser = async (username: string, email: string) => {
  const checkUser = await existUser(email);
  if (checkUser) {
    throw new UserExistsError(email);
  }
  const [result] = await pool.query(
    "INSERT INTO users (username, email) VALUES (?, ?)",
    [username, email]
  );

  return {
    id: (result as any).insertId,
    username,
    email,
  };
};

export const getUserByEmail = async (email: string) => {
    console.log(email)
    if (!email) {
        throw new Error("Email parameter is required");
    }
    const [result] = await pool.query(
        'SELECT * FROM users WHERE email = ?',[email]
    )
    if((result as any[]).length === 0){
        throw new UserNotFoundError
    }
    const user = (result as any)[0];

    // Return the user data
    return {
        id: user.id,
        username: user.username,
        email: user.email,
    };
}

export const updateUser = async (
  id: number,
  username: String,
  email: string
) => {
  const checkUser = await existUser(email);
  if (checkUser) {
    throw new UserExistsError(email);
  }
  const [result] = await pool.query(
    "UPDATE users SET username = ?, email = ? WHERE id = ?",
    [username, email, id]
  );
  if ((result as any).affectedRows === 0) {
    throw new UserNotFoundError();
  }
  return {
    id,
    username,
    email,
  };
};

export const deleteUser = async (id: number) => {
  const [results] = await pool.query("DELETE FROM users where id = ?", [id]);
  if ((results as any).affectedRows === 0) {
    throw new UserNotFoundError();
  }

  return { message: `User ${id} has been deleted` };
};

const existUser = async (email: string) => {
  const [result] = await pool.query(
    "SELECT 1 FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return (result as any[]).length > 0;
};
