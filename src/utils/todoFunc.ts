"use server";
import { prisma } from "@/db";
import axios from "axios";
import { getServerSession } from "next-auth";
import { getToken } from "next-auth/jwt";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { type NextRequest } from "next/server";
import { authOptions } from "./authOptions";

export const getTodos = async () => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;

  if (userId) return prisma.todo.findMany({ where: { userId: userId } });
};

export const toggleTodo = async (id: string, complete: boolean) => {
  await prisma.todo.update({ where: { id }, data: { complete } });
};

export const deleteTodo = async (id: string) => {
  await prisma.todo.delete({ where: { id } });

  revalidatePath("/");
};

export const createTodo = async (data: FormData) => {
  const session = await getServerSession(authOptions);

  const userId = session?.user.id;
  const title = data.get("title")?.valueOf();
  const deadline = data.get("deadline")?.valueOf();
  console.log(deadline);

  if (typeof title !== "string" || title.length < 1) {
    throw new Error("Title is required");
    //   alert("Title is required");
    return;
  }

  if (userId)
    await prisma.todo.create({
      data: { title, complete: false, userId: userId },
    });

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
