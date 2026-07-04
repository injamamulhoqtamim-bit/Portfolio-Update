import { Space_Grotesk, Syne, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import ScrollToTop from "@/components/ScrollToTop"; 
import Script from "next/script"; 

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

        {/* 🤖 Chatbase অফিশিয়াল স্ক্রিপ্ট কনফিগারেশন */}
        <Script id="chatbase-config" strategy="afterInteractive">
          {`
            window.chatbaseConfig = {
              chatbotId: "MAETekmoTgWjEk9Irlvy1",
            };
          `}
        </Script>
        <Script
          src="https://www.chatbase.co/embed.min.js"
          id="MAETekmoTgWjEk9Irlvy1"
          domain="www.chatbase.co"
          strategy="afterInteractive"
          defer
        />
      </body>
    </html>
  );
}