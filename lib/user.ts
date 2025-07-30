import pool from "./db";

export const createUser = async (username: string, email: string) => {

    const checkUser = await existUser(email);
    if(checkUser){
        return{
            
        }
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

const existUser = async (email: string) => {
  const [result] = await pool.query(
    "SELECT 1 FROM users WHERE email = ? LIMIT 1",
    [email]
  );
  return (result as any[]).length > 0;
};
