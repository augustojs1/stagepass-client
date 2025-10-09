import { font_body, font_display, font_logo } from "../../fonts";

import "../globals.css";

export default async function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="relative min-h-screen bg-cover bg-center bg-no-repeat bg-[url(/images/auth-background.png)]">
        <div className="absolute inset-0 bg-gradient-to-b from-[#636AE8]/60 to-[#3f3e66]/80" />
        <main className="relative z-10 flex justify-center items-center min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
