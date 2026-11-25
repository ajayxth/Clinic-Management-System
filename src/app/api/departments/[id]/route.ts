import { NextResponse } from "next/server";
import { db } from "@/prisma/db";
import { deleteDepartmentController, updateDepartmentController } from "@/controller/department.controller";

type RouteContext = {
  params: Promise<{ id: string }>;
};

export async function PUT(request: Request, context: RouteContext) {
  //jjjjj
  return updateDepartmentController(request,context)

}




export async function DELETE(request: Request, context: RouteContext) {
  //lll
  return deleteDepartmentController(request,context)
}
