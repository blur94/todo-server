import Link from "next/link";
import { getTodo, handleEditTodo } from "@/utils/todoFunc";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Edit",
  description: "Edit a todo",
};

type Props = {
  params: { id: string };
};

export default async function EditTodo({ params }: Props) {
  const { id } = params;
  const todo = await getTodo(id);

  const handleEdit = handleEditTodo.bind(null, id);

  return (
    <div className="container mx-auto py-5">
      <header className="flex justify-between items-center my-10">
        <h1 className="text-2xl">New</h1>
      </header>

      {/* <form> */}
      <form action={handleEdit}>
        <div className="flex flex-col gap-3 mb-6">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            defaultValue={todo?.title}
            className="border-2 outline-none rounded-md py-1 px-3 placeholder:text-slate-900 text-slate-600"
          />
        </div>

        <div className="flex items-center justify-end gap-5">
          <Link
            href={".."}
            className="border-2 cursor-pointer px-7 py-2 rounded-md border-slate-200 hover:bg-slate-200 hover:text-slate-800"
          >
            Cancel
          </Link>
          <button
            type="submit"
            className="border-2 cursor-pointer px-7 py-2 rounded-md border-slate-200 hover:bg-slate-200 hover:text-slate-800"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
