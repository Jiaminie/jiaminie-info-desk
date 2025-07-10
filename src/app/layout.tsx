import type { Metadata } from "next";

import "./globals.css";
import ParallaxWrapper from "@/components/wrappers/ParallaxWrapper";
import dynamic from "next/dynamic";
import Chatbot from "@/components/Chatbot";
import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";

export const metadata: Metadata = {
  title: "Info Desk",
  description: "Maasai Inspired Infrmations Desk for Jiaminie.inc",
};

const ClientLayout = dynamic(() => import("./_components/ClientLayout"), {
  ssr: false,
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ParallaxWrapper>
          <ClientLayout>
            <Navbar/>
            {children}
            <Chatbot />
            <Footer/>
          </ClientLayout>
        </ParallaxWrapper>
      </body>
    </html>
  );
}
