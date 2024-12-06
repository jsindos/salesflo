import { z } from "zod";

export const productSchema = z.object({
    image: z.string().optional(),
    name: z.string({ required_error: "Required!" }).trim().min(1, { message: "Required!" }).max(50),
    description: z.string().max(200).optional(),
    category: z.string({ required_error: "Required!" }),
    costPrice: z.coerce.number({ required_error: "Required!" }),
    discountPercentage: z.coerce.number().optional(),
    discountPrice: z.coerce.number().optional(),
    salePrice: z.coerce.number().optional(),
    taxPercentage: z.coerce.number().optional(),
    sku: z.string({ required_error: "Required!" }).trim().min(1, { message: "Required!" }).max(50),
    stock: z.coerce.number({ required_error: "Required!" }),
    stockAlert: z.coerce.number().optional(),
    stockStatus: z.boolean(),
    displayAvailability: z.boolean(),
    weight: z.coerce.number().optional(),
    width: z.coerce.number().optional(),
    height: z.coerce.number().optional(),
    depth: z.coerce.number().optional(),
    freeShipping: z.boolean(),
    slug: z.string().max(50).optional(),
    metaTitle: z.string().max(50).optional(),
    metaDescription: z.string().optional(),
});

export type ProductSchemaType = z.infer<typeof productSchema>;

export const calculateDiscountPrice = (priceArgs: {
    discountPercentage?: number;
    salePrice?: number;
    costPrice?: number;
}) => {
    const price = priceArgs.salePrice || priceArgs.costPrice;
    return price && priceArgs.discountPercentage
        ? Number(Math.max(price - (price * Number(priceArgs.discountPercentage)) / 100, 0).toFixed(2))
        : undefined;
};
