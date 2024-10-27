import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { ThemeSwitch } from "@/components/theme/theme-switch";
import HeroGradient from "@/components/hero/hero-gradient";

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`antialiased `}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ThemeSwitch className="fixed bottom-10 left-10" />
          <HeroGradient />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
