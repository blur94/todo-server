import { prisma } from "@/db";
import { RegisterSchema } from "@/utils/auth";
import { NextResponse } from "next/server";
import { z } from "zod";
import { hash } from "bcrypt";

export async function POST(req: Request) {
  type RegisterType = z.infer<typeof RegisterSchema>;

  try {
    const { fullName, email, userName, password }: RegisterType =
      await req.json();
    const findExistingEmail = await prisma.user.findUnique({
      where: { email },
    });
    const findExistingUserName = await prisma.user.findUnique({
      where: { userName },
    });

    if (findExistingEmail)
      return NextResponse.json(
        {
          user: null,
          message: "Email already exists",
        },
        { status: 409 }
      );
    if (findExistingUserName)
      return NextResponse.json(
        {
          user: null,
          message: "User Name already exists",
        },
        { status: 409 }
      );

    const hashedPassword = await hash(password, 10);

    const newUser = await prisma.user.create({
      data: { email, userName, fullName, password: hashedPassword },
      select: { email: true, userName: true, fullName: true },
    });

    return NextResponse.json(
      {
        user: newUser,
        message: "User created successfully",
      },
      { status: 201 }
    );
  } catch (error) {
    NextResponse.json({ message: "Something went wrong" }, { status: 500 });
  }
}

// export async function GET(req: Request) {
//   return NextResponse.json({ message: "Hello World" });
// }
