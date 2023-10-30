import { z } from "zod";

// Login Validator
export const loginValidator = z.object({
  email: z.string().email("Invalid email format"),

  password: z
    .string({ required_error: "Password is required" })
    .min(8, "Password must be 8 characters at least")
    .max(16, "Password mus not exceed 16 characters"),
});

export type LoginValidator = z.infer<typeof loginValidator>;

// Register Validator
export const registerValidator = z
  .object({
    first_name: z
      .string()
      .min(3, "Must be 3 characters at least")
      .max(21, "Must not exceed 21 characters")
      .trim(),

    last_name: z
      .string()
      .min(3, "Must be 3 characters at least")
      .max(21, "Must not exceed 21 characters")
      .trim(),

    email: z
      .string()
      .email("Inavlid email format")
      .max(50, "Must not exceed 50 characters")
      .trim(),

    username: z.string().max(50, "Must not exceed 50 characters").trim(),

    password: z
      .string()
      .min(8, "Must be 8 characters at least")
      .max(16, "Must not exceed 16 characters"),

    confirm_password: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirm_password;
    },
    {
      message: "Passwords do not match",
      path: ["confirm_password"],
    }
  );

export type RegisterValidator = z.infer<typeof registerValidator>;

// Forget Password Validator

export const forgetPasswordValidator = z.object({
  email: z.string().email("Invalid email format"),
});

export type ForgetPasswordValidator = z.infer<typeof forgetPasswordValidator>;

// Reset Password Validator
export const resetPasswordValidator = z
  .object({
    password: z
      .string()
      .min(8, "Must be 8 characters at least")
      .max(16, "Must not exceed 16 characters"),

    confirm_password: z.string(),
  })
  .refine(
    (data) => {
      return data.password === data.confirm_password;
    },
    {
      message: "Passwords do not match",
      path: ["confirm_password"],
    }
  );

export type ResetPasswordValidator = z.infer<typeof resetPasswordValidator>;
