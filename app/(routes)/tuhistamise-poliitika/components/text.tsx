import React from 'react'
import { cn } from '@/lib/utils'
import { poppins } from '@/fonts'

export const Text = () => {
    return (
        <div className={cn('text-justify md:text-left lg:w-[850px] xl:w-[1055px]', poppins.className)}>
            <p className='mb-[10px] md:w-[540px] lg:w-full'>
                <strong>OMANIKUD: </strong> Pange tähele, et kui te omanikuna tühistate broneeringu, saab rentnik raha täies ulatuses tagasi.
            </p>
            <p className='mb-[43px] md:w-[540px] lg:w-full'>
                <strong>RENTIJAD: </strong> Pange tähele, et kui te tühistate broneeringu, kehtivad järgmised
                tühistamistingimused:
            </p>
            <ul className='mb-[34px]'>
                <li>- Tühistamisel hiljemalt 2 päeva enne rendiperioodi algust tagastatakse 100% renditasust. </li>
                <li>- Kui tühistatakse päev enne rendiperioodi algust, tagastatakse 50% renditasust.</li>
                <li>- Kui rendiperioodi alguse päeval tühistatakse, ei tagastata raha. </li>
            </ul>
            <p><strong>Näide:</strong></p>
            <p>Te rendite oma diivani neljapäevaks. Kui laenutaja tühistab rendi kolmapäeval, saab ta 50%
                raha tagasi. Kui laenutaja tühistab laenutuse teisipäeval või varem, saab ta raha tagasi täies
                ulatuses.</p>
        </div>
    )
}

