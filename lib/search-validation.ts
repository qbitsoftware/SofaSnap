import { z } from "zod"

export type TAddressSearchSchema = z.infer<typeof addressSearch>

export const addressSearch = z.object({
    input: z.string().min(3, ''),
    user_id: z.string().min(1, ''),
})

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

export const coordinateSearch = z.object({
    mapbox_id: z.string().min(3, ''),
    user_id: z.string().min(1, ''),
})
export type Coordinates = z.infer<typeof coordinateSearch>;


