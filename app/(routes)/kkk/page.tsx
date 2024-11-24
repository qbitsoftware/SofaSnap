"use client"

import { useState } from 'react'
import { ChevronDown, ChevronUp } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
}

const faqData: FAQItem[] = [
  {
    question: "Mis on Seatly?",
    answer: "Seatly on mööblirendi ja -müügi platvorm, kus saate oma mööblit välja rentida või osta-müüa. See on ideaalne viis, kuidas kasutada seisma jäänud mööblit ja leida kiirelt lahendusi oma mööblivajadustele."
  },
  {
    question: "Kuidas Seatly töötab?",
    answer: "- Registreeru platvormil ja loo konto.\n- Lisa oma mööblikuulutus (fotod, kirjeldus, mõõdud, hind).\n- Huvi korral saavad kasutajad eseme rendi- või müügitingimustes kokku leppida.\n- Tehing toimub platvormi kaudu, mis tagab sujuva suhtluse ja turvalise maksmise."
  },
  {
    question: "Kas Seatly vahendab tehinguid?",
    answer: "Jah, Seatly on vahendaja platvorm, mis aitab kuulutajatel ja rentijatel/müüjatel omavahel ühendust võtta. Platvorm võtab vahendustasu 5% iga renditehingu pealt."
  },
  {
    question: "Mida pean tegema, et kuulutus lisada?",
    answer: "- Tee esemest kvaliteetsed fotod (soovitavalt hea valgusega ja erinevatest nurkadest).\n- Lisa eseme kirjeldus (materjal, seisukord, eripärad).\n- Sisesta mõõdud ja määrake hind (kas rendiks, müügiks või mõlemaks).\n- Kindlusta oma mööbel võimalike kahjustuste eest."
  },
  {
    question: "Kuidas leida sobiv ese rendiks?",
    answer: "- Kasuta otsingufiltreid, et leida mööbel kategooria, hinna või asukoha järgi.\n- Vali kuupäevad, milleks mööblit vajad, ja saada kuulutajale broneeringupäring."
  },
  {
    question: "Kuidas toimub maksmine?",
    answer: "Kõik maksed tehakse Seatly platvormi kaudu, mis tagab turvalisuse nii kuulutajale kui ka rentijale."
  },
  {
    question: "Kuidas tagatakse minu mööbli turvalisus?",
    answer: "- Soovitame kindlustada oma mööbel, et olla kaitstud kahjustuste või kadumise eest.\n- Rentija peab järgima platvormi tingimusi ja vastutab eseme turvalise tagastamise eest."
  },
  {
    question: "Mida teha, kui mööbel saab kahjustada?",
    answer: "Kui mööbel saab rendi käigus kahjustada, võtke ühendust rentijaga ja andke juhtumist teada Seatly klienditoele. Kui mööbel on kindlustatud, aitab kindlustus katta kulud."
  },
  {
    question: "Kas Seatly on saadaval ainult Eestis?",
    answer: "Praegu on Seatly suunatud Eesti kasutajatele, kuid tulevikus plaanime laieneda ka teistesse riikidesse."
  },
  {
    question: "Mida teha, kui mul on probleem või küsimus?",
    answer: "Seatly klienditugi on valmis aitama! Võta meiega ühendust:\n- E-post: seatly@seatly.com\n- Telefon: +372 58090777"
  },
  {
    question: "Kas Seatly-l on äpp?",
    answer: "Jah, Seatly-le on loodud kasutajasõbralik veebileht ja mobiilirakendus, mille kaudu saate mugavalt tehinguid teha ja kuulutusi hallata."
  },
  {
    question: "Kas kuulutuste lisamine on tasuta?",
    answer: "Kuulutuse lisamine platvormile on tasuta, kuid Seatly võtab iga tehingu pealt 5% vahendustasu."
  },
  {
    question: "Millised makseviisid on aktsepteeritud?",
    answer: "Platvorm aktsepteerib pangakaarte ja muid elektroonilisi makseviise (näiteks Stripe või PayPal, sõltuvalt Seatly valikutest)."
  },
  {
    question: "Kuidas tagastatakse mööbel pärast rendiperioodi lõppu?",
    answer: "Kuulutaja ja rentija lepivad kokku, kuidas ja kus ese tagastatakse. Rentija kohustus on ese tagasi anda samas seisukorras, nagu see renditi."
  },
  {
    question: "Kuidas saan oma konto kustutada?",
    answer: "Kui soovite oma konto kustutada, võtke ühendust meie klienditoega. Pärast kustutamist eemaldatakse teie isikuandmed vastavalt meie privaatsuspoliitikale."
  }
]

export default function FAQ() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems(prevOpenItems =>
      prevOpenItems.includes(index)
        ? prevOpenItems.filter(item => item !== index)
        : [...prevOpenItems, index]
    )
  }

  return (
    <div className="w-full max-w-3xl mx-auto p-6 space-y-6">
      <h2 className="text-3xl font-bold text-center mb-8">Korduma Kippuvad Küsimused (KKK)</h2>
      {faqData.map((item, index) => (
        <div key={index} className="border border-gray-200 rounded-lg overflow-hidden">
          <button
            className="flex justify-between items-center w-full p-4 text-left  hover:bg-gray-50 transition-colors duration-200"
            onClick={() => toggleItem(index)}
          >
            <span className="text-lg font-semibold">{item.question}</span>
            {openItems.includes(index) ? (
              <ChevronUp className="w-5 h-5 text-gray-500" />
            ) : (
              <ChevronDown className="w-5 h-5 text-gray-500" />
            )}
          </button>
          {openItems.includes(index) && (
            <div className="p-4 bg-gray-50">
              <p className="text-gray-700 whitespace-pre-line">{item.answer}</p>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}