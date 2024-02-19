"use client";

import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  success: {
    title: string;
    msg: string;
  };
  error: {
    title: string;
    msg: string;
  };
};

export default function AppProvider({ children }: Props) {
  return <div>{children}</div>;
}
