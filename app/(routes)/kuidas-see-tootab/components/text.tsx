import React from 'react'
import { cn } from '@/lib/utils'
import { poppins } from '@/fonts'

export const Text = () => {
    return (
        <div className={cn('text-justify md:text-left flex flex-col gap-6', poppins.className)}>
            <p className='text-lg'>
                <strong>Mööblirendi Platvormi Kasutamine</strong>
            </p>
            {/* Punkt 1  */}
            <div >
                <p> 1. Registreeru ja loo konto </p>
                <ul >
                    <li>- Esmalt registreeri end platvormil kasutajaks, täites vajalikud andmed. Konto loomine annab sulle ligipääsu kõigile platvormi võimalustele.</li>
                </ul>
            </div>
            {/* Punkt 2 */}
            <div>
                <p>2. Kuulutuse loomine</p>
                <p>Vali ese, mida soovid välja rentida või müüa – see võib olla ükskõik milline mööbliese, nagu näiteks diivan, laud või riiul.</p>
                <p>Lisa kvaliteetsed fotod:</p>
                <ul className='mb-[10px]'>
                    <li>- Tee esemest mitu fotot eri nurkade alt, et anda hea ülevaade selle seisukorrast.</li>
                    <li>- Kasuta head valgustust – päikesevalgus on parim!</li>
                    <li>- Püüa jäädvustada ka eseme suurus.</li>
                    <li>- Veendu, et fotodel on näha võimalikke kulumisjälgi või muid detaile, mis aitavad seisukorda hinnata.</li>
                    <li>- Samas proovi säilitata eseme kutsuv välimus.</li>
                </ul>
                <p>Kirjuta eseme kirjeldus:</p>
                <ul className='mb-[10px]'>
                    <li>- Lühidalt ja selgelt selgita, mis ese on, milleks see sobib ja millises seisukorras see on.</li>
                </ul>
                <p>Lisa eseme mõõtmed (laius, sügavus, kõrgus), et huvilised saaksid hinnata, kas see sobib nende ruumi.</p>
                <p>Määra hind ja vali, kas ese on:</p>
                <ul>
                    <li>- Ainult rendiks</li>
                    <li>- Ainult müügiks</li>
                    <li>- Või nii rendiks kui ka müügiks, et kliendid saaksid valida, kumma nad soovivad.</li>
                </ul>
            </div>
            {/* Punkt 3 */}
            <div>
                <p>3. Kindlusta oma ese</p>
                <ul>
                    <li>- Mööbli välja rentimisel tasub see kindlustada võimalike kahjustuste vastu. See annab lisakindlust nii sulle kui ka rentijale, et ootamatute juhtumite korral on kahjud kaetud.</li>
                </ul>
            </div>
            {/* Punkt 4 */}
            <div>
                <p>4. Eseme broneerimine</p>
                <ul>
                    <li>- Kui keegi soovib sinu eset rentida, saab ta märkida kuupäevad, millal ta seda vajab.</li>
                    <li>- Platvormil saavad rentija ja kuulutaja omavahel suhelda ning kokku leppida, kuidas ja millal ese üle antakse.</li>
                </ul>
            </div>
            {/* Punkt 5 */}
            <div>
                <p>5. Tasumine ja vahendustasu</p>
                <ul>
                    <li>- Kui renditehing on kokku lepitud, toimub maksmine platvormi kaudu, mis lisab tehingule 5% vahendustasu. See tähendab, et sina ei pea muretsema arvelduste pärast – platvorm haldab seda automaatselt.</li>
                </ul>
            </div>
            {/* Punkt 6 */}
            <div>
                <p>6. Eseme üleandmine</p>
                <ul>
                    <li>- Lepi rentijaga kokku kohaletoimetamise üksikasjad. Võite kohtuda näiteks kodus või mõnes muus sobivas kohas.</li>
                </ul>
            </div>
            {/* Punkt 7 */}
            <div className='pb-[52px]'>
                <p>7. Tehingu lõpetamine ja tagasiside</p>
                <ul>
                    <li>- Kui rentija eseme tagastab, on tehing lõppenud. Sa võid jätta talle tagasiside, mis aitab teistel kasutajatel paremini rentijate usaldusväärsust hinnata.</li>
                </ul>
            </div>
            <div className='text-center'>
                <p><strong>Nii saad hõlpsalt oma mööbli välja rentida või müüa ja aidata kaasa ringmajandusele, andes seisma jäänud esemetele uue elu!</strong></p>
            </div>
        </div>
    )
}

