import { Hero } from "@/components/sections/hero";
import { About } from "@/components/sections/about";
import { Work } from "@/components/sections/work";
import { Experience } from "@/components/sections/experience";
import { Expertise } from "@/components/sections/expertise";
import { Recognition } from "@/components/sections/recognition";
import { Contact } from "@/components/sections/contact";

export default function HomePage() {
  return (
    <>
      <Hero />
      <About />
      <Work />
      <Experience />
      <Expertise />
      <Recognition />
      <Contact />
    </>
  );
}
