import { NextResponse } from "next/server";
import {
  createDepartmentsService,
  deleteDepartmentsService,
  getDepartmentsService,
  updateDepartmentsService,
} from "@/services/department.service";


type RouteContext = {
  params: Promise<{ id: string }>;
};



export async function getDepartmentsController() {
  try {
    const departments = await getDepartmentsService();

    return NextResponse.json({
      success: true,
      data: departments,
    });
  } catch (error) {
    console.error("Get departments error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch departments",
      },
      { status: 500 },
    );
  }
}

export async function createDepartmentController(request: Request) {
  try {
    const body = await request.json();
    const { name, description } = body;
    
    const department = await createDepartmentsService(name, description);

    return NextResponse.json({
      success: true,
      data: department,
    });
  } catch (error) {
    console.error("POST departments error:", error);

    return NextResponse.json(
      {
        success: false,
        message: "Failed to fetch departments",
      },
      { status: 500 },
    );
  }
}

export async function updateDepartmentController(request: Request,context:RouteContext ) {
  try {
      const { id } = await context.params;
      const body = await request.json();
  
      const departmentId = Number(id);
  
      if (!Number.isInteger(departmentId) || departmentId <= 0) {
        return NextResponse.json(
          { success: false, message: "Invalid department ID" },
          { status: 400 },
        );
      }
  
      const updatedDepartment = await updateDepartmentsService(departmentId,body)
  
      if (!updatedDepartment) {
        return NextResponse.json(
          {
            success: false,
            message: "Department not found",
          },
          { status: 404 },
        );
      }
  
      return NextResponse.json({
        success: true,
        message: "Department updated successfully",
        data: updatedDepartment,
      });
    } catch (error) {
      console.error("Department update failed:", error);
  
      return NextResponse.json(
        { success: false, message: "Failed to update department" },
        { status: 500 },
      );
    }
}

export async function deleteDepartmentController(request: Request,context: RouteContext){
  try {
    const {id}= await context.params
    const departmentId = Number(id)

    if (!Number.isInteger(departmentId) || departmentId <= 0) {
      return NextResponse.json(
        { success: false, message: "Invalid department ID" },
        { status: 400 },
      );
    }

    //
    const deletedDepartment = await deleteDepartmentsService(departmentId)

    if(!deletedDepartment){
        return NextResponse.json({
            success: false,
            message:"Department not found. Deleted Unsuccessful."
        },
    {
        status:404
    })
    }

    return NextResponse.json({
        success: true,
        message: "Department Deleted Successfully.",
        data: deletedDepartment
    })


  } catch (error) {
    console.log("Department Delete failed.",error);

    return NextResponse.json({
      success: false,
      message: "Failed to delete department.",
    });
  }
}
