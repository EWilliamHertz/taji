import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Taji Foodtruck | Street Food Reimagined",
  description: "Find Taji Foodtruck today. Check out our menu, gallery, and weekly schedule.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Caveat:wght@700&family=Inter:wght@400;700;900&display=swap" rel="stylesheet" />
      </head>
      <body className={`font-sans antialiased`}>
        {children}
      </body>
    </html>
  );
}
