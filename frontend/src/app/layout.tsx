import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import TransitionWrapper from "@/components/layout/TransitionWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "IT Advisors | Soluții IT Profesionale pentru Afacerea Ta",
  description:
    "Externalizați serviciile IT cu IT Advisors. Oferim administrare IT, suport tehnic, telefonie VoIP, web design și securitate IT pentru companii mici și mijlocii.",
  keywords: [
    "IT outsourcing",
    "administrare IT",
    "suport tehnic",
    "telefonie VoIP",
    "securitate IT",
    "consultanță IT București",
  ],
  authors: [{ name: "CAM Advisors Project" }],
  openGraph: {
    title: "IT Advisors | Soluții IT Profesionale",
    description: "Externalizați serviciile IT și concentrați-vă pe afacerea dumneavoastră.",
    url: "https://it-advisors.ro",
    siteName: "IT Advisors",
    locale: "ro_RO",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className={`${inter.variable} font-sans antialiased`}>
        <Header />
        <main>
          <TransitionWrapper>{children}</TransitionWrapper>
        </main>
        <Footer />
      </body>
    </html>
  );
}
