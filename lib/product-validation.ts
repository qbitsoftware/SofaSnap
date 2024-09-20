import { z } from "zod";
import { AddressSchema } from "./search-validation";

export const productSchema = z.object({
    category: z.string(),
    description: z.string().min(12, 'Kirjeldus voiks olla vahemalt pikem kui 12 tahte'),
    width: z.string().min(1, "Sisesta laius"),
    heigth: z.string().min(1, "Sisesta korgus"),
    length: z.string().min(1, "Sisesta pikkus"),
    material: z.string().min(1, "Sisesta materjal"),
    details: z.string().optional(),
    start_date: z.date().min(new Date(), "Tanasest vanemat kuupaeva ei saa lisada"),
    end_date: z.date(),
    type: z.string().min(1, "Sisesta kuulutuse tyyp"),
    price: z.string().min(1, "Hind on noutud"),
    address: AddressSchema,
    primary_img: z.string(),
    secondary_img: z.string(),
    all_img: z.array(z.string()),
}).refine((data => data.width))

export type TProduct = z.infer<typeof productSchema>