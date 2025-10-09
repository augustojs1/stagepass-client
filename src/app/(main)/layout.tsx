import type { Metadata } from "next";

import { Header } from "../layouts/components";
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
        <main className="max-w-[86rem] p-[1rem] m-auto">{children}</main>
      </body>
    </html>
  );
}
