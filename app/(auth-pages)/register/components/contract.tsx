interface Contract {
    heading: string
    subHeadings: string[]
}

const Contract = () => {
    const text: Contract[] = [
        {
            heading: "Teenuse Kirjeldus",
            subHeadings: [
                "Teenuse Põhieesmärk: Käesoleva lepingu objektiks on vahendusplatvormi teenuse pakkumine, kus kasutajad saavad reklaamida ja rentida mööblit.",
                "Teenustasu: Kasutajad maksavad teenuse eest vastavalt valitud reklaamimise paketile (kuumaks või aastamaks)."
            ],
        },
        {
            heading: "Vastutuse Piirangud",
            subHeadings: [
                "Vahendusteenus: Platvorm toimib üksnes vahendajana ega võta endale vastutust renditavate objektide seisukorra, ohutuse, kvaliteedi ega rentijate tegevuse eest.",
                "Kasutajate Vastutus: Kasutajad vastutavad ise renditavate objektide seisukorra, ohutuse, kvaliteedi, reklaamide täpsuse ja kõigi vahendatud tehingute eest."
            ]
        },
        {
            heading: "Reklaamimise Tasud",
            subHeadings: [
                "Tasud: Kasutaja nõustub tasuma platvormile vastava tasu vastavalt valitud reklaamimise paketile.",
                "Tasude Muutmine: Platvormil on õigus muuta reklaamimise tasusid, teavitades sellest kasutajaid ette."
            ],
        },
        {
            heading: "Registreerimine ja Konto Kasutamine",
            subHeadings: [
                "Konto Loomine: Kasutaja peab looma konto platvormil, esitades täielikud ja täpsed isikuandmed.",
                "Konto Turvalisus: Kasutaja vastutab oma konto turvalisuse eest ja nõustub hoidma oma sisselogimisandmeid konfidentsiaalsena."
            ],
        },
        {
            heading: "Kasutaja Kohustused",
            subHeadings: [
                "Reklaamide Täpsus: Kasutaja kinnitab, et reklaamidel sisalduv teave on täpne ja täielik.",
                "Kasutaja kinnitab, et ta järgib kõiki asjakohaseid seadusi ja eeskirju renditavate objektide reklaamimisel ja rentimisel.",
            ],
        },
        {
            heading: "Lepingu Lõpetamine",
            subHeadings: [
                "Lepingu Lõpetamine: Mõlemad pooled võivad lepingu igal ajal lõpetada, teavitades sellest teist poolt ette."
            ],
        },
        {
            heading: "Muud Tingimused",
            subHeadings: [
                "Muudatused Lepingus: Platvormil on õigus muuta lepingut, teavitades sellest kasutajaid ette.",
                "Konfidentsiaalsus: Mõlemad pooled nõustuvad hoidma konfidentsiaalset teavet ja mitte avaldama seda kolmandatele isikutele.",
            ]
        }
    ]
    return (
        <div className="flex w-full bg-background overflow-y-auto py-[18px] px-[25px] shadow-inner-heavy no-scrollbar">
            <div className="w-full h-[550px] text-base leading-[50px]">
                <h1>
                    Vahendusplatvormi Teenusleping
                </h1>
                <h1>
                    Viimati uuendatud: [Kuupäev]
                </h1>
                {text.map((t, key) => (
                    <div key={key}>
                        <h2>{key + 1}. {t.heading}</h2>
                        {t.subHeadings.map((sub, key2) => (
                            <div key={key2}>
                                <h3>{key + 1}.{key2 + 1}. {sub}</h3>
                            </div>
                        ))}
                    </div>
                ))}
                <h1>
                    Allakirjutatud:
                </h1>
                <h1>
                    Platvormi Esindaja: [Nimi ja allkiri]
                </h1>
                <h1>
                    Kasutaja: [Nimi ja allkiri]
                </h1>
            </div>
        </div>
    )
}

export { Contract }