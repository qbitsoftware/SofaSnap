import React from 'react'
import { cn } from '@/lib/utils'
import { poppins } from '@/fonts'

export const Text = () => {
    return (
        <div className={cn('text-justify md:text-left flex flex-col gap-6', poppins.className)}>
            <p className='text-lg'>
                <strong>Viimati uuendatud: 24.10.2024</strong>
            </p>
            <p>
                Käesolevad müügitingimused reguleerivad Seatly OÜ (edaspidi „Platvorm&quot;) teenuste kasutamist ja on siduvad kõigile kasutajatele. Kasutades Seatly platvormi, nõustute alljärgnevate tingimustega.
            </p>
            {/* Section 1 */}
            <div>
                <p><strong>1. Üldtingimused</strong></p>
                <ul>
                    <li>1.1. Teenuse eesmärk: Platvorm võimaldab kasutajatel lisada mööbli rendi- ja müügikuulutusi ning sõlmida omavahelisi tehinguid.</li>
                    <li>1.2. Vahendaja roll: Seatly on vahendaja ja ei osale rendi- ega müügitehingutes otseselt. Vastutus eseme seisukorra, kvaliteedi ja müügitehingu täitmise eest lasub kasutajatel.</li>
                    <li>1.3. Vanus ja õiguslik seisund: Teenust saavad kasutada vähemalt 18-aastased isikud, kellel on õigus sõlmida siduvaid lepinguid.</li>
                </ul>
            </div>
            {/* Section 2 */}
            <div>
                <p><strong>2. Kuulutuste lisamine</strong></p>
                <ul>
                    <li>2.1. Eseme kirjeldus: Müüja vastutab kuulutuse täpse ja ausa sisestamise eest, sealhulgas eseme seisukorra, mõõtmete ja muu olulise info lisamise eest.</li>
                    <li>2.2. Fotod: Eseme fotod peavad olema selged ja andma objektiivse ülevaate mööblist. Valeandmete esitamine on keelatud.</li>
                    <li>2.3. Hind: Müüja määrab eseme hinna ise, kuid Platvormil on õigus eemaldada ilmselgelt eksitavaid või ebaõiglasi kuulutusi.</li>
                    <li>2.4. Kestus: Kuulutus jääb aktiivseks, kuni müüja otsustab selle eemaldada või kuni tehing on lõpule viidud.</li>
                </ul>
            </div>
            {/* Section 3 */}
            <div>
                <p><strong>3. Tehingute tegemine</strong></p>
                <ul>
                    <li>3.1. Müügi teostamine: Müüja ja ostja lepivad müügitingimustes kokku otse Platvormi sõnumisüsteemi kaudu. Platvorm soovitab kokku leppida ka üleandmise tingimused (asukoht, transport, aeg).</li>
                    <li>3.2. Maksmine: Kõik maksed toimuvad Platvormi kaudu, mis lisab tehingule turvalisuse. Müüja saab tasu pärast tehingu edukat lõpetamist ja ostja kinnitust.</li>
                    <li>3.3. Vahendustasu: Seatly võtab iga müügitehingu pealt vahendustasu 5%.</li>
                </ul>
            </div>
            {/* Section 4 */}
            <div>
                <p><strong>4. Transport ja üleandmine</strong></p>
                <ul>
                    <li>4.1. Kohustused: Müüja ja ostja vastutavad ühiselt eseme üleandmise ja transpordi korraldamise eest.</li>
                    <li>4.2. Eseme üleandmine: Eseme seisukord peab vastama kuulutuses kirjeldatule. Soovitame osapooltel teha üleandmise käigus fotod, et vältida võimalikke vaidlusi.</li>
                </ul>
            </div>
            {/* Section 5 */}
            <div>
                <p><strong>5. Tagastused ja vaidlused</strong></p>
                <ul>
                    <li>5.1. Tagastamispoliitika: Müügitehingud on lõplikud, välja arvatud juhul, kui müüja ja ostja lepivad omavahel kokku teisiti.</li>
                    <li>5.2. Vaidluste lahendamine: Kui ostja leiab, et ese ei vasta kirjeldatule, tuleb probleemist teavitada Platvormi kliendituge 48 tunni jooksul pärast eseme kättesaamist. Platvorm aitab osapooltel leida kompromissi, kuid ei vastuta otseselt vaidluste lahendamise eest.</li>
                </ul>
            </div>
            {/* Section 6 */}
            <div>
                <p><strong>6. Vastutus ja garantiid</strong></p>
                <ul>
                    <li>6.1. Müüja vastutus: Müüja vastutab eseme kvaliteedi ja vastavuse eest kuulutusele.</li>
                    <li>6.2. Ostja vastutus: Ostja vastutab tehingu ja eseme vastuvõtmise eest.</li>
                    <li>6.3. Platvormi vastutuse piirangud: Seatly ei vastuta kasutajate vahel sõlmitud tehingute ega võimalike kahjude eest, mis tulenevad platvormi kasutamisest.</li>
                </ul>
            </div>
            {/* Section 7 */}
            <div>
                <p><strong>7. Kasutaja konto ja tegevused</strong></p>
                <ul>
                    <li>7.1. Konto loomine: Kasutaja peab registreerima konto ja tagama, et esitatud info on õige ja ajakohane.</li>
                    <li>7.2. Keelatud tegevused: Kuulutuste lisamine, mis sisaldavad valeteavet, pettust või rikuvad seadusi, on keelatud. Sellised kuulutused eemaldatakse ja kontod võidakse blokeerida.</li>
                </ul>
            </div>
            {/* Section 8 */}
            <div>
                <p><strong>8. Andmekaitse ja privaatsus</strong></p>
                <p>Seatly töötleb kasutajate isikuandmeid vastavalt [privaatsuspoliitikale].</p>
            </div>
            {/* Section 9 */}
            <div>
                <p><strong>9. Muud tingimused</strong></p>
                <ul>
                    <li>9.1. Tingimuste muudatused: Seatly jätab endale õiguse muuta käesolevaid müügitingimusi, teavitades kasutajaid ette.</li>
                    <li>9.2. Kohaldatav seadus: Müügitingimustele kohaldatakse Eesti Vabariigi seadusi.</li>
                </ul>
            </div>
            {/* Section 10 */}
            <div className='pb-[52px]'>
                <p><strong>10. Kontaktinfo</strong></p>
                <p>Kui teil on küsimusi või probleeme, võtke ühendust meie klienditoega:</p>
                <ul>
                    <li>E-post: seatly@seatly.com</li>
                    <li>Telefon: +372 58090777</li>
                </ul>
            </div>
            <div className='text-center'>
                <p><strong>Nii saad hõlpsalt oma mööbli välja rentida või müüa ja aidata kaasa ringmajandusele, andes seisma jäänud esemetele uue elu!</strong></p>
                </div>
        </div>
    )
}
