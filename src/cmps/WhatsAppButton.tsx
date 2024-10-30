import Link from "next/link";
import { FaWhatsapp } from "react-icons/fa";

export const WhatsAppButton = () => {
  return (
    <Link
      href="https://wa.me/972529526762"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-4 right-4 bg-green-500 hover:bg-green-600 text-white p-3 rounded-full shadow-lg flex items-center justify-center"
      aria-label="WhatsApp"
    >
      <FaWhatsapp className="w-8 h-8" />
    </Link>
  );
};
