import { z } from "zod"

export type TAddressSearchSchema = z.infer<typeof addressSearch>

export const addressSearch = z.object({
    input: z.string().min(3, ''),
    user_id: z.string().min(1, ''),
})

const AddressContextSchema = z.object({
    country: z.object({
        name: z.string(),
        code: z.string(),
    }),
    region: z.object({
        name: z.string(),
        code: z.string(),
    }),
    postcode: z.object({
        name: z.string(),
    }),
    place: z.object({
        name: z.string(),
    }),
    address: z.object({
        name: z.string(),
    }),
});

// export const AddressSchema = z.object({
//     address: z.string(),
//     context: AddressContextSchema,
//     feature_type: z.string(),
//     full_address: z.string(),
//     language: z.string(),
//     maki: z.string(),
//     mapbox_id: z.string(),
//     metadata: z.record(z.unknown()),
//     name: z.string(),
//     place_formatted: z.string(),
// });


export const AddressSchema = z.object({
    name: z.string().min(1, 'Address name is required'),
    mapbox_id: z.string().optional(),
    feature_type: z.string().optional(),
    address: z.string().min(1, 'Address is required'),
    full_address: z.string().optional(),
    place_formatted: z.string().optional(),
    context: z.object({
        country: z.object({
            id: z.string().optional(),
            name: z.string().optional()
        }).optional(),
        region: z.object({
            id: z.string().optional(),
            name: z.string().optional()
        }).optional(),
        postcode: z.object({
            id: z.string().optional(),
            name: z.string().optional()
        }).optional(),
        place: z.object({
            id: z.string().optional(),
            name: z.string().optional()
        }).optional(),
        street: z.object({
            id: z.string().optional(),
            name: z.string().optional()
        }).optional(),
    }).optional(),
    language: z.string().optional(),
    maki: z.string().optional(),
    metadata: z.object({}).optional(),
});


export type Address = z.infer<typeof AddressSchema>;