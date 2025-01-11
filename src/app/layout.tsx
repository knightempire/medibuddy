"use client";


import Header from "@/components/Header";
import ScrollToTop from "@/components/ScrollToTop";
import { Inter } from "next/font/google";
import "node_modules/react-modal-video/css/modal-video.css";
import "../styles/index.css";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html suppressHydrationWarning lang="en">
      <head>
        <title>MediBuddy</title>
        
        {/* Meta tags for SEO */}
        <meta
          name="MediBuddy"
          content="Book Health Checks, Lab tests, Online Medicine & Doctor Consultation | MediBuddy."
        />
        <meta name="author" content=" Team - https://github.com/knightempire/" />

     <meta name="keywords" content="MediBuddy, Healthcare, Cashless Healthcare, Health Check Packages, Book health checks, book online lab tests, book blood tests, book online consultation, online doctor consultation, online dental consultation, dental packages, online teleconsultation, order online medicines, cashless hospitalisation, Medi Assist network hospitals." />



<meta property="og:title" content="MediBuddy " />
<meta property="og:description" content="Book Health Checks, Lab tests, Online Medicine & Doctor Consultation | MediBuddy." />
<meta property="og:type" content="website" />


<link rel="icon" href="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/70/97/9b/70979b66-d536-5846-9395-7c792d9617b6/AppIcon-0-1x_U007emarketing-0-8-0-85-220-0.png/1200x600wa.png" />

        {/* Favicon and Apple Touch Icon */}
        <link rel="icon" href="https://is1-ssl.mzstatic.com/image/thumb/Purple221/v4/70/97/9b/70979b66-d536-5846-9395-7c792d9617b6/AppIcon-0-1x_U007emarketing-0-8-0-85-220-0.png/1200x600wa.png"  />

      </head>
      <body className={`bg-[#FCFCFC] dark:bg-black ${inter.className}`}>
        <Providers>
          <Header />
          {children}
   
          <ScrollToTop />
        </Providers>
      </body>
    </html>
  );
}

import { Providers } from "./providers";
