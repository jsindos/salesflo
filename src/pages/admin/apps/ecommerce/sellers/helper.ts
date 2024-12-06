import { z } from "zod";

export const baseSellerSchemaObject = {
    name: z.string().max(50).trim().min(1, { message: "Required!" }),
    email: z.string().email().trim().min(1, { message: "Required!" }),
    mobileNumber: z.string().trim().min(1, { message: "Required!" }),
    gender: z
        .union([z.literal("male"), z.literal("female")])
        .optional()
        .refine((val) => val, { message: `Required` }),
    dob: z.string().optional(),
    image: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    verified: z.boolean(),
};

export const createSellerSchema = z
    .object({ ...baseSellerSchemaObject, password: z.string(), confirmPassword: z.string() })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const editSellerSchema = z.object(baseSellerSchemaObject);

export const changeSellerPasswordSchema = z
    .object({
        password: z.string(),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export type ChangeSellerPasswordSchemaType = z.infer<typeof changeSellerPasswordSchema>;
export type CreateSellerSchemaType = z.infer<typeof createSellerSchema>;
export type EditSellerSchemaType = z.infer<typeof editSellerSchema>;
