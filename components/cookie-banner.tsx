'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import posthog from 'posthog-js'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"

export default function CookieBanner() {


  const [showBanner, setShowBanner] = useState(false)
  const [showPolicy, setShowPolicy] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('cookie-consent')
    if (consent === null) {
      setShowBanner(true)
    } else if (consent === 'accepted') {
      enablePosthog()
    }
  }, [])


  const enablePosthog = () => {
    if (!process.env.NEXT_PUBLIC_POSTHOG_KEY || !process.env.NEXT_PUBLIC_POSTHOG_HOST) {
      return
    }
    posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
      api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      person_profiles: "always",
      loaded: (posthog) => {
        if (process.env.NODE_ENV === 'development') posthog.opt_out_capturing()
      }
    })
  }

  const handleAccept = () => {
    localStorage.setItem('cookie-consent', 'accepted')
    enablePosthog()
    setShowBanner(false)
  }

  const handleReject = () => {
    localStorage.setItem('cookie-consent', 'rejected')
    setShowBanner(false)
  }

  const handleShowPolicy = () => {
    setShowPolicy(true)
  }

  if (!showBanner) return null

  return (
    <div className="flex items-center justify-center fixed bottom-0 left-0 right-0 p-4 bg-black/50 z-50 h-screen">
      <Card className="max-w-2xl mx-auto bottom-0 bg-white">
        {!showPolicy ? (
          <>
            <CardHeader>
              <CardTitle>Privaatsusseaded</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Kasutame saidil kolmandate osapoolte veebisaitide jälgimistehnoloogiaid, et oma teenuseid pakkuda ja täiustada ning kuvada reklaame vastavalt kasutajate huvidele. Nõustun sellega ja võin oma nõusoleku igal ajal edasiulatuvalt tühistada või seda muuta.
              </p>
            </CardContent>
            <CardFooter className="flex justify-evenly gap-4">
              <Button className='w-full' variant="outline" onClick={handleReject}>Keeldu</Button>
              <Button className='w-full bg-card text-black' onClick={handleShowPolicy}>Lisateave</Button>
              <Button className='w-full bg-accent text-black' onClick={handleAccept}>Kinnita</Button>
            </CardFooter>
          </>
        ) : (
          <>
            <CardHeader>
              <CardTitle>Küpsised</CardTitle>
              <CardDescription>Küpsiste Poliitika</CardDescription>
            </CardHeader>
            <CardContent className="max-h-[60vh] overflow-y-auto">
              <p className="mb-4">Seatly kasutab küpsiseid, et muuta teie kogemus meie platvormil mugavamaks ja isikupärasemaks.</p>
              <h3 className="font-semibold mb-2">Mis on küpsised?</h3>
              <p className="mb-4">Küpsised on väikesed tekstifailid, mis salvestatakse teie seadmesse, kui külastate meie veebilehte. Need aitavad meil meelde jätta teie eelistusi ja parandada veebilehe toimimist.</p>
              <h3 className="font-semibold mb-2">Miks me küpsiseid kasutame?</h3>
              <ul className="list-disc pl-5 mb-4">
                <li>Funktsionaalsus: Küpsised aitavad veebilehel korralikult töötada (nt sisselogimise meeldejätmine).</li>
                <li>Eelistused: Salvestame teie valikud, nagu keele- või privaatsusseaded.</li>
                <li>Analüütika: Küpsised aitavad meil jälgida, kuidas külastajad veebilehte kasutavad, et saaksime seda paremaks muuta.</li>
              </ul>
              <h3 className="font-semibold mb-2">Kuidas küpsiste kasutamist hallata?</h3>
              <p className="mb-4">Teil on õigus küpsised igal ajal blokeerida või kustutada, kasutades oma veebibrauseri seadeid. Siiski võib teatud küpsiste keelamine mõjutada Seatly veebilehe funktsionaalsust.</p>
              <h3 className="font-semibold mb-2">Lisateave</h3>
              <p>Loe täpsemalt meie privaatsuspoliitikast või võta küsimuste korral ühendust: seatly@seatly.eu.</p>
            </CardContent>
            <CardFooter className="flex justify-end">
              <Button onClick={() => setShowPolicy(false)}>Tagasi</Button>
            </CardFooter>
          </>
        )}
      </Card>
      <Button
        variant="ghost"
        size="icon"
        className="absolute top-2 right-2"
        onClick={handleReject}
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  )
}
