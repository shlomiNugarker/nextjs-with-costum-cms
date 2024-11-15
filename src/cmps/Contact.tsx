"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from "react";

export const Contact = ({ title, description }: any) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Failed to send message");
      }

      alert("הודעה נשלחה בהצלחה");
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      console.error("Error sending message:", error);
      alert("שגיאה בשליחת ההודעה");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mt-10" id="contact">
      <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
        <h2 className="text-4xl font-bold text-center mb-6 text-customNavy">
          {title}
        </h2>
        <p className="text-center text-gray-600 mb-12 text-2xl">
          {description}
        </p>
        <form onSubmit={handleSubmit} className="space-y-8">
          <div>
            <label
              className="text-3xl font-semibold text-customNavy mb-4"
              htmlFor="name"
            >
              שם
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition"
              placeholder="הזן את שמך"
              required
            />
          </div>
          <div>
            <label
              className="text-3xl font-semibold text-customNavy mb-4"
              htmlFor="email"
            >
              דוא&quot;ל
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition"
              placeholder="הזן את כתובת הדוא\ל שלך"
              required
            />
          </div>
          <div>
            <label
              className="text-3xl font-semibold text-customNavy mb-4"
              htmlFor="message"
            >
              הודעה
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen transition"
              placeholder="כתוב את הודעתך כאן"
              rows={5}
              required
            ></textarea>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="py-3 px-5 font-medium text-center text-white rounded-lg bg-customGreen sm:w-fit hover:bg-opacity-90 focus:ring-4 focus:outline-none focus:ring-customGreen"
          >
            {isSubmitting ? "שולח..." : "שלח הודעה"}
          </button>
        </form>
      </div>
    </section>
  );
};
