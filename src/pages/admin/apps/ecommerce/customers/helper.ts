import { z } from "zod";

const baseCustomerSchemaObject = {
    name: z.string().max(50).trim().min(1, { message: "Required!" }),
    email: z.string().email(),
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

export const changeCustomerPasswordSchema = z
    .object({
        password: z.string().trim().min(1, { message: "Required!" }),
        confirmPassword: z.string().trim().min(1, { message: "Required!" }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const createCustomerSchema = z
    .object({
        ...baseCustomerSchemaObject,
        password: z.string(),
        confirmPassword: z.string(),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: "Passwords don't match",
        path: ["confirmPassword"],
    });

export const editCustomerSchema = z.object(baseCustomerSchemaObject);

export type EditCustomerSchemaType = z.infer<typeof editCustomerSchema>;
export type CreateCustomerSchemaType = z.infer<typeof createCustomerSchema>;
export type ChangeCustomerPasswordSchemaType = z.infer<typeof changeCustomerPasswordSchema>;
