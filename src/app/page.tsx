import TodoItem from "@/components/TodoItem";
import { getTodos, toggleTodo, deleteTodo } from "@/utils/todoFunc";

import Header from "./Header";

export default async function Home() {
  const todos = await getTodos();

  return (
    <main className="container mx-auto">
      <Header />

      <ul className="list-disc list-inside flex flex-col gap-3">
        {todos?.map((todo) => (
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
