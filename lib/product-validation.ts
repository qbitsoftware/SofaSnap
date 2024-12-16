import { z } from "zod";
import { addressSchema } from "./coordinates-validation";
import { ProductWithAddress } from "@/utils/supabase/supabase.types";

export const productSchema = z
    .object({
        user_id: z.string(),
        name: z.string().min(4, "Nimi peab olema vahemalt 4 tähe pikkune").max(25, "Nimi ei saa olla pikem kui 25 tahemarki"),
        category: z.string({ message: "Valige kategooria" }).min(1, "Valige kategooria"),
        sub_category: z.string({ message: "Valige toote kategooria" }).min(1, "Valige toote kategooria"),
        width: z.number({ message: "Sisestage number" }).min(0, "Sisesta laius").max(10000, "Laius ei saa olla suurem kui 100m"),
        heigth: z.number({ message: "Sisestage number" }).min(0, "Sisesta kõrgus").max(10000, "Kõrgus ei saa olla suurem kui 100m"),
        length: z.number({ message: "Sisestage number" }).min(0, "Sisesta pikkus").max(10000, "Pikkus ei saa olla suurem kui 100m"),
        material: z.string().min(1, "Sisesta materjal").max(25, "Materjal ei saa olla pikem kui 25 tahemarki"),
        description: z.string().max(300, "Kirjeldus ei saa olla pikem kui 300 tahemarki").optional(),
        start_date: z.date().optional(),
        end_date: z.date().optional(),
        unique_id: z.string(),
        type: z.string({ message: "Valige kuulutuse tüüp" }).min(1, "Valige sobiv kuulutuse tüüp"),
        price: z.number({ message: "Sisestage sobiv hind" }).min(1, "Madalaim hind on 1 euro").max(1000000, "Hind ei saa olla suurem kui 1 miljon"),
        address: z.string().min(1, "Aadress on nõutud"),
        status: z.string().optional(),
        all_img: z.array(z.string(), { message: "Lisa vähemalt 1 pilt tootest" }).min(1, "Lisa vähemalt 1 pilt tootest").max(10, "10 pilti on maksimaalne kogus"),
    }).superRefine((value, ctx) => {

        const today = new Date();
        if (value.type === "rent") {
            if (!value.start_date) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Alguskuupäev on nõutav",
                    path: ["start_date"],
                });
            } else if (value.start_date < today) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Alguskuupäev ei tohi olla minevikus",
                    path: ["start_date"],
                });
            }

            if (!value.end_date) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Lõppkuupäev on nõutav",
                    path: ["end_date"],
                });
            } else if (value.end_date < today) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Lõppkuupäev ei tohi olla minevikus",
                    path: ["end_date"],
                });
            }
        }
    });




export const productSchemaServer = z.object({
    user_id: z.string(),
    name: z.string().min(4, "Nimi peab olema vahemalt 4 tahe pikkune").max(25, "Nimi ei saa olle pikem kui 25 tahemarki"),
    category: z.string({ message: "Valige kategooria" }).min(1),
    sub_category: z.string({ message: "Valige toote kategooria" }).min(1),
    width: z.number().min(0, "Sisesta laius").max(10000, "Laius ei saa olla suurem kui 100m"),
    heigth: z.number().min(0, "Sisesta kõrgus").max(10000, "Korgus ei saa olla suurem kui 100m"),
    length: z.number().min(0, "Sisesta pikkus").max(10000, "Pikkus ei saa olla suurem kui 100m"),
    material: z.string().min(1, "Sisesta materjal").max(25, "Materjal ei saa olla pikem kui 25 tahemarki"),
    description: z.string().max(300, "Kirjeldus ei saa olla pikem kui 300 tahemarki").optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    unique_id: z.string(),
    type: z.string({ message: "Valige kuulutuse tüüp" }).min(1),
    price: z.number({ message: "Sisestage sobiv hind" }).min(1, "Madalaim hind on 1 euro").max(1000000, "Hind ei saa olla suurem kui 1 miljon"),
    address: addressSchema,
    all_img: z.array(z.string(), { message: "Lisa vähemalt 1 pilt tootest" }).min(1).max(10, "9 pilti on maksimaalne kogus"),
    total_clicks: z.number().optional(),
}).superRefine((value, ctx) => {
    const today = new Date();
    if (value.type === "rent") {
        if (value.start_date) {
            const startDate = new Date(value.start_date);
            if (startDate < today) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Alguskuupäev ei tohi olla minevikus",
                    path: ["start_date"],
                });
            }
        } else {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Alguskuupäev on nõutav",
                path: ["start_date"],
            });
        }
        if (value.end_date) {
            const endDate = new Date(value.end_date);
            if (endDate < today) {
                ctx.addIssue({
                    code: z.ZodIssueCode.custom,
                    message: "Lõppkuupäev ei tohi olla minevikus",
                    path: ["end_date"],
                });
            }
        } else {
            ctx.addIssue({
                code: z.ZodIssueCode.custom,
                message: "Lõppkuupäev on nõutav",
                path: ["end_date"],
            });
        }

    }
});

export type TProductClient = z.infer<typeof productSchema>
export type TProductServer = z.infer<typeof productSchemaServer>

export interface IImage {
    id: string;
    file: File | undefined;
    preview: string;
    name: string;
}



export const RentFormSchema = z.object({
    type: z.enum(["sell", "rent"]),
    dateRange: z.object({
        from: z.date({
            required_error: "A start date is required.",
        }).refine((date) => date !== undefined, {
            message: "Start date cannot be undefined.",
        }),
        to: z.date({
            required_error: "An end date is required.",
        }).refine((date) => date !== undefined, {
            message: "End date cannot be undefined.",
        }),
    }).refine((data) => data.from <= data.to, {
        message: "End date cannot be before start date.",
        path: ["to"],
    }),
});

export type CartItemTS = z.infer<typeof RentFormSchema>
export type CartItem = CartItemTS & ProductWithAddress

export const reviewFormSchema = z.object({
    user_id: z.string().optional(),
    product_id: z.number(),
    description: z.string().min(10, {
        message: "Description must be at least 10 characters.",
    }),
    rating: z.enum(["1", "2", "3", "4", "5"], {
        required_error: "Please select a rating.",
    }),
})

export type Review = z.infer<typeof reviewFormSchema>