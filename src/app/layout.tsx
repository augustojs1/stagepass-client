import type { Metadata } from "next";

import { font_body, font_display, font_logo } from "../fonts";

import "./globals.css";

export const metadata: Metadata = {
  title: "StagePass",
  description: "Home",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  );
}
