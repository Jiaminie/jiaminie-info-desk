import type { Metadata } from "next";

import "./globals.css";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";

export const metadata: Metadata = {
  title: "Info Desk",
  description: "Maasai Inspired Informations Desk for Jiaminie.inc",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <title>Info Desk</title>
        <meta name="facebook-domain-verification" content="qwe2fweqlmq15p175w2hbgvewaqmtl" />
      </head>
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
