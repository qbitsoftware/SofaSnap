import { z } from 'zod';
import { FeatureSchema } from './coordinates-validation';

export type TSignUpSchema = z.infer<typeof registerValidator>
export type TSignUpSchemaServer = z.infer<typeof registerValidatorServer>

export const registerValidator = z.object({
    first_name: z.string().min(1, 'Nimi on noutud'),
    last_name: z.string().min(1, 'Perekonnanimi on noutud'),
    address: z.string().min(1, 'Aadress ei saa puududa'),
    phone: z.string().min(1, 'Tel nr on noutud'),
    email: z.string().email('Ebakorrektne email address'),
    password: z.string().min(6, 'Parool peab olema vahemalt 6 tahemarki pikk'),
    confirm_password: z.string(),
    agreement: z.boolean().refine(val => val, 'Vali peab olema taidetud'),
    role: z.number().optional(),
}).refine(data => data.password === data.confirm_password, {
    message: 'Paroolid ei yhti',
    path: ['confirm_password'],
});

export const registerValidatorServer = z.object({
    first_name: z.string().min(1, 'Nimi on noutud'),
    last_name: z.string().min(1, 'Perekonnanimi on noutud'),
    address: FeatureSchema,
    phone: z.string().min(1, 'Tel nr on noutud'),
    email: z.string().email('Ebakorrektne email address'),
    password: z.string().min(6, 'Parool peab olema vahemalt 6 tahemarki pikk'),
    confirm_password: z.string(),
    agreement: z.boolean().refine(val => val, 'Vali peab olema taidetud'),
}).refine(data => data.password === data.confirm_password, {
    message: 'Paroolid ei yhti',
    path: ['confirm_password'],
});

export type TPasswordChangeSchema = z.infer<typeof passwordChangeValidator>

export const passwordChangeValidator = z.object({
    password: z.string().min(6, 'Parool peab olema vahemalt 6 tahemarki pikk'),
    confirm_password: z.string(),
}).refine(data => data.password === data.confirm_password, {
    message: 'Paroolid ei yhti',
    path: ['confirm_password'],
})

export type TAccountInformationSchemaClient = z.infer<typeof updateInformationClient>
// export type TAccountInformationSchemaServer = z.infer<typeof updateInformationServer>

export const updateInformationClient = z.object({
    first_name: z.string().min(1, 'Nimi ei saa puududa'),
    last_name: z.string().min(1, 'Perekonnanimi ei saa puududa'),
    address: z.string().min(1, 'Aadress ei saa puududa'),
    phone: z.string().min(1, 'Tel nr ei saa puududa'),
    agreement: z.boolean().refine(val => val, 'Vali peab olema taidetud'),
})

// export const updateInformationServer = z.object({
//     first_name: z.string().min(1, 'Nimi ei saa puududa'),
//     last_name: z.string().min(1, 'Perekonnanimi ei saa puududa'),
//     address: FeatureSchema,
//     phone: z.string().min(1, 'Tel nr ei saa puududa'),
//     agreement: z.boolean().refine(val => val, 'Vali peab olema taidetud'),
// })