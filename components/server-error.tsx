import React from 'react'
import { Button } from './ui/button'
import { Home, RefreshCcw } from 'lucide-react'
import Link from 'next/link'

export function ServerError() {
  return (
    <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8 text-center">
        <div className="space-y-4">
          <h1 className="text-9xl font-extrabold text-gray-900">500</h1>
          <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Serveri viga</h2>
          <p className="mt-2 text-lg text-gray-600">
            Vabandame, aga serveris tekkis viga. Meie meeskond on probleemist teadlik ja töötab selle lahendamise nimel.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Button
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-pink-600 hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
          >
            <RefreshCcw className="mr-2 h-5 w-5" />
            Proovi uuesti
          </Button>
          <Link
            href="/"
            className="w-full inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-pink-600 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
          >
            <Home className="mr-2 h-5 w-5" />
            Tagasi avalehele
          </Link>
        </div>
      </div>
    </div>
  )
}
