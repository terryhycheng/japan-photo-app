import type { Metadata } from "next";
import { Dela_Gothic_One, Kiwi_Maru } from "next/font/google";
import "./globals.css";

const delaGothicOne = Dela_Gothic_One({
  variable: "--font-dela-gothic-one",
  subsets: ["latin"],
  weight: ["400"],
});

const kiwimaru = Kiwi_Maru({
  variable: "--font-kiwimaru",
  subsets: ["latin"],
  weight: ["300", "400"],
});

export const metadata: Metadata = {
  title: "老圍坐艇會の東京攝影比賽",
  description: "實力之爭，攝影之戰",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${delaGothicOne.variable} ${kiwimaru.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
