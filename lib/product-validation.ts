import { z } from "zod";
import { AddressSchema } from "./search-validation";
import { FeatureSchema } from "./coordinates-validation";

export const productSchema = z.object({
    category: z.string().min(1, "Vali kategooria"),
    sub_category: z.string().min(1, 'Vali alamkategooria'),
    width: z.number().min(1, "Sisesta laius"),
    heigth: z.number().min(1, "Sisesta korgus"),
    length: z.number().min(1, "Sisesta pikkus"),
    material: z.string().min(1, "Sisesta materjal"),
    description: z.string().optional(),
    start_date: z.date().min(new Date(), "Tanasest vanemat kuupaeva ei saa lisada"),
    end_date: z.date().min(new Date(), "Tanasest varemat kuupaeva ei ole voimalik valida"),
    type: z.string().min(1, "Sisesta kuulutuse tyyp"),
    price: z.string().min(1, "Hind on noutud"),
    address: z.string().min(1, "Aadress on noutud"),
    primary_img: z.string(),
    secondary_img: z.string(),
    all_img: z.array(z.string()),
})

export const productSchemaServer = z.object({
    category: z.string().min(1, "Vali kategooria"),
    sub_category: z.string().min(1, 'Vali alamkategooria'),
    width: z.number().min(1, "Sisesta laius"),
    heigth: z.number().min(1, "Sisesta korgus"),
    length: z.number().min(1, "Sisesta pikkus"),
    material: z.string().min(1, "Sisesta materjal"),
    description: z.string().optional(),
    start_date: z.date().min(new Date(), "Tanasest vanemat kuupaeva ei saa lisada"),
    end_date: z.date().min(new Date(), "Tanasest varemat kuupaeva ei ole voimalik valida"),
    type: z.string().min(1, "Sisesta kuulutuse tyyp"),
    price: z.string().min(1, "Hind on noutud"),
    address: FeatureSchema,
    primary_img: z.string(),
    secondary_img: z.string(),
    all_img: z.array(z.string()),
})

export type TProductClient = z.infer<typeof productSchema>
export type TProductServer = z.infer<typeof productSchemaServer>