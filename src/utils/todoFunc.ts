"use server";
import { prisma } from "@/db";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export const getTodos = async () => {
  return prisma.todo.findMany();
};

export const toggleTodo = async (id: string, complete: boolean) => {
  await prisma.todo.update({ where: { id }, data: { complete } });
};

export const deleteTodo = async (id: string) => {
  await prisma.todo.delete({ where: { id } });

  revalidatePath("/");
};

export const createTodo = async (data: FormData) => {
  const title = data.get("title")?.valueOf();

  if (typeof title !== "string" || title.length < 1) {
    throw new Error("Title is required");
    //   alert("Title is required");
    return;
  }

  await prisma.todo.create({ data: { title, complete: false } });

  redirect("/");
};

export const getTodo = async (id: string) => {
  return await prisma.todo.findUnique({ where: { id } });
};

export const handleEditTodo = async (id: string, data: FormData) => {
  const title = data.get("title")?.valueOf();
  if (typeof title !== "string" || title.length < 1) {
    throw new Error("Title is required");
    return;
  }

  await prisma.todo.update({ where: { id }, data: { title } });
  redirect("/");
};
