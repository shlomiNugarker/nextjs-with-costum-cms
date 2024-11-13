"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */

import { saveSiteInfo } from "@/services/client-api/siteInfoApi";
import { useState } from "react";

const SiteInfoEditForm = ({ initialData }: any) => {
  const [siteInfo, setSiteInfo] = useState({
    id: initialData.id || undefined,
    site_name: initialData.site_name || "",
    description: initialData.description || "",
    address: initialData.address || "",
    contact_email: initialData.contact_email || "",
    phone_number: initialData.phone_number || "",
    opening_hours: initialData.opening_hours || "",
    meta_title: initialData.meta_title || "",
    meta_description: initialData.meta_description || "",
    og_title: initialData.og_title || "",
    og_description: initialData.og_description || "",
    og_url: initialData.og_url || "",
    og_type: initialData.og_type || "",
    facebook_url: initialData.facebook_url || "",
    instagram_url: initialData.instagram_url || "",
    twitter_url: initialData.twitter_url || "",
    youtube_url: initialData.youtube_url || "",
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    const { name, value } = e.target;

    // בדיקה עבור מספר טלפון והוספת קידומת המדינה אם היא חסרה
    if (name === "phone_number") {
      let formattedValue = value;

      // אם המספר לא מתחיל בקידומת של ישראל (972), נוסיף אותה
      if (!formattedValue.startsWith("972")) {
        // הסרת אפסים מהתחלה במידה וישנם
        formattedValue = formattedValue.replace(/^0+/, "");

        // הוספת קידומת ישראלית 972
        formattedValue = "972" + formattedValue;
      }

      setSiteInfo((prev) => ({ ...prev, [name]: formattedValue }));
    } else {
      setSiteInfo((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    e.preventDefault();
    await saveSiteInfo(siteInfo);
    alert("המידע על האתר עודכן בהצלחה");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto bg-white p-6 rounded-md shadow-md text-customNavy"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-customNavy">
        עריכת מידע על האתר
      </h2>

      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">
          מספר טלפון:
        </label>
        <input
          type="tel"
          name="phone_number"
          value={siteInfo.phone_number}
          onChange={handleChange}
          placeholder="לדוגמה: 052-1234567"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>

      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">
          Facebook URL:
        </label>
        <input
          type="text"
          name="facebook_url"
          value={siteInfo.facebook_url}
          onChange={handleChange}
          placeholder="לדוגמה: https://www.facebook.com/haginabapardes"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">
          Instagram URL:
        </label>
        <input
          type="text"
          name="instagram_url"
          value={siteInfo.instagram_url}
          onChange={handleChange}
          placeholder="לדוגמה: https://www.instagram.com/haginabapardes"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">
          Twitter URL:
        </label>
        <input
          type="text"
          name="twitter_url"
          value={siteInfo.twitter_url}
          onChange={handleChange}
          placeholder="לדוגמה: https://www.twitter.com/haginabapardes"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">
          YouTube URL:
        </label>
        <input
          type="text"
          name="youtube_url"
          value={siteInfo.youtube_url}
          onChange={handleChange}
          placeholder="לדוגמה: https://www.youtube.com/haginabapardes"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-customGreen text-white py-2 px-4 rounded-md hover:bg-green-600 focus:outline-none focus:bg-green-600"
      >
        שמירת שינויים
      </button>
    </form>
  );
};

export default SiteInfoEditForm;
