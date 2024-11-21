"use server";

import { getClient } from "@/config/database.config";

export async function seedInitialSiteInfo() {
  const initialSiteInfo = {
    site_name: "הגינה בפרדס",
    description: "חווה אורגנית למכירת ירקות טריים.",
    address: "פרדס חנה, רחוב החקלאי 12",
    contact_email: "info@haginabapardes.com",
    phone_number: "052-1234567",
    opening_hours: "א-ה, 9:00-17:00",
    meta_title: "הגינה בפרדס - חווה אורגנית",
    meta_description: "חווה אורגנית למכירת ירקות טריים בפרדס חנה.",
    og_title: "הגינה בפרדס",
    og_description: "חווה אורגנית למכירת ירקות טריים בפרדס חנה.",
    og_url: "https://haginabapardes.com",
    og_type: "website",
    facebook_url: "https://www.facebook.com/haginabapardes",
    instagram_url: "https://www.instagram.com/haginabapardes",
    twitter_url: "https://www.twitter.com/haginabapardes",
    youtube_url: "https://www.youtube.com/haginabapardes",
  };

  const client = await getClient();

  if (client) {
    await client`
      INSERT INTO site_info (site_name, description, address, contact_email, phone_number, opening_hours, meta_title, meta_description, og_title, og_description, og_url, og_type, facebook_url, instagram_url, twitter_url, youtube_url)
      VALUES (${initialSiteInfo.site_name}, ${initialSiteInfo.description}, ${initialSiteInfo.address}, ${initialSiteInfo.contact_email}, ${initialSiteInfo.phone_number}, ${initialSiteInfo.opening_hours}, ${initialSiteInfo.meta_title}, ${initialSiteInfo.meta_description}, ${initialSiteInfo.og_title}, ${initialSiteInfo.og_description}, ${initialSiteInfo.og_url}, ${initialSiteInfo.og_type}, ${initialSiteInfo.facebook_url}, ${initialSiteInfo.instagram_url}, ${initialSiteInfo.twitter_url}, ${initialSiteInfo.youtube_url});
    `;

    console.log("Initial site information added to site_info table.");
  }
}
