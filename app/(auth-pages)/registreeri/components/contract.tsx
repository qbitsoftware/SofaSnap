interface Contract {
    heading: string
    subHeadings: string[]
}

const Contract = () => {
    const text: Contract[] = [
        {
            heading: "Teenuse Kirjeldus",
            subHeadings: [
                "Teenuse Põhieesmärk: Käesoleva lepingu objektiks on vahendusplatvormi Seatly teenuse pakkumine, kus kasutajad saavad reklaamida ja rentida või müüa mööblit.",
                "Teenustasu: Kasutajad maksavad platvormile vahendustasu, mis moodustab 15% rendihinnast või müügihinnast iga tehingu kohta."
            ],
        },
        {
            heading: "Vastutuse Piirangud",
            subHeadings: [
                "Vahendusteenus: Platvorm toimib üksnes vahendajana ega võta endale vastutust renditavate või müüdavate objektide seisukorra, ohutuse, kvaliteedi ega kasutajate tegevuse eest.",
                "Kasutajate Vastutus: Kasutajad vastutavad ise renditavate või müüdavate objektide seisukorra, ohutuse, kvaliteedi, reklaamide täpsuse ja kõigi vahendatud tehingute eest.",
                "Tehnilised Tõrked: Platvorm ei vastuta tehniliste tõrgete või katkestuste eest, mis võivad takistada teenuse kasutamist, kui need tulenevad meist sõltumatutest asjaoludest (nt internetikatkestused, serveriprobleemid jms)."
            ]
        },
        {
            heading: "Tasud ja Arveldamine",
            subHeadings: [
                "Vahendustasu: Kasutaja nõustub tasuma platvormile vahendustasu, mis on 15% rendi- või müügihinnast iga tehingu kohta.",
                "Tasude Muutmine: Platvormil on õigus muuta vahendustasu protsenti, teavitades sellest kasutajaid ette vähemalt 14 päeva enne muudatuste jõustumist.",
                "Tagasimaksed ja Tühistamised: Tagasimaksed ja tühistamised toimuvad vastavalt platvormi tühistamispoliitikale, mis on kättesaadav kasutajatingimustes."
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
                "Seaduste Järgimine: Kasutaja kinnitab, et ta järgib kõiki asjakohaseid seadusi ja eeskirju renditavate või müüdavate objektide reklaamimisel ja tehingute tegemisel.",
                "Maksukohustuste Täitmine: Kasutaja vastutab kõikide maksukohustuste täitmise eest, mis võivad kaasneda platvormi kasutamisega.",
            ],
        },
        {
            heading: "Lepingu Lõpetamine",
            subHeadings: [
                ".Lepingu Lõpetamine: Mõlemad pooled võivad lepingu igal ajal lõpetada, teavitades sellest teist poolt ette vähemalt 7 päeva."
            ],
        },
        {
            heading: "Muud Tingimused",
            subHeadings: [
                "Muudatused Lepingus: Platvormil on õigus muuta lepingut, teavitades sellest kasutajaid ette vähemalt 14 päeva enne muudatuste jõustumist.",
                "Konfidentsiaalsus: Mõlemad pooled nõustuvad hoidma konfidentsiaalset teavet ja mitte avaldama seda kolmandatele isikutele.",
            ]
        },
        {
            heading: "Vaidluste Lahendamine ja Kohaldatav Seadus",
            subHeadings: [
                "Vaidluste Lahendamine: Kõik lepingu täitmisest tulenevad vaidlused lahendatakse läbirääkimiste teel. Kui kokkuleppele ei jõuta, lahendatakse vaidlused Harju Maakohtus Eesti seaduste alusel.",
            ]
        },
        {
            heading: "Andmekaitse ja Isikuandmed",
            subHeadings: [
                "Isikuandmete Kaitse: Platvorm töötleb kasutajate isikuandmeid vastavalt Euroopa Liidu isikuandmete kaitse üldmääruse (GDPR) nõuetele. Täpsem info andmekaitse kohta on saadaval platvormi privaatsuspoliitikas.",
                "Kasutaja Nõusolek: Konto loomisel ja platvormi kasutamisel nõustub kasutaja platvormi privaatsustingimustega."
            ]
        }
    ]
    return (
        <div className="flex w-full bg-background overflow-y-auto py-[18px] px-[25px] shadow-inner-heavy no-scrollbar">
            <div className="w-full h-[550px] text-base leading-[35px] md:leading-[50px]">
                <h1>
                    Vahendusplatvormi Teenusleping
                </h1>
                <h1>
                    Viimati uuendatud: 28.04.2025
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
            </div>
        </div>
    )
}

export { Contract }