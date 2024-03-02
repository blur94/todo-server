import { createTodo } from "@/utils/todoFunc";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Create",
  description: "Create a new todo",
};

export default function New() {
  return (
    <div className="container mx-auto py-5">
      <header className="flex justify-between items-center my-10">
        <h1 className="text-2xl">New</h1>
      </header>

      <form action={createTodo}>
        <div className="flex flex-col gap-3 mb-6">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
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
