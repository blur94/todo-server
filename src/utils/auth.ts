import { z } from "zod";

export const RegisterValues = {
  fullName: "",
  userName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const RegisterSchema = z
  .object({
    fullName: z.string().min(1, "Full Name is required").max(20),
    userName: z.string().min(1, "User Name is required"),
    email: z.string().email("Invalid Email").min(1, "Email is required"),
    password: z
      .string()
      .regex(
        /^(?=.*[A-Z])(?=.*\d)(?=.*\W).+$/,
        "Password must contain at least 1 uppercase letter, 1 number, and 1 special character"
      )
      .min(8, "Password must be at least 8 characters long"),
    confirmPassword: z.string(),
  })
  .refine(({ password, confirmPassword }) => password === confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });
