"use client";

import Link from "next/link";
import { signOut } from "next-auth/react";
import useNotification from "@/hooks/useNotification";

export default function Header() {
  const { handleSuccess } = useNotification();

  const handleLogOut = () => {
    signOut();
    handleSuccess("Log Out Successful", "See you soon!");
  };

  return (
    <header className="flex justify-between items-center py-5">
      <h1 className="text-2xl">Todos</h1>

      <div className="flex gap-5">
        <button
          onClick={handleLogOut}
          className="border-2 cursor-pointer px-7 py-2 rounded-md border-red-200 bg-red-600 hover:outline-offset-8 hover:bg-red-200 hover:text-red-800"
        >
          Sign Out
        </button>
        <Link
          href={"/new"}
          className="border-2 cursor-pointer px-7 py-2 rounded-md border-slate-200 hover:bg-slate-200 hover:text-slate-800"
        >
          New
        </Link>
      </div>
    </header>
  );
}
