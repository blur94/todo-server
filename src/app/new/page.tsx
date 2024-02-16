import { prisma } from "@/db";
import Link from "next/link";
import { redirect } from "next/navigation";

export default function New() {
  const createTodo = async (data: FormData) => {
    "use server";

    const title = data.get("title")?.valueOf();

    if (typeof title !== "string" || title.length < 1) {
      throw new Error("Title is required");
      //   alert("Title is required");
      return;

      // TODO: Add error handling
      //   return res.status(400).json({ message: "Title is required" });
    }

    await prisma.todo.create({ data: { title, complete: false } });
    redirect("/");
  };
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
