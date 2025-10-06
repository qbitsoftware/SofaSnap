import React from 'react'
import { cn } from '@/lib/utils'
import { poppins } from '@/fonts'
import Image from 'next/image'

export const Text = () => {
    return (
        <div className={cn('text-justify md:text-left flex flex-col gap-6 px-4 md:px-0', poppins.className)}>
            <p className='text-lg'>
                <strong>Mööblirendi Platvormi Kasutamine</strong>
            </p>
            {/* Punkt 1  */}
            <div className='flex flex-col lg:flex-row gap-4 my-10 lg:ml-[300px]'>
                <Image src="/images/sofasnap-4.png" alt='Kuidas see töötab?' width={150} height={150} className='w-[120px] h-[120px] lg:w-[150px] lg:h-[150px] mx-auto lg:mx-0' />
                <div>
                    <p className='font-bold'> 1. Registreeru ja loo konto </p>
                    <li>Esmalt registreeri end platvormil kasutajaks, täites vajalikud andmed. Konto loomine annab sulle ligipääsu kõigile platvormi võimalustele.</li>
                </div>
            </div>
            {/* Punkt 2 */}
            <div className='mb-10 max-w-[600px] flex flex-col gap-2'>
                <p className='font-bold'>2. Lisa kuulutus</p>
                <div className='flex flex-col gap-4'>
                    <li>Vali ese, mida soovid välja rentida või müüa – see võib olla ükskõik milline mööbliese, nagu näiteks diivan, laud või riiul.</li>
                    <li>Kirjelda eset selgelt: milleks see sobib, milline on selle seisukord ja mõõtmed (laius, sügavus, kõrgus).</li>
                    <li>Määra, kas soovid eset ainult rentida, müüa või pakkuda mõlemat võimalust.</li>
                </div>
            </div>
            <div className='lg:ml-20 flex flex-col lg:flex-row gap-4 justify-between'>
                <div className='max-w-[500px]'>
                    <p className='font-bold'>3. Lisa head fotod</p>
                    <li>Tee esemest mitu pilti erinevatest nurkadest ja heas valguses.</li>
                    <li>Näita ka kulumisjälgi või muid detaile, mis aitavad hinnata seisukorda.</li>
                    <li>Samas hoia visuaal atraktiivne – hea esitlus suurendab huvi.</li>
                </div>
                <Image src="/images/sofasnap-3.png" alt='Eseme kirjeldus' width={450} height={260} className='w-full max-w-[300px] lg:max-w-[450px] h-auto mx-auto lg:mx-0' />
            </div>
        </div>
    )
}

export const TextWithImage = () => {
    return (
        <div className='relative w-screen bg-[#FAD8CC] min-h-[250px] lg:min-h-[250px] pt-8 lg:pt-20'>
            <div className='max-w-7xl mx-auto px-4 flex justify-center items-center flex-col gap-2'>
                <p className='font-bold text-center'>4. Soovi korral kindlusta ese</p>
                <ul className='text-center px-4'>
                    <li>Kuigi platvorm ei paku ise kindlustust, soovitame mööbli kindlustada kahjude vastu. See kaitseb nii sind kui rentijat.</li>
                </ul>
            </div>
            <div className='relative max-w-6xl mx-auto px-4'>
                <Image
                    src="/images/sofasnap-2.png"
                    alt='Eseme kindlustamine'
                    width={350}
                    height={350}
                    className='mx-auto w-full max-w-[200px] lg:max-w-[350px] h-auto transform lg:translate-y-1/3'
                />
            </div>
        </div>
    )
}

export const TextWithImage2 = () => {
    return (
        <>
            <div className='relative w-screen bg-[#E8EBE8] h-auto min-h-[400px] lg:min-h-[500px] py-12 lg:py-32'>
                <div className='text-center text-lg lg:text-2xl max-w-6xl mx-auto px-4'>
                    <p className='font-bold'>Nii saad hõlpsalt oma mööbli välja rentida või müüa ja aidata kaasa ringmajandusele, andes seisma jäänud esemetele uue elu!</p>
                </div>
                <div className='relative max-w-7xl mx-auto px-4'>
                    <Image
                        src="/images/sofasnap-1.png"
                        alt='Eseme kindlustamine'
                        width={700}
                        height={340}
                        className='mx-auto w-full max-w-[500px] lg:max-w-[860px] h-auto transform lg:translate-y-1/2'
                    />
                </div>
            </div>
            <div className='lg:h-[200px]'></div>
        </>
    )
}

export const Text2 = () => {
    return (
        <div className='flex flex-col pt-16 lg:pt-48 gap-4 lg:gap-16 px-4 md:px-0'>
            {/* Punkt 5 */}
            <div>
                <p className='font-bold lg:pb-10'>5. Suhtle ja lepi kokku</p>
                <li>Kui keegi tunneb huvi, saab ta sinuga ühendust kuulutuse kaudu.</li>
                <li>Suhelge otse ja leppige kokku tingimustes, sh üleandmine.</li>
            </div>
            {/* Punkt 6 */}
            <div className='pt-8'>
                <p className='font-bold lg:pb-10'>6. Kuulutustasu ja nähtavus</p>
                <li>Kuulutuse lisamine maksab 1 €.</li>
                <li>Pärast tehingut palume kuulutus eemaldada.</li>
                <li>Soovid uut tehingut? Lisa uus kuulutus – taas 1 €.</li>
            </div>
            {/* Punkt 6 */}
            <div className='pt-8'>
                <p className='font-bold'>7. Eseme üleandmine</p>
                <li>Lepi huvilisega kokku, kuidas ja kus ese üle antakse – kodus, neutraalsel pinnal või kasutades transporditeenust.</li>
            </div>
            {/* Punkt 7 */}
            <div className='pt-8 pb-[52px]'>
                <p className='font-bold'>8. Tehingu lõpetamine ja tagasiside</p>
                <li>Soovitame jätta tagasisidet – see aitab platvormil toimida usaldusväärselt ja annab infot kasutaja usaldusväärsuse kohta.</li>
            </div>
        </div>
    )
}