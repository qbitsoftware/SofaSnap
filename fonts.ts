import { Inter, Montserrat_Alternates, Poppins } from '@next/font/google';


export const MontserratAlternates = Montserrat_Alternates({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-montserrat',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
})


export const inter = Inter({ subsets: ["latin"] });


export const poppins = Poppins({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-poppins',
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});
