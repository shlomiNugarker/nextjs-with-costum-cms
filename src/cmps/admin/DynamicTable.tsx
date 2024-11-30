"use client";
import Link from "next/link";
import React, { useMemo, useState } from "react";

interface DynamicTableProps {
  data: Record<string, unknown>[];
  tableName: string;
}

export const DynamicTable: React.FC<DynamicTableProps> = ({
  data,
  tableName,
}) => {
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: "asc" | "desc";
  } | null>(null);

  const [filters, setFilters] = useState<Record<string, string>>({});

  const handleFilterChange = (key: string, value: string) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const handleSort = (key: string) => {
    setSortConfig((prev) =>
      prev?.key === key
        ? { key, direction: prev.direction === "asc" ? "desc" : "asc" }
        : { key, direction: "asc" }
    );
  };

  const clearFiltersAndSort = () => {
    setFilters({});
    setSortConfig(null);
  };

  const processedData = useMemo(() => {
    let filtered = data;

    if (filters) {
      filtered = data.filter((row) =>
        Object.keys(filters).every(
          (key) =>
            filters[key] === "" ||
            String(row[key]).toLowerCase().includes(filters[key].toLowerCase())
        )
      );
    }

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
  }, [data, filters, sortConfig]);

  const headers = data.length > 0 ? Object.keys(data[0]) : [];

  if (data.length === 0) {
    return <div>אין נתונים להצגה.</div>;
  }

  return (
    <div className="container mx-auto p-4 sm:p-6 bg-customPeach rounded-lg shadow-md text-center">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-customNavy">
        {tableName}
      </h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 mb-4">
        {headers.map((key) => (
          <input
            key={key}
            type="text"
            placeholder={`סינון לפי ${key}`}
            className="p-2 border border-gray-300 rounded-md w-full"
            value={filters[key] || ""}
            onChange={(e) => handleFilterChange(key, e.target.value)}
          />
        ))}
      </div>

      <div className="flex justify-center mb-4">
        <button
          className="px-4 py-2 bg-customGreen text-white rounded-md hover:bg-customGreen/90 w-full sm:w-auto"
          onClick={clearFiltersAndSort}
        >
          נקה פילטרים ומיון
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-customNavy rounded-lg bg-white text-sm sm:text-base">
          <thead>
            <tr className="bg-customGreen text-white">
              {[...headers, "Edit"].map((key) => (
                <th
                  key={key}
                  className={`px-2 sm:px-4 py-3 border-b border-customNavy cursor-pointer ${
                    sortConfig?.key === key ? "font-bold" : ""
                  }`}
                  onClick={() => handleSort(key)}
                >
                  {sortConfig?.key === key && (
                    <span>{sortConfig.direction === "asc" ? "⬆️" : "⬇️"}</span>
                  )}
                  {key}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {processedData.map((row, rowIndex) => (
              <tr key={rowIndex} className="hover:bg-customPeach/50">
                {headers.map((key) => (
                  <td
                    key={key}
                    className="px-2 sm:px-4 py-2 border-b border-gray-300 text-center truncate max-w-14"
                  >
                    {row[key] != null ? row[key].toString() : "N/A"}
                  </td>
                ))}
                <td className="px-2 sm:px-4 py-2 border-b border-gray-300 text-center truncate max-w-14">
                  <Link
                    href={`/admin/edit/${tableName}/${row.id}`}
                    className="bg-customGreen text-white rounded-md hover:bg-customGreen/90 p-1"
                  >
                    ערוך
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex justify-center mt-4">
        <Link
          className="px-4 py-2 bg-customGreen text-white rounded-md hover:bg-customGreen/90"
          href={`/admin/add/${tableName}`}
        >
          הוסף רשומה חדשה
        </Link>
      </div>
    </div>
  );
};
