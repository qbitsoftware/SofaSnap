import { Home } from "lucide-react"
import Link from "next/link"

function NotFoundPage() {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 text-center">
                <div className="space-y-4">
                    <h1 className="text-9xl font-extrabold text-gray-900">404</h1>
                    <h2 className="mt-2 text-3xl font-bold text-gray-900 sm:text-4xl">Lehte ei leitud</h2>
                    <p className="mt-2 text-lg text-gray-600">
                        Vabandame, aga otsitavat lehte ei õnnestunud leida. Palun kontrollige aadressi või proovige uuesti.
                    </p>
                </div>
                <div className="mt-8">
                    <Link
                        href="/"
                        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-accent hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-pink-500 transition-colors duration-200"
                    >
                        <Home className="mr-2 h-5 w-5" />
                        Tagasi avalehele
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default NotFoundPage