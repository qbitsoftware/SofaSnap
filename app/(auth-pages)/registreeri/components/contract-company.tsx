import { IContract } from "./contract"

const ContractCompany = () => {
    const text: IContract[] = [
        {
            heading: "Lepingu ese",
            subHeadings: [
                "Platvorm võimaldab Ärikliendil lisada oma tooteid (mööblit) Seatly veebikeskkonda, et neid rentida või müüa.",
                "Platvorm toimib vahendusplatvormina ja ei kogu tehingute tasu ega osale rahalistes arveldustes."
            ],
        },
        {
            heading: "Kasutajakonto ja andmed",
            subHeadings: [
                "Äriklient registreerib konto ettevõtte nimel ning esitab järgmised andmed: juriidiline nimi, registrikood, KMKR number (kui on), kontaktisiku andmed.",
                "Konto turvalisuse ja andmete õigsuse eest vastutab Äriklient.",
            ]
        },
        {
            heading: "Teenustasu ja arveldamine",
            subHeadings: [
                "Iga kuulutuse lisamise tasu on 1 €, v.a kui on sõlmitud eraldi koostööleping.",
                "Platvorm võib pakkuda paketipõhiseid lahendusi (nt 10 kuulutust = 8 € / kuulutus), mis lepitakse kokku kirjalikult.",
                "Maksmine toimub arve alusel või makselingi kaudu. Platvorm ei väljasta e-arveid ilma eraldi kokkuleppeta."
            ],
        },
        {
            heading: "Kuulutused ja sisu",
            subHeadings: [
                "Äriklient vastutab, et kuulutustes esitatud tooted, kirjeldused, fotod ja hinnad on täpsed ja kooskõlas kehtivate seadustega.",
                "Platvormil on õigus eemaldada kuulutused, mis rikuvad platvormi üldtingimusi või kahjustavad Seatly mainet.",
                "Platvorm ei kontrolli esemete seisukorda ega paku järeltuge.",
            ],
        },
        {
            heading: "Intellektuaalne omand ja brändikasutus",
            subHeadings: [
                "Äriklient võib lisada oma logo ja ettevõtte nime oma profiilile.",
                "Äriklient annab platvormile õiguse kasutada tema lisatud fotosid ja kirjeldusi Seatly turunduskanalites, v.a kui ei ole kokku lepitud teisiti.",
            ],
        },
        {
            heading: "Vastutus ja õigused",
            subHeadings: [
                "Äriklient kinnitab, et tal on õigus pakutavaid tooteid rentida või müüa.",
                "Platvorm ei vastuta ärikliendi ja lõppkliendi vaheliste lepingute ega tehingute eest.",
                "Äriklient kohustub järgima GDPR ja tarbijakaitseseadusi oma tegevuses platvormil.",
            ],
        },
        {
            heading: "Lepingu kestus ja lõpetamine",
            subHeadings: [
                "Leping jõustub konto registreerimisel ja kehtib tähtajatult.",
                "Mõlemad pooled võivad Lepingut lõpetada ette teatades vähemalt 7 päeva.",
                "Platvormil on õigus peatada konto rikkumiste korral.",
            ]
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
                    {"Käesolev ärikliendi kasutajaleping (edaspidi „Leping“) sõlmitakse Seatly OÜ (edaspidi „Platvorm“) ja ettevõtte kasutaja (edaspidi „Äriklient“) vahel."}
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

export { ContractCompany }