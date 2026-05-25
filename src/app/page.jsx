import ParticlesBackground from "@/components/ParticlesBackground";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import StatsSection from "@/components/stats"; 
import About from "@/components/About";
import Technologies from "@/components/Technologies";
import Skills from "@/components/Skills";
import Education from "@/components/Education";
// 🤝 এখানে নামটা 'Certificates' করে দেওয়া হলো যাতে আপনার ফাইলের ভেতরের export default function Certificates-এর সাথে হুবহু মিলে যায়
import Certificates from "@/components/Certificates"; 
import Projects from "@/components/Projects";
import UpcomingProject from "@/components/UpcomingProject"; 
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <ParticlesBackground />
      {/* ❌ এখান থেকে <CustomCursor /> সরিয়ে নেওয়া হয়েছে */}
      <Navbar />
      <main>
        <Hero />
        <StatsSection /> 
        <About />
        <Technologies />
        <Skills />
        <Education />
        <Certificates /> {/* 👈 এখানেও ট্যাগটি পরিবর্তন করে Certificates দেওয়া হলো */}
        <Projects />
        <UpcomingProject />
        <Contact />
      </main>
      <Footer />
    </>
  );
}