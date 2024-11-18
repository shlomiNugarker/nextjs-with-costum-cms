import React from "react";

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
  const sortedMessages = [...messages].sort((a, b) => {
    const dateA = a.created_at ? new Date(a.created_at).getTime() : 0;
    const dateB = b.created_at ? new Date(b.created_at).getTime() : 0;
    return dateB - dateA;
  });

  return (
    <div className="container mx-auto p-6 bg-customPeach rounded-lg shadow-md text-center">
      <h1 className="text-3xl font-bold mb-6 text-customNavy text-center">
        הודעות יצירת קשר
      </h1>
      <div className="overflow-x-auto">
        <table className="table-auto w-full border border-customNavy rounded-lg bg-white">
          <thead>
            <tr className="bg-customGreen text-white">
              <th className="px-4 py-3 border-b border-customNavy">ID</th>
              <th className="px-4 py-3 border-b border-customNavy">שם</th>
              <th className="px-4 py-3 border-b border-customNavy">אימייל</th>
              <th className="px-4 py-3 border-b border-customNavy">הודעה</th>
              <th className="px-4 py-3 border-b border-customNavy">תאריך</th>
            </tr>
          </thead>
          <tbody>
            {sortedMessages.map((message) => (
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
