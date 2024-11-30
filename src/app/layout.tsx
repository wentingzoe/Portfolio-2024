import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.scss";
import Header from "@/components/Header";
import { BreakpointProvider } from "@/context/BreakpointContext";

const inter = Inter({ subsets: ["latin"] });
export const metadata: Metadata = {
  title: "Wenting Yong's Portfolio",
  description: "Wenting Yong's a front-end developer & D based in Canada.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <link rel="icon" href="/icon.svg" type="image/svg+xml" />
      <body className={inter.className}>
        <BreakpointProvider>
          <Header />
          {children}
        </BreakpointProvider>
      </body>
    </html>
  );
}
