"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    const onMouseMove = (e) => {
      const mx = e.clientX;
      const my = e.clientY;
      
      // ডটটিকে মাউসের সাথে সাথে ইনস্ট্যান্টলি মুভ করাবে
      if (cursorRef.current) {
        cursorRef.current.style.left = mx + "px";
        cursorRef.current.style.top = my + "px";
      }

      // রিংটিকেও কোনো ল্যাগ/অ্যানিমেশন ছাড়া সরাসরি মাউসের পজিশনে বসিয়ে দেবে
      if (ringRef.current) {
        ringRef.current.style.left = mx + "px";
        cursorRef.current.style.top = my + "px"; 
        // Note: আপনার গ্লোবাল CSS-এ যদি রিংয়ের কোনো transition দেওয়া থাকে, তবে সেটিও বাদ দিতে পারেন।
        ringRef.current.style.top = my + "px";
      }
    };

    window.addEventListener("mousemove", onMouseMove);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <>
      <div id="cursor" ref={cursorRef}></div>
      <div id="cursor-ring" ref={ringRef}></div>
    </>
  );
}