/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { saveSiteInfo } from "@/services/client-api/siteInfoApi";
import { useState, useCallback } from "react";

const SiteInfoEditForm = ({ initialData }: any) => {
  const [siteInfo, setSiteInfo] = useState({
    id: initialData?.id || undefined,
    site_name: initialData?.site_name || "",
    description: initialData?.description || "",
    address: initialData?.address || "",
    contact_email: initialData?.contact_email || "",
    phone_number: initialData?.phone_number || "",
    opening_hours: initialData?.opening_hours || "",
    meta_title: initialData?.meta_title || "",
    meta_description: initialData?.meta_description || "",
    og_title: initialData?.og_title || "",
    og_description: initialData?.og_description || "",
    og_url: initialData?.og_url || "",
    og_type: initialData?.og_type || "",
    facebook_url: initialData?.facebook_url || "",
    instagram_url: initialData?.instagram_url || "",
    twitter_url: initialData?.twitter_url || "",
    youtube_url: initialData?.youtube_url || "",
  });

  const [isSaving, setIsSaving] = useState<boolean>(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      if (name === "phone_number") {
        let formattedValue = value;
        if (!formattedValue.startsWith("972")) {
          formattedValue = formattedValue.replace(/^0+/, "");
          formattedValue = "972" + formattedValue;
        }
        setSiteInfo((prev) => ({ ...prev, [name]: formattedValue }));
      } else {
        setSiteInfo((prev) => ({ ...prev, [name]: value }));
      }
    },
    []
  );

  const handleSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      setIsSaving(true);
      try {
        await saveSiteInfo(siteInfo);
        alert("המידע על האתר עודכן בהצלחה");
      } catch (error) {
        console.error("Error saving site info:", error);
        alert("שגיאה בעדכון המידע על האתר");
      } finally {
        setIsSaving(false);
      }
    },
    [siteInfo]
  );

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg w-full m-5 mx-auto bg-white p-6 rounded-md shadow-md text-customNavy"
    >
      <h2 className="text-2xl font-bold mb-4 text-center text-customNavy">
        עריכת מידע על האתר
      </h2>

      {/* שם האתר */}
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">שם האתר:</label>
        <input
          type="text"
          name="site_name"
          value={siteInfo.site_name}
          onChange={handleChange}
          placeholder="לדוגמה: הגינה בפרדס"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>

      {/* תיאור */}
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">תיאור:</label>
        <textarea
          name="description"
          value={siteInfo.description}
          onChange={handleChange}
          placeholder="תיאור כללי של האתר"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>

      {/* כתובת */}
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">כתובת:</label>
        <input
          type="text"
          name="address"
          value={siteInfo.address}
          onChange={handleChange}
          placeholder="לדוגמה: רחוב החקלאי 12, פרדס חנה"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>

      {/* אימייל */}
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">אימייל:</label>
        <input
          type="email"
          name="contact_email"
          value={siteInfo.contact_email}
          onChange={handleChange}
          placeholder="לדוגמה: info@haginabapardes.com"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>

      {/* מספר טלפון */}
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

      {/* שעות פתיחה */}
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">
          שעות פתיחה:
        </label>
        <input
          type="text"
          name="opening_hours"
          value={siteInfo.opening_hours}
          onChange={handleChange}
          placeholder="לדוגמה: א'-ה' 9:00-17:00"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>

      {/* Meta Title */}
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">
          Meta Title:
        </label>
        <input
          type="text"
          name="meta_title"
          value={siteInfo.meta_title}
          onChange={handleChange}
          placeholder="כותרת עבור SEO"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>

      {/* Meta Description */}
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">
          Meta Description:
        </label>
        <textarea
          name="meta_description"
          value={siteInfo.meta_description}
          onChange={handleChange}
          placeholder="תיאור קצר עבור SEO"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>

      {/* OG Title */}
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">
          OG Title:
        </label>
        <input
          type="text"
          name="og_title"
          value={siteInfo.og_title}
          onChange={handleChange}
          placeholder="כותרת לשיתוף ברשתות חברתיות"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>

      {/* OG Description */}
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">
          OG Description:
        </label>
        <textarea
          name="og_description"
          value={siteInfo.og_description}
          onChange={handleChange}
          placeholder="תיאור לשיתוף ברשתות חברתיות"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>

      {/* OG URL */}
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">OG URL:</label>
        <input
          type="text"
          name="og_url"
          value={siteInfo.og_url}
          onChange={handleChange}
          placeholder="כתובת URL לשיתוף ברשתות חברתיות"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>

      {/* OG Type */}
      <div className="mb-4">
        <label className="block text-customNavy font-bold mb-2">OG Type:</label>
        <input
          type="text"
          name="og_type"
          value={siteInfo.og_type}
          onChange={handleChange}
          placeholder="סוג התוכן, לדוגמה: website"
          className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:border-customGreen"
        />
      </div>

      {/* Facebook URL */}
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

      {/* Instagram URL */}
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

      {/* Twitter URL */}
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

      {/* YouTube URL */}
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
        disabled={isSaving}
        className={`w-full bg-customGreen text-white py-2 px-4 rounded-md hover:bg-opacity-90 focus:outline-none focus:bg-customGreen ${
          isSaving ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSaving ? "שומר..." : "שמירת שינויים"}
      </button>
    </form>
  );
};

export default SiteInfoEditForm;
