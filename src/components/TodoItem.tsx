"use client";

type Props = {
  id: string;
  title: string;
  complete: boolean;
  toggleTodo: (id: string, complete: boolean) => void;
};

export default function TodoItem({ id, title, complete, toggleTodo }: Props) {
  return (
    <li className="flex items-center justify-between w-full">
      <div className="flex items-center justify-start gap-3">
        <input
          type="checkbox"
          name="title"
          id={id}
          className="peer"
          defaultChecked={complete}
          onChange={(e) => toggleTodo(id, e.target.checked)}
        />
        <label
          htmlFor={id}
          className="peer-checked:line-through peer-checked:text-slate-500 cursor-pointer"
        >
          {title}
        </label>
      </div>

      <div className=" flex items-center gap-3">
        <button
          type="button"
          className="border-2 cursor-pointer px-4 py-1 text-sm rounded-md border-red-200 hover:bg-red-400 bg-red-600 hover:text-slate-100"
        >
          Delete
        </button>
        <button
          type="button"
          className="border-2 cursor-pointer px-4 py-1 text-sm rounded-md border-teal-200 hover:bg-teal-400 bg-teal-600 hover:text-slate-100"
        >
          Edit
        </button>
      </div>
    </li>
  );
}
