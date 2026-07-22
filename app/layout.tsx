import type { Metadata } from "next";
import "./globals.css";
import "./overrides.css";
import "./mega.css";
import "./content.css";

export const metadata: Metadata = {
  title: "MATW Project | Muslim Charity",
  description: "Support Muslims around the world with MATW Project.",
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
