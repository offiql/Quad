import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/components/ProviderComponent";
import NextTopLoader from "nextjs-toploader";
import { Toaster } from "sonner";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "Quad Health",
  description: "A comprehensive health management dashboard",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <NextTopLoader color="#3B0764" />
        <ReduxProvider>{children}</ReduxProvider>
        <Toaster richColors position="top-right" closeButton />
      </body>
    </html>
  );
}
