import { z } from "zod";
import { FeatureSchema } from "./coordinates-validation";

export const productSchema = z
    .object({
        user_id: z.string(),
        name: z.string().min(4, "Nimi peab olema vahemalt 4 tahe pikkune"),
        category: z.string({ message: "Valige kategooria" }).min(1),
        sub_category: z.string({ message: "Valige toote kategooria" }).min(1),
        width: z.number().min(1, "Sisesta laius"),
        heigth: z.number().min(1, "Sisesta kõrgus"),
        length: z.number().min(1, "Sisesta pikkus"),
        material: z.string().min(1, "Sisesta materjal"),
        description: z.string().optional(),
        start_date: z.date().optional(),
        end_date: z.date().optional(),
        type: z.string({ message: "Valige kuulutuse tüüp" }).min(1),
        price: z.number({ message: "Sisestage sobiv hind" }).min(1, "Madalaim hind on 1 euro"),
        address: z.string().min(1, "Aadress on nõutud"),
        all_img: z.array(z.string(), { message: "Lisa vähemalt 1 pilt tootest" }).min(1),
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
    name: z.string().min(4, "Nimi peab olema vahemalt 4 tahe pikkune"),
    category: z.string({ message: "Valige kategooria" }).min(1),
    sub_category: z.string({ message: "Valige toote kategooria" }).min(1),
    width: z.number().min(1, "Sisesta laius"),
    heigth: z.number().min(1, "Sisesta kõrgus"),
    length: z.number().min(1, "Sisesta pikkus"),
    material: z.string().min(1, "Sisesta materjal"),
    description: z.string().optional(),
    start_date: z.string().optional(),
    end_date: z.string().optional(),
    type: z.string({ message: "Valige kuulutuse tüüp" }).min(1),
    price: z.number({ message: "Sisestage sobiv hind" }).min(1, "Madalaim hind on 1 euro"),
    address: FeatureSchema,
    all_img: z.array(z.string(), { message: "Lisa vähemalt 1 pilt tootest" }).min(1),
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
    file: File;
    preview: string;
    name: string;
}