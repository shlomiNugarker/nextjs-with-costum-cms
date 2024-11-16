"use client";

import { useEffect } from "react";

export const CustomCursor = () => {
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.getElementById("custom-cursor")!;
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };

    const handleMouseDown = () => {
      const cursor = document.getElementById("custom-cursor")!;
      cursor.classList.add("click");
    };

    const handleMouseUp = () => {
      const cursor = document.getElementById("custom-cursor")!;
      cursor.classList.remove("click");
    };

    const handleMouseEnter = () => {
      const cursor = document.getElementById("custom-cursor")!;
      cursor.classList.add("hover");
    };

    const handleMouseLeave = () => {
      const cursor = document.getElementById("custom-cursor")!;
      cursor.classList.remove("hover");
    };

    const handleButtonEnter = () => {
      const cursor = document.getElementById("custom-cursor")!;
      cursor.classList.add("button-hover");
    };

    const handleButtonLeave = () => {
      const cursor = document.getElementById("custom-cursor")!;
      cursor.classList.remove("button-hover");
    };

    const links = document.querySelectorAll("a");
    const buttons = document.querySelectorAll("button");

    links.forEach((link) => {
      link.addEventListener("mouseenter", handleMouseEnter);
      link.addEventListener("mouseleave", handleMouseLeave);
    });

    buttons.forEach((button) => {
      button.addEventListener("mouseenter", handleButtonEnter);
      button.addEventListener("mouseleave", handleButtonLeave);
    });

    // Event listeners
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mousedown", handleMouseDown);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mousedown", handleMouseDown);
      document.removeEventListener("mouseup", handleMouseUp);

      links.forEach((link) => {
        link.removeEventListener("mouseenter", handleMouseEnter);
        link.removeEventListener("mouseleave", handleMouseLeave);
      });

      buttons.forEach((button) => {
        button.removeEventListener("mouseenter", handleButtonEnter);
        button.removeEventListener("mouseleave", handleButtonLeave);
      });
    };
  }, []);

  return (
    <div
      id="custom-cursor"
      className="fixed w-5 h-5 bg-[#8b5e3c] border-2 border-[#6b4226] shadow-[0_4px_6px_rgba(0,0,0,0.2),0_1px_3px_rgba(255,255,255,0.1)] rounded-full pointer-events-none transform -translate-x-1/2 -translate-y-1/2 transition-transform duration-100 ease-out z-[9999] [&.click]:scale-75 [&.click]:bg-[#5a3920] [&.click]:shadow-[0_6px_10px_rgba(0,0,0,0.3)] [&.hover]:scale-150 [&.hover]:bg-[#a2836e] [&.hover]:border-[3px] [&.hover]:border-[#d2b48c] [&.hover]:shadow-[0_6px_12px_rgba(0,0,0,0.3),0_2px_4px_rgba(255,255,255,0.2)] [&.button-hover]:scale-200 [&.button-hover]:bg-[#ff6347] [&.button-hover]:border-[#ff4500] [&.button-hover]:shadow-[0_6px_12px_rgba(255,69,0,0.4)]"
    ></div>
  );
};
