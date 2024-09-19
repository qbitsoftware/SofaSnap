import { NavBar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";
import { inter } from "@/fonts";
import { Toaster } from "@/components/ui/toaster";
import db from "@/utils/supabase/db";

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
  console.log(db)
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="no-scrollbar min-w-[300px]">
        <div className="px-[24px] md:px-[56px]">
          <NavBar />
        </div>
        <div >
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
