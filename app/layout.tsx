import "./globals.css";
import type { Metadata } from "next";
import Header from "./Header";

export const metadata: Metadata = {
  title: "PlateCoach",
  description: "Your diabetes-friendly meal tracker & coach",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-50 font-sans">
        <Header />
        <main className="pt-32 pb-6 px-4 max-w-3xl mx-auto">{children}</main>
      </body>
    </html>
  );
}
