
export interface IContract {
    heading: string
    subHeadings: string[]
}

const Contract = () => {
    const text: IContract[] = [
        {
            heading: "Lepingu ese",
            subHeadings: [
                "Platvorm pakub veebipõhist teenust, mis võimaldab Kasutajal esitada kuulutusi mööbli rendiks või müügiks.",
                "Platvorm ei osale rahalistes tehingutes Kasutaja ja kolmandate isikute vahel."
            ],
        },
        {
            heading: "Kasutajakonto",
            subHeadings: [
                "Kasutaja kohustub esitama registreerimisel tõesed andmed.",
                "Kasutaja vastutab oma konto turvalisuse eest.",
                "Kasutajal on keelatud jagada oma kontot kolmandate isikutega."
            ]
        },
        {
            heading: "Teenustasu",
            subHeadings: [
                "Kuulutuse lisamise tasu on 1 € iga kuulutuse kohta.",
                "Tasu ei kuulu tagastamisele, v.a juhul, kui kuulutus ei ilmu tehnilistel põhjustel.",
                "Platvormil on õigus muuta hinnakirja, teavitades Kasutajat vähemalt 14 päeva ette."
            ],
        },
        {
            heading: "Vastutus",
            subHeadings: [
                "Platvorm ei vastuta kuulutustes esitatud teabe, esemete seisukorra ega Kasutajatevaheliste tehingute eest.",
                "Kasutaja kinnitab, et tal on õigus ja volitus pakutavaid esemeid rendile anda või müüa.",
                "Kasutaja vastutab kõigi tegevuste eest, mis tehakse tema konto kaudu."
            ],
        },
        {
            heading: "Isikuandmete töötlemine",
            subHeadings: [
                "Platvorm töötleb Kasutaja isikuandmeid vastavalt kehtivale Euroopa Liidu isikuandmete kaitse üldmäärusele (GDPR).",
                "Täpsem teave isikuandmete töötlemise kohta on kättesaadav Platvormi privaatsuspoliitikas.",
            ],
        },
        {
            heading: "Lepingu kehtivus ja lõpetamine",
            subHeadings: [
                "Leping jõustub hetkest, mil Kasutaja registreerib konto.",
                "Mõlemal poolel on õigus Leping igal ajal lõpetada, teavitades sellest teist poolt.",
                "Konto kustutamise korral säilitatakse isikuandmeid vastavalt seadusest tulenevatele säilitustähtaegadele.",
            ],
        },
        {
            heading: "Kohaldatav õigus ja vaidluste lahendamine",
            subHeadings: [
                "Lepingule kohaldatakse Eesti Vabariigi seadusi.",
                "Vaidlused lahendatakse esmalt läbirääkimiste teel, seejärel Harju Maakohtus.",
            ]
        },
    ]
    return (
        <div className="flex w-full bg-background overflow-y-auto py-[18px] px-[25px] shadow-inner-heavy no-scrollbar">
            <div className="w-full h-[550px] text-base leading-[35px] md:leading-[50px]">
                <h1>
                    Vahendusplatvormi Teenusleping
                </h1>
                <h1>
                    Viimati uuendatud: 26.06.2025
                </h1>
                <h1>
                    {"Käesolev kasutajaleping (edaspidi „Leping“) sõlmitakse Seatly OÜ (edaspidi „Platvorm“) ja registreeruva kasutaja (edaspidi „Kasutaja“) vahel."}
                </h1>
                {text.map((t, key) => (
                    <div key={key} className="leading-10 mb-4">
                        <h2>{key + 1}. {t.heading}</h2>
                        {t.subHeadings.map((sub, key2) => (
                            <div key={key2} className="ml-4">
                                <h3>{key + 1}.{key2 + 1}. {sub}</h3>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </div>
    )
}

export { Contract }