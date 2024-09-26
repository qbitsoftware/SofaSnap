import React from 'react'
import { cn } from '@/lib/utils'
import { poppins } from '@/fonts'

const Text = () => {
  return (
    <div className={cn('text-justify md:text-left', poppins.className)}>
      <p className='mb-[54px] md:w-[540px] lg:w-[708px]'>"Tere tulemast SofaSnapi, kus me mitte ainult ei vähenda liigostlemist, vaid pakume ka sulle võimalust teenida. Me usume, et igaühel on midagi väärtuslikku - olgu selleks siis mööbel, maal või tehnikaseade - ning meie platvorm annab sulle võimaluse muuta need esemed rahaks.</p>
      <p className='mb-[63px] md:w-[540px] md:ml-[109px] lg:w-[708px]'>SofaSnapi kogukond ei ole ainult keskkonnahoidlik, vaid ka sotsiaalne kogukond, kus iga kasutaja saab jagada ja teenida. Kui sul on seisma jäänud mööblit või tehnikaesemeid, võid leida neile uue kodu ning teenida samal ajal lisaraha. Liitu meiega ja avasta, kuidas iga eseme, mille sa jagad, võib tuua sulle mitte ainult rahalist kasu, vaid ka tunde, et oled osa suuremast jätkusuutliku eluviisi liikumisest.</p>
      <p className='md:w-[540px] lg:w-[738px]'>SofaSnap - kus keskkonnasõbralikkus kohtub võimalustega ja kus iga kasutaja saab olla osa jätkusuutliku tarbimise muutusest!"</p>
    </div>
  )
}

export { Text }