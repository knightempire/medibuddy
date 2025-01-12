
import ScrollUp from "@/components/Common/ScrollUp";

import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Lifestyle from "@/components/lifestyle";
import WorkandSafe from "@/components/WorkAndSafe";
import Review from "@/components/TrustAndReview";
import Faq from "@/components/Faq";
import Footer  from "@/components/footer";
import Lab from "@/components/lab";

import { Metadata } from "next";

 
export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
     <Features />
<Lab />
    <Review />
    <Lifestyle />
    <WorkandSafe />
    <Faq />
    <Footer />
    </>
  );
}
