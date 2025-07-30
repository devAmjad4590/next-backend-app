import { NextResponse, NextRequest } from "next/server";
import {
  createReport,
  getAllReports,
  getReportByUserID,
  getUserByReport,
} from "@/lib/report";

export const GET = async (req: NextRequest) => {
  try {
    const userReport = req.nextUrl.searchParams.get("userReport");
    const user = req.nextUrl.searchParams.get("user");
    if (userReport) {
      const reports = await getReportByUserID(parseInt(userReport));
      return new NextResponse(JSON.stringify(reports), { status: 200 });
    } else if (user) {
      const reports = await getUserByReport(parseInt(user));
      return new NextResponse(JSON.stringify(reports), { status: 200 });
    }
    const reports = await getAllReports();
    if (reports) {
      return new NextResponse(JSON.stringify(reports), { status: 200 });
    }
    return new NextResponse("No reports was found", { status: 200 });
  } catch (err) {
    return new NextResponse(
      "Error in getting reports: " + (err as any).message,
      { status: 500 }
    );
  }
};

export const POST = async (req: NextRequest) => {

  try {
    const { title, description, id } = await req.json();
    const res = await createReport(title, description, id);
    return new NextResponse(JSON.stringify(res), { status: 200 });
  } catch (err) {
    return new NextResponse(
      "Error in creating request: " + (err as any).message,
      { status: 500 }
    );
  }
};
