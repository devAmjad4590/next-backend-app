import pool from "./db";

export const getAllReports = async () => {
  const [result] = await pool.query("SELECT * FROM reports");
  return result;
};

export const getReportByUserID = async (id: number) => {
  const [result] = await pool.query("SELECT * FROM reports WHERE submitted_by = ?", [id]);
  return result;
};

export const createReport = async (
  title: string,
  description: string,
  id: number
) => {
  console.log("It works");

  const [result] = await pool.query(
    "INSERT INTO reports (title, description, submitted_by) VALUES (?, ?, ?)",
    [title, description, id]
  );
  return {
    id: (result as any).insertId,
    title,
    description,
  };
};

export const getUserByReport = async (id: number) => {
  const [result] = await pool.query(
    `SELECT r.id as report_id, r.title, r.description, r.submitted_by, r.handled_by,
        submitter.id, submitter.username, submitter.email   

        FROM reports r
        JOIN users submitter ON r.submitted_by = submitter.id
        WHERE r.id = ?
        `,
    [id]
  );
  return result;
};
