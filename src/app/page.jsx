import CustomCursor from "@/components/CustomCursor";
import ParticlesBackground from "@/components/ParticlesBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/stats"; // ১. এখানে স্ট্যাটস সেকশনটি ইমপোর্ট করা হয়েছে
import About from "@/components/About";
import Technologies from "@/components/Technologies";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
import Projects from "@/components/Projects";
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
        
        {/* ২. হিরো সেকশনের ঠিক নিচে স্ট্যাটস সেকশনটি বসানো হয়েছে */}
        <StatsSection /> 
        
        <About />
        <Technologies />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </>
  );
}