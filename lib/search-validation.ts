import { z } from "zod"

export type TAddressSearchSchema = z.infer<typeof addressSearch>

export const addressSearch = z.object({
    input: z.string().min(3, ''),
    user_id: z.string().min(12, ''),
})

type AddressContext = {
    country: {
        code: string;
        name: string;
    };
    region: {
        code: string;
        name: string;
    };
    postcode: {
        code: string;
    };
    place: {
        name: string;
    };
    address: {
        street: string;
    };
};

export type Address = {
    address: string;
    context: AddressContext;
    feature_type: string;
    full_address: string;
    language: string;
    maki: string;
    mapbox_id: string;
    metadata: Record<string, unknown>;
    name: string;
    place_formatted: string;
};