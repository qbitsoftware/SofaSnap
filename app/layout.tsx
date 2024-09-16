import { hasEnvVars } from "@/utils/supabase/check-env-vars";
import { NavBar } from "@/components/navbar";
import Link from "next/link";
import { Footer } from "@/components/footer";
import "./globals.css";
import { inter } from "@/fonts";

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
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="no-scrollbar">
        <div className="px-[56px]">
          <NavBar />
        </div>
        <div >
        {children}
        </div>
        <div>
          <Footer />
        </div>
      </body>
    </html>
  );
}
