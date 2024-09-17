import { z } from 'zod';

export type TSignUpSchema = z.infer<typeof registerValidator>

export const registerValidator = z.object({
    first_name: z.string().min(1, 'Nimi on noutud'),
    last_name: z.string().min(1, 'Perekonnanimi on noutud'),
    address: z.string().min(1, 'Aadress on noutud'),
    phone: z.string().min(1, 'Tel nr on noutud'),
    email: z.string().email('Ebakorrektne email address'),
    password: z.string().min(6, 'Parool peab olema vahemalt 6 tahemarki pikk'),
    confirm_password: z.string(),
    agreement: z.boolean().refine(val => val, 'Vali peab olema taidetud'),
}).refine(data => data.password === data.confirm_password, {
    message: 'Paroolid ei yhti',
    path: ['confirmPassword'],
});