import type { Metadata } from "next";
import "../styles/globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Pokedex",
  description: "Pokemon directory",
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
        {children}
      </body>
    </html>
  );
}
