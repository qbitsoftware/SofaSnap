import { Footer } from "@/components/footer";
import "./globals.css";
import { inter } from "@/fonts";
import { Toaster } from "@/components/ui/toaster";
import NavBar from "@/components/navbar";
import ToastProvider from "@/providers/toast-provider";

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000";

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "Next.js and Supabase Starter Kit",
  description: "The fastest way to build apps with Next.js and Supabase",
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.className} >
      <body className="no-scrollbar min-w-[300px] w-full h-full">
          <ToastProvider/>
          <div>
            <NavBar />
          </div>
          <div className="min-h-screen" >
            {children}
          </div>
          <div>
            <Footer />
          </div>
          <div>
            <Toaster />
          </div>
      </body>
    </html>
  );
}
