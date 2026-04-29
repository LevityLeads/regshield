import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "RegShield - SEC Regulation S-P Compliance Kit",
  description:
    "AI-powered compliance documents for small investment advisers. Get your Incident Response Plan, Vendor Oversight Policies, Breach Notification Templates, and Recordkeeping Procedures in minutes, not months.",
  openGraph: {
    title: "RegShield - SEC Regulation S-P Compliance in 15 Minutes",
    description:
      "Generate all required SEC Regulation S-P policy documents for your RIA. Deadline: June 3, 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${spaceGrotesk.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#060a13] text-white font-[family-name:var(--font-inter)]">
        {children}
      </body>
    </html>
  );
}
