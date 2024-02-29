import TodoItem from "@/components/TodoItem";
import { authOptions } from "@/utils/authOptions";
import { getTodos, toggleTodo, deleteTodo } from "@/utils/todoFunc";
import { getServerSession } from "next-auth";
import Link from "next/link";
import Header from "./Header";

export default async function Home() {
  const todos = await getTodos();
  const session = await getServerSession(authOptions);

  return (
    <main className="container mx-auto">
      <Header />

      <ul className="list-disc list-inside flex flex-col gap-3">
        {todos.map((todo) => (
          <TodoItem
            key={todo.id}
            {...todo}
            toggleTodo={toggleTodo}
            deleteTodo={deleteTodo}
          />
        ))}
      </ul>
    </main>
  );
}
