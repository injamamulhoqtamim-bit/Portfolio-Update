import ParticlesBackground from "@/components/ParticlesBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/stats";
import About from "@/components/About";
import Technologies from "@/components/Technologies";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Certificates from "@/components/Certificates";
import Projects from "@/components/Projects";
import UpcomingProject from "@/components/UpcomingProject";
import Gallery from "@/components/Gallery";
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

        <Technologies />

        <Skills />

        <Education />

        <Certificates />

        <Projects />

        <UpcomingProject />

        {/* NEW GALLERY */}
        <Gallery />

        <Contact />

        <Comments />
      </main>

      <Footer />
    </>
  );
}