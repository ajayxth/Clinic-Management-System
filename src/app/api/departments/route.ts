import { NextResponse } from "next/server";
import {db} from "@/prisma/db"
import { createDepartmentController, getDepartmentsController } from "@/controller/department.controller";

export async function GET() {
  return getDepartmentsController()
}



export async function POST(request: Request) {
  return createDepartmentController(request)
}
