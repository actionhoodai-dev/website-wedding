import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL('https://rajha-swetha-wedding.com'),
  title: "Rajha Mukilan & Swetha — South Indian Wedding Invitation",
  description:
    "With the divine blessings of Lord Murugan, we cordially invite you to celebrate the wedding ceremony of Rajha Mukilan & Swetha at Madurai Meenakshi Amman Temple.",
  openGraph: {
    title: "Rajha Mukilan & Swetha — Wedding Invitation",
    description: "A cinematic South Indian wedding invitation experience",
    images: ["/couple/portrait.jpg"],
  },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Alex+Brush&family=Berkshire+Swash&family=Cinzel:wght@400;500;600;700;800;900&family=Cinzel+Decorative:wght@400;700;900&family=Great+Vibes&family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
