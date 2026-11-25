import { db } from "@/prisma/db";

interface UpdateBodyType{
  name: string,
  description: string | null
}

export async function getDepartmentsService() {
  const departments = await db.orm.public.Department.orderBy((department) =>
    department.createdAt.desc(),
  ).all();

  return departments;
}

export async function createDepartmentsService(
  name: string,
  description: string | null,
) {
  const department = await db.orm.public.Department.create({
    name: name.trim(),
    description: description?.trim() || null,
  });

  return department;
}

export async function updateDepartmentsService(
  departmentId: number,body:UpdateBodyType
) {
  const updatedDepartment = await db.orm.public.Department.where({
          id: departmentId,
        }).update({
          name: body.name,
          description: body.description,
        });

  return updatedDepartment;
}

export async function deleteDepartmentsService(
  departmentId: number,
) {
  const deletedDepartment = await db.orm.public.Department
    .where({id:departmentId})
    .delete()

  return deletedDepartment;
}