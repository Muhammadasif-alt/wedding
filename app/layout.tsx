import type { Metadata } from "next";
import "./globals.css";
import { invitation } from "@/data/invitation";

export const metadata: Metadata = {
  title: `${invitation.couple.groom} & ${invitation.couple.bride} — Wedding Invitation`,
  description: "We would like to invite you for our wedding",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,500;0,600;1,400;1,500&family=Great+Vibes&family=Jost:wght@300;400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
