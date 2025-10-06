"use client"

import { useTranslation } from '@/lib/i18n/i18n-provider'

export default function PrivacyPolicy() {
    const { t } = useTranslation()

    return (
        <div className='px-6 md:px-[64px] max-w-[1440px] mx-auto'>
            <div className=" mx-auto bg-background rounded-lg md:mt-20 mt-10">
                <h1 className="text-3xl font-bold mb-6 text-gray-800">{t('privacyPolicy.title')}</h1>
                <p className="text-sm text-gray-600 mb-6">{t('privacyPolicy.lastUpdated')}</p>
                <p className="mb-6 text-gray-700">
                    {t('privacyPolicy.intro')}
                </p>
                <section id="data-collection" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('privacyPolicy.section1.title')}</h2>
                    <p className="mb-4 text-gray-700">{t('privacyPolicy.section1.intro')}</p>
                    <div className="space-y-4">
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-gray-800">{t('privacyPolicy.section1.subsection1.title')}</h3>
                            <ul className="list-disc pl-6 text-gray-700">
                                {t('privacyPolicy.section1.subsection1.items').split('|COL|').map((item: string, i: number) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-gray-800">{t('privacyPolicy.section1.subsection2.title')}</h3>
                            <ul className="list-disc pl-6 text-gray-700">
                                {t('privacyPolicy.section1.subsection2.items').split('|COL|').map((item: string, i: number) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-gray-800">{t('privacyPolicy.section1.subsection3.title')}</h3>
                            <ul className="list-disc pl-6 text-gray-700">
                                {t('privacyPolicy.section1.subsection3.items').split('|COL|').map((item: string, i: number) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-lg font-medium mb-2 text-gray-800">{t('privacyPolicy.section1.subsection4.title')}</h3>
                            <ul className="list-disc pl-6 text-gray-700">
                                {t('privacyPolicy.section1.subsection4.items').split('|COL|').map((item: string, i: number) => (
                                    <li key={i}>{item}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </section>

                <section id="data-usage" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('privacyPolicy.section2.title')}</h2>
                    <p className="mb-4 text-gray-700">{t('privacyPolicy.section2.intro')}</p>
                    <ul className="list-disc pl-6 text-gray-700">
                        {t('privacyPolicy.section2.items').split('|COL|').map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section id="data-sharing" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('privacyPolicy.section3.title')}</h2>
                    <p className="mb-4 text-gray-700">{t('privacyPolicy.section3.intro')}</p>
                    <ul className="list-disc pl-6 text-gray-700">
                        {t('privacyPolicy.section3.items').split('|COL|').map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section id="cookies" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('privacyPolicy.section4.title')}</h2>
                    <p className="mb-4 text-gray-700">{t('privacyPolicy.section4.intro')}</p>
                    <ul className="list-disc pl-6 text-gray-700">
                        {t('privacyPolicy.section4.items').split('|COL|').map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section id="data-retention" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('privacyPolicy.section5.title')}</h2>
                    <p className="text-gray-700">
                        {t('privacyPolicy.section5.content')}
                    </p>
                </section>

                <section id="your-rights" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('privacyPolicy.section6.title')}</h2>
                    <p className="mb-4 text-gray-700">{t('privacyPolicy.section6.intro')}</p>
                    <ul className="list-disc pl-6 text-gray-700">
                        {t('privacyPolicy.section6.items').split('|COL|').map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section id="data-security" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('privacyPolicy.section7.title')}</h2>
                    <p className="text-gray-700">
                        {t('privacyPolicy.section7.content')}
                    </p>
                </section>

                <section id="contact" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('privacyPolicy.section8.title')}</h2>
                    <p className="mb-4 text-gray-700">{t('privacyPolicy.section8.intro')}</p>
                    <ul className="list-disc pl-6 text-gray-700">
                        {t('privacyPolicy.section8.items').split('|COL|').map((item: string, i: number) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                </section>

                <section id="changes" className="mb-8">
                    <h2 className="text-2xl font-semibold mb-4 text-gray-800">{t('privacyPolicy.section9.title')}</h2>
                    <p className="text-gray-700">
                        {t('privacyPolicy.section9.content')}
                    </p>
                </section>
            </div>
        </div>
    )
}