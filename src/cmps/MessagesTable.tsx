"use client";
import React, { useState } from "react";

interface Message {
  id: number;
  name: string;
  email: string;
  message: string;
  created_at: Date | null;
}

interface MessagesTableProps {
  messages: Message[];
}

export const MessagesTable: React.FC<MessagesTableProps> = ({ messages }) => {
  const [filters, setFilters] = useState({
    name: "",
    email: "",
    message: "",
    date: "",
  });

  const [sortConfig, setSortConfig] = useState<{
    key: keyof Message;
    direction: "asc" | "desc";
  } | null>(null);

  // עדכון מסנן
  const handleFilterChange = (field: string, value: string) => {
    setFilters((prev) => ({ ...prev, [field]: value }));
  };

  // עדכון מיון
  const handleSort = (key: keyof Message) => {
    setSortConfig((prev) =>
      prev?.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  // ניקוי כל הפילטרים והמיון
  const clearFiltersAndSort = () => {
    setFilters({
      name: "",
      email: "",
      message: "",
      date: "",
    });
    setSortConfig(null);
  };

  // עיבוד הודעות מסוננות וממוינות
  const processedMessages = React.useMemo(() => {
    const filtered = messages.filter((message) => {
      const matchesName =
        filters.name === "" ||
        message.name.toLowerCase().includes(filters.name.toLowerCase());
      const matchesEmail =
        filters.email === "" ||
        message.email.toLowerCase().includes(filters.email.toLowerCase());
      const matchesMessage =
        filters.message === "" ||
        message.message.toLowerCase().includes(filters.message.toLowerCase());
      const matchesDate =
        filters.date === "" ||
        (message.created_at &&
          new Date(message.created_at)
            .toLocaleDateString()
            .includes(filters.date));
      return matchesName && matchesEmail && matchesMessage && matchesDate;
    });

    if (sortConfig) {
      filtered.sort((a, b) => {
        const valueA = a[sortConfig.key];
        const valueB = b[sortConfig.key];

        if (valueA == null || valueB == null) return 0;

        const comparison =
          typeof valueA === "string"
            ? valueA.localeCompare(valueB as string)
            : (valueA as number) - (valueB as number);

        return sortConfig.direction === "asc" ? comparison : -comparison;
      });
    }

    return filtered;
  }, [messages, filters, sortConfig]);

  return (
    <div className="container mx-auto p-6 bg-customPeach rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold mb-6 text-customNavy">
        הודעות יצירת קשר
      </h1>

      {/* שדות סינון */}
      <div className="flex flex-wrap justify-center gap-4 mb-4">
        <input
          type="text"
          placeholder="סינון לפי שם"
          className="p-2 border border-gray-300 rounded-md"
          value={filters.name}
          onChange={(e) => handleFilterChange("name", e.target.value)}
        />
        <input
          type="text"
          placeholder="סינון לפי אימייל"
          className="p-2 border border-gray-300 rounded-md"
          value={filters.email}
          onChange={(e) => handleFilterChange("email", e.target.value)}
        />
        <input
          type="text"
          placeholder="סינון לפי הודעה"
          className="p-2 border border-gray-300 rounded-md"
          value={filters.message}
          onChange={(e) => handleFilterChange("message", e.target.value)}
        />
        <input
          type="text"
          placeholder="סינון לפי תאריך (YYYY-MM-DD)"
          className="p-2 border border-gray-300 rounded-md"
          value={filters.date}
          onChange={(e) => handleFilterChange("date", e.target.value)}
        />
      </div>

      {/* כפתור לניקוי פילטרים ומיון */}
      <div className="flex justify-center mb-4">
        <button
          className="px-4 py-2 bg-customGreen text-white rounded-md hover:bg-customGreen/90"
          onClick={clearFiltersAndSort}
        >
          נקה פילטרים ומיון
        </button>
      </div>

      {/* טבלה */}
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-customNavy rounded-lg bg-white">
          <thead>
            <tr className="bg-customGreen text-white">
              {["id", "name", "email", "message", "created_at"].map((key) => (
                <th
                  key={key}
                  className="px-4 py-3 border-b border-customNavy cursor-pointer"
                  onClick={() => handleSort(key as keyof Message)}
                >
                  {key === sortConfig?.key && (
                    <span>{sortConfig.direction === "asc" ? "⬆️" : "⬇️"}</span>
                  )}
                  {key === "id"
                    ? "מספר מזהה"
                    : key === "name"
                    ? "שם"
                    : key === "email"
                    ? "אימייל"
                    : key === "message"
                    ? "הודעה"
                    : "תאריך"}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processedMessages.map((message) => (
              <tr key={message.id} className="hover:bg-customPeach/50">
                <td className="px-4 py-2 border-b border-gray-300 text-center">
                  {message.id}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {message.name}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {message.email}
                </td>
                <td className="px-4 py-2 border-b border-gray-300">
                  {message.message}
                </td>
                <td className="px-4 py-2 border-b border-gray-300 text-center">
                  {message.created_at
                    ? new Date(message.created_at).toLocaleString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
