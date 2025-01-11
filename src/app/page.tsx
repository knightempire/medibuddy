
import ScrollUp from "@/components/Common/ScrollUp";

import Features from "@/components/Features";
import Hero from "@/components/Hero";
import Lifestyle from "@/components/lifestyle";
import Review from "@/components/review";

import { Metadata } from "next";

 
export default function Home() {
  return (
    <>
      <ScrollUp />
      <Hero />
     <Features />
    <Lifestyle />
    <Review />
    </>
  );
}
