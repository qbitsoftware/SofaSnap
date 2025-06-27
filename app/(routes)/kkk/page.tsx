"use client"

import React from 'react'
import { cn } from '@/lib/utils'
import { poppins } from '@/fonts'
import { Breadcrumb } from '@/components/breadcrumb'

export default function FAQ() {
  return (
    <div className="flex flex-col justify-center xl:max-w-[1440px] w-full px-4 lg:px-[56px] pt-[30px] mx-auto">
      <div className='mb-[38px]'>
        <Breadcrumb text='Korduma Kippuvad Küsimused' link='/' />
      </div>
      <div className="lg:ml-[60px] xl:ml-[135px] mb-[69px]">
        <div className={cn('text-justify md:text-left flex flex-col gap-8', poppins.className)}>
          <p className='text-lg'>
            <strong>Korduma Kippuvad Küsimused (KKK)</strong>
          </p>

          {/* Question 1 */}
          <div>
            <p><strong>1. Mis on Seatly?</strong></p>
            <p>Seatly on platvorm, kus saad lisada mööblit kuulutustena, et neid rentida või müüa. Platvorm ei vahenda makseid ega sekku tehingusse – Sina suhtled huvilisega otse ja lepid tingimused ise kokku.</p>
          </div>

          {/* Question 2 */}
          <div>
            <p><strong>2. Kui palju maksab kuulutuse lisamine?</strong></p>
            <p>Iga kuulutuse lisamine maksab 1 €. Kuulutus on aktiivne seni, kuni sa selle ise eemaldad (nt peale rendile andmist või müüki).</p>
          </div>

          {/* Question 3 */}
          <div>
            <p><strong>3. Kas Seatly võtab tehingu pealt vahendustasu?</strong></p>
            <p>Ei. Seatly ei võta tehingutelt vahendustasu. Platvorm teenib vaid 1 € kuulutustasu.</p>
          </div>

          {/* Question 4 */}
          <div>
            <p><strong>4. Kas kuulutustasu makstakse igal kuul?</strong></p>
            <p>Ei. Tegu ei ole kuupõhise tasuga. 1 € makstakse iga kord, kui kuulutus lisatakse. Kui kuulutus on eemaldatud ja soovid hiljem uuesti sama eset pakkuda, lisad uue kuulutuse ja maksad uuesti 1 €.</p>
          </div>

          {/* Question 5 */}
          <div>
            <p><strong>5. Kuidas kuulutusi lisada?</strong></p>
            <ul>
              <li>- Registreeri kasutajaks.</li>
              <li>- Vali &quot;Lisa kuulutus&quot;.</li>
              <li>- Täida info: esemekirjeldus, mõõdud, hind (rent või müük), fotod.</li>
              <li>- Tasudes 1 €, ilmub kuulutus platvormil nähtavale.</li>
            </ul>
          </div>

          {/* Question 6 */}
          <div>
            <p><strong>6. Kuidas saan maksta kuulutuse eest?</strong></p>
            <p>Maksmine toimub turvalise makselingi kaudu (nt Stripe või pangalink). Pärast tasumist saad kinnituse e-posti teel.</p>
          </div>

          {/* Question 7 */}
          <div>
            <p><strong>7. Kes maksab rendi või ostu eest?</strong></p>
            <p>Kokkulepe ja makse toimuvad otse kasutajate vahel. Seatly ei kogu ega vahenda raha.</p>
          </div>

          {/* Question 8 */}
          <div>
            <p><strong>8. Kuidas lepingut sõlmida?</strong></p>
            <p>Soovitame sul allkirjastada lihtne rendileping või ostu-müügileping koos teise osapoolega.</p>
          </div>

          {/* Question 9 */}
          <div>
            <p><strong>9. Kas ma pean eseme kindlustama?</strong></p>
            <p>See pole kohustuslik, kuid soovitame. Kui annad väärtuslikku mööblit rendile, tasub kindlustada see kodukindlustuse kaudu või sõlmida eraldi kaitsekokkulepe rentijaga.</p>
          </div>

          {/* Question 10 */}
          <div>
            <p><strong>10. Kas keegi kontrollib kuulutuste sisu?</strong></p>
            <p>Seatly meeskond võib kuulutusi modereerida, et need vastaksid reeglitele. Kui kuulutus rikub platvormi tingimusi (nt ebaaus teave, sobimatud pildid), on Seatlyl õigus see eemaldada.</p>
          </div>

          {/* Question 11 */}
          <div>
            <p><strong>11. Mida teha, kui keegi ei vasta kuulutusele?</strong></p>
            <p>Proovi parandada pilte, täiendada kirjeldust või langetada hinda. Platvorm on uus ja nähtavus kasvab ajas – head kuulutused tõmbavad rohkem tähelepanu.</p>
          </div>

          {/* Question 12 */}
          <div>
            <p><strong>12. Kuidas saan kuulutuse eemaldada?</strong></p>
            <p>Logi sisse, mine &quot;Minu kuulutused&quot; ja vali &quot;Eemalda&quot;. Kui ese on renditud või müüdud, palume kuulutus eemaldada kohe pärast tehingut.</p>
          </div>

          {/* Question 13 */}
          <div className='pb-[32px]'>
            <p><strong>13. Kas ma saan tagastada 1 € kuulutustasu?</strong></p>
            <p>Tasu tagastatakse vaid juhul, kui tehnilise vea tõttu ei õnnestu kuulutust üles panna või see ei ilmu platvormil korrektselt. Muudel juhtudel kuulutustasu ei tagastata.</p>
          </div>

          <div className='text-center pb-[52px]'>
            <p className='text-lg md:text-xl'><strong>Nii saad hõlpsalt oma mööbli välja rentida või müüa ja aidata kaasa ringmajandusele, andes seisma jäänud esemetele uue elu!</strong></p>
          </div>
        </div>
      </div>
    </div>
  )
}