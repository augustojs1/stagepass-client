import type { Metadata } from "next";

import { Footer, Header } from "@/components/";
import { font_body, font_display, font_logo } from "../../fonts";

import "../globals.css";

export const metadata: Metadata = {
  title: "StagePass | Home",
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
        <Header />
        <main className="m-auto">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
