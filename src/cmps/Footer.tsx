/* eslint-disable @typescript-eslint/no-explicit-any */
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaWhatsapp,
  FaTwitter,
  FaYoutube,
} from "react-icons/fa";
import { Logo } from "./Logo";
import { genericRepository } from "@/services/db/repositories/genericRepository";

export const Footer = async ({ siteInfo, pageLinks }: any) => {
  const [city, street, houseNumber] = (siteInfo?.address || "site,info")
    .split(",")
    .map((part: string) => part.trim());

  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${street}, ${houseNumber}, ${city}, ישראל`
  )}`;

  const socialLinks = [
    { url: siteInfo?.facebook_url || "", icon: FaFacebook, label: "Facebook" },
    {
      url: siteInfo?.instagram_url || "",
      icon: FaInstagram,
      label: "Instagram",
    },
    { url: siteInfo?.twitter_url || "", icon: FaTwitter, label: "Twitter" },
    { url: siteInfo?.youtube_url || "", icon: FaYoutube, label: "YouTube" },
    {
      url:
        siteInfo?.phone_number &&
        `https://wa.me/972${siteInfo?.phone_number || ""}`,
      icon: FaWhatsapp,
      label: "WhatsApp",
    },
  ];

  return (
    <footer className="bg-customPeach text-center">
      <div className="mx-auto grid justify-items-center max-w-screen-xl gap-y-8 gap-x-12 px-4 py-10 md:grid-cols-2 xl:grid-cols-4 xl:px-10">
        <div className="max-w-sm">
          <div className="mt-2 mb-2 flex h-12 items-center space-x-2 justify-center">
            <Link href="/" className="hover:text-customGreen hover:underline">
              <Logo siteName={siteInfo?.site_name || ""} />
            </Link>
          </div>
          <div className="text-gray-600">{siteInfo?.description || ""}</div>
        </div>

        <div>
          <div className="mt-4 mb-2 font-medium text-customNavy xl:mb-4">
            כתובת:
          </div>
          <div className="text-gray-600">
            <Link
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-customGreen hover:underline"
            >
              {street} {houseNumber}, <br />
              {city} <br />
            </Link>
          </div>
        </div>

        <div>
          <div className="mt-4 mb-2 font-medium text-customNavy xl:mb-4">
            עמודים:
          </div>
          <nav aria-label="Footer Navigation" className="text-gray-600">
            <ul className="space-y-3">
              {pageLinks.map((link: any) => (
                <li key={link.href}>
                  <Link
                    href={"/page/" + link.href}
                    className="hover:text-customGreen hover:underline"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div>
          <div className="mt-4 mb-2 font-medium text-customNavy xl:mb-4">
            הרשמו לניוזלטר שלנו:
          </div>
          <Form
            action={async (formData: FormData) => {
              "use server";
              const email = formData.get("email") as string;
              await genericRepository.addRecord("newsletterSubscribers", {
                email,
              } as any);
            }}
            className="flex flex-col mb-4"
          >
            <input
              type="email"
              id="email"
              name="email"
              className="focus:outline mb-2 block h-14 w-full rounded-xl  bg-white px-4 focus:outline-none focus:ring-1 focus:ring-customGreen"
              placeholder="הכנס את האימייל שלך"
              required
            />
            <button className="block rounded-xl bg-customGreen px-6 w-full py-3 font-medium text-white">
              הרשמה
            </button>
          </Form>

          <div className="flex gap-4 mt-4 justify-center">
            {socialLinks.map(
              ({ url, icon: Icon, label }) =>
                url && (
                  <Link
                    key={label}
                    href={url}
                    target="_blank"
                    aria-label={label}
                    className="flex justify-center items-center"
                  >
                    <Icon className="text-customNavy hover:text-customGreen text-4xl" />
                  </Link>
                )
            )}
          </div>
        </div>
      </div>

      <div className="bg-customNavy">
        <div className="mx-auto flex max-w-screen-xl flex-col gap-y-4 px-4 py-3 text-center text-customPeach sm:flex-row sm:justify-between sm:text-left">
          <div>
            © {new Date().getFullYear()} {siteInfo?.site_name || ""} | כל
            הזכויות שמורות
          </div>
          <div>
            <Link className="hover:text-customGreen" href="/privacy-policy">
              מדיניות פרטיות
            </Link>
            <span className="mx-2">|</span>
            <Link className="hover:text-customGreen" href="/terms-of-service">
              תנאי שירות
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Form = ({ children, action }: any) => {
  return <form action={action}>{...children}</form>;
};
