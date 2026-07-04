import { Space_Grotesk, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop"; 

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

const syne = Syne({
  variable: "--font-syne",
  subsets: ["latin"],
});

const jetBrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Injamamul Hoq | Web Developer",
  description: "Passionate developer crafting modern, scalable web applications with React, Node.js, MongoDB, and Express.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${spaceGrotesk.variable} ${syne.variable} ${jetBrainsMono.variable} antialiased relative`}
      >
        {children}
        
        {/* 🔘 গ্লোবাল বাটন কন্টেইনার */}
        <ScrollToTop />
      </body>
    </html>
  );
}