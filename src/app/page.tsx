import TodoItem from "@/components/TodoItem";
import { prisma } from "@/db";

import Link from "next/link";

const getTodos = () => {
  return prisma.todo.findMany();
};

const toggleTodo = async (id: string, complete: boolean) => {
  "use server";

  await prisma.todo.update({ where: { id }, data: { complete } });
};

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="container mx-auto">
      <header className="flex justify-between items-center py-5">
        <h1 className="text-2xl">Todos</h1>
        <Link
          href={"/new"}
          className="border-2 cursor-pointer px-7 py-2 rounded-md border-slate-200 hover:bg-slate-200 hover:text-slate-800"
        >
          New
        </Link>
      </header>

      <ul className="list-disc list-inside flex flex-col gap-3">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </main>
  );
}
