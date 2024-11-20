"use client"

import { useState } from 'react'

export default function PrivacyPolicy() {
    const [activeSection, setActiveSection] = useState<string | null>(null)

    const toggleSection = (id: string) => {
        setActiveSection(activeSection === id ? null : id)
    }

    const sections = [
        { id: 'data-collection', title: 'Milliseid andmeid me kogume?' },
        { id: 'data-usage', title: 'Kuidas me teie andmeid kasutame?' },
        { id: 'data-sharing', title: 'Kuidas andmeid jagatakse?' },
        { id: 'cookies', title: 'Küpsised ja jälgimistehnoloogiad' },
        { id: 'data-retention', title: 'Andmete säilitamine' },
        { id: 'your-rights', title: 'Teie õigused' },
        { id: 'data-security', title: 'Andmete turvalisus' },
        { id: 'contact', title: 'Kontaktandmed ja kaebused' },
        { id: 'changes', title: 'Muudatused privaatsuspoliitikas' },
    ]

    return (
        <div className='px-6 md:px-[64px] max-w-[1440px] mx-auto'>
            <div className=" mx-auto p-6 bg-white shadow-lg rounded-lg">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">Privaatsuspoliitika</h1>
                <p className="text-sm text-gray-600 mb-6">Viimati uuendatud: 18.11.2024</p>
                <p className="mb-6 text-gray-700">
                    Seatly OÜ (edaspidi &quot;Platvorm&quot; või &quot;Seatly&quot;) austab teie privaatsust ja on pühendunud teie isikuandmete kaitsmisele. Käesolev privaatsuspoliitika selgitab, kuidas me kogume, kasutame, jagame ja hoiame teie isikuandmeid, kui kasutate meie veebilehte ja teenuseid.
                </p>
                <div className="mb-8">
                    <h2 className="text-xl font-semibold mb-4 text-gray-800">Sisukord</h2>
                    <ul className="space-y-2">
                        {sections.map((section) => (
                            <li key={section.id}>
                                <a
                                    href={`#${section.id}`}
                                    className="text-blue-600 hover:underline"
                                    onClick={(e) => {
                                        e.preventDefault()
                                        toggleSection(section.id)
                                        const element = document.getElementById(section.id)
                                        element?.scrollIntoView({ behavior: 'smooth' })
                                    }}
                                >
                                    {section.title}
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>

                <section id="data-collection" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">1. Milliseid andmeid me kogume?</h2>
                    <p className="mb-4 text-gray-700">Kogume teie kohta järgmisi andmeid:</p>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-gray-800">1.1. Konto loomisel:</h3>
                            <ul className="list-disc pl-6 text-gray-700">
                                <li>Teie nimi, e-posti aadress, telefoninumber ja parool.</li>
                                <li>Asukohaandmed (näiteks linn või piirkond), kui otsustate need jagada.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-gray-800">1.2. Kuulutuste lisamisel:</h3>
                            <ul className="list-disc pl-6 text-gray-700">
                                <li>Esemete kirjeldused, fotod ja asukoht (vajadusel).</li>
                                <li>Hind ja tingimused (rendiks või müügiks).</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-gray-800">1.3. Tehingute ja suhtluse ajal:</h3>
                            <ul className="list-disc pl-6 text-gray-700">
                                <li>Renditehingutega seotud andmed (kuupäevad, summad, makseviis).</li>
                                <li>Suhtlus kuulutaja ja rentija vahel meie platvormi kaudu.</li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-gray-800">1.4. Tehnilised andmed:</h3>
                            <ul className="list-disc pl-6 text-gray-700">
                                <li>IP-aadress, seadme tüüp, brauseri versioon ja küpsiste teave.</li>
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="data-usage" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">2. Kuidas me teie andmeid kasutame?</h2>
                    <p className="mb-4 text-gray-700">Kasutame teie andmeid järgmistel eesmärkidel:</p>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li>Teenuste pakkumiseks (nt kuulutuste lisamine ja broneerimiste haldamine).</li>
                        <li>Kasutajakonto loomise ja haldamise jaoks.</li>
                        <li>Tehingute turvalisuse tagamiseks ja pettuste vältimiseks.</li>
                        <li>Klienditoe pakkumiseks ja teie küsimustele vastamiseks.</li>
                        <li>Teenuste parandamiseks ja isikupärastamiseks (nt soovitused).</li>
                        <li>Juriidiliste nõuete täitmiseks ja vaidluste lahendamiseks.</li>
                    </ul>
                </section>

                <section id="data-sharing" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">3. Kuidas andmeid jagatakse?</h2>
                    <p className="mb-4 text-gray-700">Jagame teie andmeid ainult vajaduse korral ja piiratud ulatuses:</p>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li>Teiste kasutajatega: Näiteks kuulutuste juures kuvatakse teie nimi (või kasutajanimi), kuulutuse andmed ja suhtluseks vajalikud andmed (nt kontaktid, kui seda valite).</li>
                        <li>Teenusepakkujatega: Kolmandad osapooled, kes pakuvad makseteenuseid, pilvesalvestust või analüütikat.</li>
                        <li>Õiguskaitseasutustega: Kui see on seadusest tulenev nõue või meie teenusetingimuste rikkumise uurimiseks.</li>
                    </ul>
                </section>

                <section id="cookies" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">4. Küpsised ja jälgimistehnoloogiad</h2>
                    <p className="mb-4 text-gray-700">Kasutame küpsiseid ja sarnaseid tehnoloogiaid, et:</p>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li>Mäletada teie eelistusi ja seadeid.</li>
                        <li>Pakkuda asjakohaseid reklaame ja analüüsida meie veebisaidi kasutamist.</li>
                        <li>Küpsiste kohta saate rohkem lugeda meie [Küpsiste Poliitikast].</li>
                    </ul>
                </section>

                <section id="data-retention" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">5. Andmete säilitamine</h2>
                    <p className="text-gray-700">
                        Säilitame teie andmeid seni, kuni need on vajalikud teenuste pakkumiseks, või seadusega ettenähtud aja jooksul. Kui sulgete oma konto, kustutame teie andmed mõistliku aja jooksul, välja arvatud juhul, kui seadus nõuab nende säilitamist.
                    </p>
                </section>

                <section id="your-rights" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">6. Teie õigused</h2>
                    <p className="mb-4 text-gray-700">Teil on järgmised õigused seoses oma isikuandmetega:</p>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li>Ligipääs: Võite taotleda koopia oma isikuandmetest.</li>
                        <li>Parandamine: Kui andmed on ebatäpsed, saate neid parandada.</li>
                        <li>Kustutamine: Võite taotleda oma andmete kustutamist, välja arvatud juhul, kui seadus nõuab nende säilitamist.</li>
                        <li>Protestimine ja piiramine: Võite vaidlustada oma andmete töötlemise või piirata nende kasutamist teatud olukordades.</li>
                    </ul>
                </section>

                <section id="data-security" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">7. Andmete turvalisus</h2>
                    <p className="text-gray-700">
                        Kaitseme teie andmeid, kasutades asjakohaseid turvameetmeid, näiteks andmete krüpteerimist ja juurdepääsupiiranguid. Samas tuleb meeles pidada, et ükski internetipõhine süsteem pole täielikult turvaline.
                    </p>
                </section>

                <section id="contact" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">8. Kontaktandmed ja kaebused</h2>
                    <p className="mb-4 text-gray-700">Kui teil on küsimusi või muresid seoses oma isikuandmetega, võtke meiega ühendust:</p>
                    <ul className="list-disc pl-6 text-gray-700">
                        <li>E-post: [email@seatly.com]</li>
                        <li>Postiaadress: Seatly OÜ, Harju maakond, Tallinn, Haabersti linnaosa, Vabaõhumuuseumi tee 4a-20, 13522</li>
                    </ul>
                </section>

                <section id="changes" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">9. Muudatused privaatsuspoliitikas</h2>
                    <p className="text-gray-700">
                        Võime seda privaatsuspoliitikat aeg-ajalt uuendada. Soovitame teil regulaarselt külastada meie veebilehte, et tutvuda viimaste muudatustega.
                    </p>
                </section>
            </div>
        </div>
    )
}