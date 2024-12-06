import { z } from "zod";

export const shopSchema = z.object({
    name: z.string().max(50).trim().min(1, { message: "Required!" }),
    email: z.string().email().trim().min(1, { message: "Required!" }),
    mobileNumber: z.string().trim().min(1, { message: "Required!" }),
    sellerId: z.coerce.number({ invalid_type_error: "Required" }),
    description: z.string().optional(),
    address: z.string().optional(),
    city: z.string().optional(),
    state: z.string().optional(),
    postalCode: z.string().optional(),
    verified: z.boolean(),
});

export type ShopSchemaType = z.infer<typeof shopSchema>;
