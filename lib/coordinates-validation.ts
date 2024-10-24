import { z } from "zod";

const GeometrySchema = z.object({
    type: z.string(),
    coordinates: z.tuple([z.number(), z.number()]),
});

const CoordinatesSchema = z.object({
    latitude: z.number(),
    longitude: z.number(),
});

const AddressSchema = z.object({
    address_number: z.string(),
    street_name: z.string(),
});

const CountrySchema = z.object({
    country_code: z.string(),
    name: z.string(),
});

const PlaceSchema = z.object({
    name: z.string(),
});

const PostcodeSchema = z.object({
    name: z.string(),
});

const RegionSchema = z.object({
    name: z.string(),
});

const ContextSchema = z.object({
    country: CountrySchema,
    region: RegionSchema,
    postcode: PostcodeSchema,
    place: PlaceSchema,
    address: AddressSchema,
});

const PropertiesSchema = z.object({
    context: ContextSchema,
    coordinates: CoordinatesSchema,
    full_address: z.string(),
    mapbox_id: z.string(),
    place_formatted: z.string(),
});

export const FeatureSchema = z.object({
    type: z.string(),
    geometry: GeometrySchema,
    properties: PropertiesSchema,
});

// export type SSAddress = z.infer<typeof AddressTS
export type Feature = z.infer<typeof FeatureSchema>

export const addressSchema = z.object({
    full_address: z.string().min(1).optional(),
    location: z.tuple([z.number(), z.number()]).optional(),
    postal_code: z.string().min(1).optional(),
    address_number: z.string().min(1).optional(),
    region: z.string().min(1).optional(),
    country_code: z.string().min(1).optional(),
    country_name: z.string().min(1).optional(),
});

export type AddressProduct = z.infer<typeof addressSchema>