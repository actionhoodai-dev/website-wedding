import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://rajha-swetha-wedding.com'),
  title: "Rajha Mukhilan & Swetha — South Indian Wedding Invitation",
  description:
    "With the divine blessings of Lord Murugan, we cordially invite you to celebrate the wedding ceremony of Rajha Mukhilan & Swetha at Madurai Meenakshi Amman Temple.",
  openGraph: {
    title: "Rajha Mukhilan & Swetha — Wedding Invitation",
    description: "A cinematic South Indian wedding invitation experience",
    images: ["/couple/portrait.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
