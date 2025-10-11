import { z } from 'zod';

const baseRegisterSchema = z.object({
    email: z.string().email('Ebakorrektne emaili address'),
    password: z.string().min(6, 'Parool peab olema vähemalt 6 tähemarki pikk'),
    confirm_password: z.string(),
    agreement: z.boolean().refine(val => val, 'Väli peab olema täidetud'),
    role: z.number().optional(),
});

const eraisikSchema = baseRegisterSchema.extend({
    userType: z.literal('Eraisik'),
    first_name: z.string().min(1, 'Nimi on kohustuslik'),
    last_name: z.string().min(1, 'Perekonnanimi on kohustuslik'),
    address: z.string().min(1, 'Aadress on kohustuslik'),
    phone: z.string().min(1, 'Telefoninumber on kohustuslik'),
});

const ariklientSchema = baseRegisterSchema.extend({
    userType: z.literal('Äriklient'),
    company_name: z.string().min(1, 'Ettevõtte nimi on kohustuslik'),
    registry_code: z.string().min(1, 'Registri kood on kohustuslik'),
    vat_number: z.string().optional(),
    phone: z.string().min(1, 'Telefoninumber on kohustuslik'),
    contact_person: z.string().min(1, 'Kontaktisik on kohustuslik'),
});

export const registerValidator = z.discriminatedUnion('userType', [
    eraisikSchema,
    ariklientSchema,
]).refine(data => data.password === data.confirm_password, {
    message: 'Paroolid ei ühti',
    path: ['confirm_password'],
});
export type TSignUpSchema = z.infer<typeof registerValidator>
export type Eraklient = z.infer<typeof eraisikSchema>
export type Ariklient = z.infer<typeof ariklientSchema>

export type TPasswordChangeSchema = z.infer<typeof passwordChangeValidator>

export const passwordChangeValidator = z.object({
    password: z.string().min(6, 'Parool peab olema vähemalt 6 tähemarki pikk'),
    confirm_password: z.string(),
}).refine(data => data.password === data.confirm_password, {
    message: 'Paroolid ei ühti',
    path: ['confirm_password'],
})

const baseUpdateInformationSchema = z.object({
    phone: z.string().min(1, 'Telefoninumber ei saa puududa'),
    agreement: z.boolean().refine(val => val, 'Väli peab olema täidetud'),
});

const eraisikUpdateSchema = baseUpdateInformationSchema.extend({
    userType: z.literal('Eraisik'),
    first_name: z.string().min(1, 'Nimi ei saa puududa'),
    last_name: z.string().min(1, 'Perekonnanimi ei saa puududa'),
    address: z.string().min(1, 'Aadress ei saa puududa'),
});

const ariklientUpdateSchema = baseUpdateInformationSchema.extend({
    userType: z.literal('Äriklient'),
    company_name: z.string().min(1, 'Ettevõtte nimi ei saa puududa'),
    registry_code: z.string().min(1, 'Registri kood ei saa puududa'),
    vat_number: z.string().optional(),
    contact_person: z.string().min(1, 'Kontaktisik ei saa puududa'),
});

export const updateInformationClient = z.discriminatedUnion('userType', [
    eraisikUpdateSchema,
    ariklientUpdateSchema,
]);

export type TAccountInformationSchemaClient = z.infer<typeof updateInformationClient>