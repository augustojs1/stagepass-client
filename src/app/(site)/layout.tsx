import type { Metadata } from "next";

import { Footer, Header } from "@/components/";
import { UserContextProvider } from "@/context";
import { getMe } from "@/actions";
import { font_body, font_display, font_logo } from "../../fonts";

import "../globals.css";

export const metadata: Metadata = {
  title: "StagePass | Home",
  description: "Home",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { data: user } = await getMe();

  return (
    <html lang="en">
      <body>
        <UserContextProvider user={user}>
          <Header />
          <main className="m-auto">{children}</main>
          <Footer />
        </UserContextProvider>
      </body>
    </html>
  );
}
