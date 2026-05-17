import CustomCursor from "@/components/CustomCursor";
import ParticlesBackground from "@/components/ParticlesBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/stats"; 
import About from "@/components/About";
import Technologies from "@/components/Technologies";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
import UpcomingProject from "@/components/UpcomingProject"; // পারফেক্ট ইমপোর্ট
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <StatsSection /> 
        <About />
        <Technologies />
        <Skills />
        <Education />
        <Projects />
        <UpcomingProject /> {/* প্রজেক্টস সেকশনের নিচে পারফেক্ট প্লেসমেন্ট */}
        <Contact />
      </main>
      <Footer />
    </>
  );
}