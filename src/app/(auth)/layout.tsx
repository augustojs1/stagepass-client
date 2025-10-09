import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "StagePass | Sign In",
  description: "Sign In",
};

export default async function SignInLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <main className="max-w-[86rem] p-[1rem] m-auto">{children}</main>
      </body>
    </html>
  );
}
