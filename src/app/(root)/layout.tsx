import { Inter } from "next/font/google";

import Footer from "@/components/common/footer";
import FooterGradient from "@/components/common/footer-gradient";
import Header from "@/components/common/header";
import HeaderGradient from "@/components/common/header-gradient";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { TooltipProvider } from "@/components/ui/tooltip";
import { SanityLive } from "@/sanity/lib/live";
import VercelAnalytics from "./vercel-analytics";

const inter = Inter({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin-ext"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <body className={`antialiased relative ${inter.className}`}>
      <HeaderGradient />
      <ThemeProvider attribute="class" defaultTheme="dark">
        <TooltipProvider>
          <Header />
          {children}
          <Footer />
        </TooltipProvider>
      </ThemeProvider>
      <FooterGradient />
      <SanityLive />
      <VercelAnalytics />
    </body>
  );
}
