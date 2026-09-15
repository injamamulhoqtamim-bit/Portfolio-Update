import ParticlesBackground from "@/components/ParticlesBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/stats";
import About from "@/components/About";
import SkillsTechnologies from "@/components/SkillsTechnologies";
import Education from "@/components/Education";
import Certificates from "@/components/Certificates";
import Projects from "@/components/Projects";
import UpcomingProject from "@/components/UpcomingProject";

import Contact from "@/components/Contact";
import Comments from "@/components/Comments";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ParticlesBackground />

      <Navbar />

      <main>
        <Hero />

        <StatsSection />

        <About />

        <SkillsTechnologies />

        

        <Education />

        <Certificates />

        <Projects />

        <UpcomingProject />

        

        <Contact />

        <Comments />
      </main>

      <Footer />
    </>
  );
}