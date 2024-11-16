"use client";

import { useEffect } from "react";

export const CosumeMouse = () => {
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

  return <div className="custom-cursor" id="custom-cursor"></div>;
};
