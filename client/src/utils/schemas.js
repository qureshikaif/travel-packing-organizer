import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
});

export const signupSchema = z
  .object({
    username: z
      .string()
      .min(3, "Username must be at least 3 characters long")
      .max(20, "Username must be at most 20 characters long"),
    email: z.string().email("Invalid email address"),
    password: z
      .string()
      .min(6, "Password must be at least 6 characters long")
      .max(50, "Password must be at most 50 characters long"),
    confirmPassword: z
      .string()
      .min(6, "Confirm Password must be at least 6 characters long"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export const gearPackSchema = z.object({
  packName: z
    .string()
    .min(1, "Gear pack name is required")
    .max(100, "Pack name must be at most 100 characters"),
  items: z
    .array(
      z
        .string()
        .min(1, "Gear item cannot be empty")
        .max(100, "Gear item must be at most 100 characters")
    )
    .min(1, "At least one gear item is required"),
});

export const reminderSchema = z.object({
  item: z.string().min(1, "Item to remind is required"),
  timeBefore: z
    .string()
    .refine(
      (date) => !isNaN(new Date(date).getTime()),
      "Please provide a valid date"
    ),
});

export const groupSchema = z.object({
  listName: z.string().min(1, "Group list name is required"),
  members: z
    .array(z.string().min(1, "Select a member"))
    .min(1, "At least one member is required"),
  items: z
    .array(z.string().min(1, "Item name is required"))
    .min(1, "At least one item is required"),
});
