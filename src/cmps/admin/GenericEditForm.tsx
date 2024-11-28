"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { uploadImageToCloudinary } from "@/services/client-api/clodinaryApi";
import httpService from "@/services/httpService";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";

const MarkdownEditor = dynamic(() => import("@uiw/react-markdown-editor"), {
  ssr: false,
});

/* eslint-disable @typescript-eslint/no-explicit-any */

export const GenericEditForm = ({
  fields,
  tableName,
  record,
}: {
  fields: string[];
  tableName: string;
  record: any;
}) => {
  const router = useRouter();
  const [data, setData] = useState(record);
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      setData((prev: any) => ({
        ...prev,
        [name]: name === "price" ? parseFloat(value) : value,
      }));
    },
    []
  );

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIsUploading(true);
      try {
        const imageUrl = await uploadImageToCloudinary(file);
        setData((prev: any) => ({
          ...prev,
          image_url: imageUrl,
        }));
      } catch (error) {
        console.error("Error uploading image:", error);
        alert("שגיאה בהעלאת התמונה");
      } finally {
        setIsUploading(false);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      alert(tableName);
      let url = `/table/${tableName}${data.id ? `/${data.id}` : ""}`;

      if (tableName === "siteInfo") {
        url = `site-info/${data.id}`;
      }

      const method = data.id ? "put" : "post";
      await httpService[method](url, data);
      alert("השורה נשמרה בהצלחה");
    } catch (err) {
      console.error("Error saving row", err);
      alert("שגיאה בשמירת השורה");
    }
    setIsSaving(false);
    router.push("/admin");
  };

  const deleteRecord = async () => {
    if (!data.id) return;

    const confirmDelete = confirm("האם אתה בטוח שברצונך למחוק את השורה?");
    if (!confirmDelete) return;

    try {
      await httpService.delete(`/table/${tableName}/${data.id}`);
      alert("השורה נמחקה בהצלחה");
      router.push("/admin");
    } catch (err) {
      console.error("Error deleting row", err);
      alert("שגיאה במחיקת השורה");
    }
  };

  const renderField = (field: string) => {
    if (field === "id") return null;

    const commonProps = {
      id: field,
      name: field,
      value: data[field] || "",
      onChange: handleChange,
      placeholder: "הכנס טקסט",
      className:
        "w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen",
      required: true,
    };

    return (
      <div key={field}>
        <label
          htmlFor={field}
          className="block text-sm font-semibold text-customNavy mb-1"
        >
          {field}
        </label>
        {field === "contact_email" ? (
          <input {...commonProps} type="email" />
        ) : field === "phone_number" ? (
          <input {...commonProps} type="tel" />
        ) : ["description", "meta_description", "og_description"].includes(
            field
          ) ? (
          <textarea {...commonProps} rows={3} />
        ) : field === "price" ? (
          <input {...commonProps} type="number" />
        ) : field === "image_url" ? (
          <div>
            <div className="relative flex flex-col items-center p-4 border border-gray-300 rounded-lg bg-white shadow-sm hover:shadow-md transition duration-150">
              <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                disabled={isUploading}
                className="w-full text-customGreen cursor-pointer file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:bg-customPeach file:text-customNavy hover:file:bg-opacity-80"
              />
              {isUploading && (
                <p className="mt-2 text-customNavy text-sm font-medium animate-pulse">
                  מעלה את התמונה...
                </p>
              )}
              <div className="mt-4 w-32 h-32 rounded-lg overflow-hidden shadow-md">
                {data[field] && (
                  <Image
                    src={data[field]}
                    alt="Uploaded"
                    className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
                    width={300}
                    height={300}
                  />
                )}
              </div>
            </div>
          </div>
        ) : field === "content" && tableName === "blogsTable" ? (
          <MarkdownEditor
            style={{ textAlign: "right" }}
            minHeight="200px"
            previewWidth="100%"
            theme="none"
            className="max-h-[100vh] text-right w-full"
            value={data[field]}
            onChange={(value) => {
              setData((prev: any) => ({
                ...prev,
                content: value,
              }));
            }}
          />
        ) : (
          <input {...commonProps} type="text" />
        )}
      </div>
    );
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-8 p-8 border border-customPeach bg-white shadow-lg rounded-lg max-w-2xl mx-auto mb-10 text-customNavy w-full"
    >
      <h1 className="text-3xl font-semibold text-center mb-6">{tableName}</h1>
      {fields.map(renderField)}

      <button
        type="submit"
        disabled={isSaving}
        className={`w-full py-3 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition ${
          isSaving ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSaving ? "שומר..." : "שמור"}
      </button>
      {data.id && (
        <button
          type="button"
          onClick={deleteRecord}
          className="w-full py-3 mt-2 bg-red-600 text-white font-bold rounded-lg hover:bg-opacity-90 transition"
        >
          מחק
        </button>
      )}
    </form>
  );
};
