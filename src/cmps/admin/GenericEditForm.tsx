"use client";

import { useCallback, useState } from "react";
import Image from "next/image";
import { uploadImageToCloudinary } from "@/services/client-api/clodinaryApi";
import httpService from "@/services/httpService";
import { useRouter } from "next/navigation";

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
  const [data, setData] = useState(() => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { created_at, ...rest } = record;
    return rest;
  });
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      const { name, value } = e.target;
      console.log({ name, value });
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
      if (data.id) {
        await httpService.put(`/table/${tableName}/${data.id}`, data);
      } else {
        await httpService.post(`/table/${tableName}`, data);
      }

      alert("השורה נשמרה בהצלחה");
    } catch (err) {
      console.error("Error saving col", err);
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
      setData(
        fields.reduce((acc: any, field: string) => {
          acc[field] = "";
          return acc;
        }, {})
      );

      router.push("/admin");
    } catch (err) {
      console.error("Error delete col", err);
      alert("שגיאה במחיקת השורה");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 flex max-w-[500px] flex-col p-6 bg-white shadow-md rounded-lg mx-auto text-customNavy"
    >
      <h1>עריכה {tableName}</h1>
      {fields.map((field: string) => {
        switch (field) {
          case "id":
            return null;
          case "name":
            return (
              <div key={field}>
                <label htmlFor={field}>{field}</label>
                <input
                  id={field}
                  type="text"
                  name="name"
                  value={data[field]}
                  onChange={handleChange}
                  placeholder="הכנס טקסט"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
                />
              </div>
            );
          case "description":
            return (
              <div key={field}>
                <label htmlFor={field}>{field}</label>
                <textarea
                  id={field}
                  name="description"
                  value={data[field]}
                  onChange={handleChange}
                  placeholder="הכנס טקסט"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
                />
              </div>
            );
          case "category":
            return (
              <div key={field}>
                <label htmlFor={field}>{field}</label>
                <input
                  id={field}
                  type="text"
                  name="category"
                  value={data[field]}
                  onChange={handleChange}
                  placeholder="הכנס טקסט"
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
                />
              </div>
            );
          case "price":
            return (
              <div key={field}>
                <label htmlFor={field}>{field}</label>
                <input
                  id={field}
                  type="number"
                  name="price"
                  value={data[field]}
                  onChange={handleChange}
                  placeholder="מחיר"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
                />
              </div>
            );
          case "pot_size":
            return (
              <div key={field}>
                <label htmlFor={field}>{field}</label>
                <input
                  id={field}
                  type="text"
                  name="pot_size"
                  value={data[field]}
                  onChange={handleChange}
                  placeholder="גודל עציץ"
                  required
                  className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-customGreen"
                />
              </div>
            );
          case "image_url":
            return (
              <div key={field}>
                <label className="block text-sm font-semibold text-customNavy mb-2">
                  תמונה:
                </label>
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
                    <Image
                      src={data[field]}
                      alt="Uploaded"
                      className="object-cover w-full h-full transition-transform duration-200 hover:scale-105"
                      width={300}
                      height={300}
                    />
                  </div>
                </div>
              </div>
            );
          default:
            return null;
        }
      })}

      <button
        type="submit"
        disabled={isSaving}
        className={`w-full py-3 bg-customGreen text-white font-bold rounded-lg hover:bg-opacity-90 transition ${
          isSaving ? "opacity-50 cursor-not-allowed" : ""
        }`}
      >
        {isSaving ? "שומר..." : "שמור מוצר"}
      </button>
      {data.id && (
        <button
          type="button"
          onClick={deleteRecord}
          className="w-full py-3 mt-2 bg-red-600 text-white font-bold rounded-lg hover:bg-opacity-90 transition"
        >
          מחק מוצר
        </button>
      )}
    </form>
  );
};
