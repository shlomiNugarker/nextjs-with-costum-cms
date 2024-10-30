"use client";

import { useEffect } from "react";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-center p-4">
      <h2 className="text-4xl font-bold text-customNavy mb-4">
        אירעה תקלה במערכת
      </h2>
      <p className="text-gray-600 text-lg mb-8">
        מצטערים, משהו השתבש. אפשר לנסות לרענן את הדף כדי להמשיך.
      </p>
      <button
        onClick={reset}
        className="bg-customGreen text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-green-600 transition duration-200"
      >
        נסה שוב
      </button>
    </div>
  );
}
