"use client";

import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

import { navLinks, socials } from "@/lib/constants";
import Logo from "./logo";
import MobileNav from "./mobile-nav";
import { useState } from "react";
import { ThemeSwitch } from "../theme/theme-switch";

const Header = () => {
  const [hidden, setHidden] = useState(false);

  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest: number) => {
    const prev = scrollY.getPrevious() || 0;

    if (latest > prev && latest > 100) {
      setHidden(true);
    } else {
      setHidden(false);
    }
  });
  return (
    <>
      <motion.header
        variants={{
          visible: { y: 0 },
          hidden: { y: -200 },
        }}
        initial={{ y: -200 }}
        animate={hidden ? "hidden" : "visible"}
        transition={{ duration: 0.2 }}
        className=" pt-5 hidden px-4 md:block sticky top-5 md:top-5  w-full z-50"
      >
        <div className="container mx-auto flex h-16 w-full max-w-[1024px] items-center justify-between rounded-full border-[1px] border-white/25 bg-white/25 px-8 backdrop-blur-md dark:border-[#5E5E5E]/20 dark:bg-[#18181D]/30">
          <div className="flex items-center gap-10">
            <Link aria-label="Vignesh Gupta Logo" href="/">
              <Logo width={50} height={50} />
            </Link>
            <nav
              aria-label="Main"
              data-orientation="horizontal"
              dir="ltr"
              className="relative flex justify-center"
            >
              <div className="relative">
                <ul className="m-0 flex list-none items-center gap-10 rounded-[6px] p-1">
                  {navLinks.map((link) => (
                    <li key={`nav-link-${link.name}`}>
                      <Link
                        className="block py-2 text-onyx/70 transition-colors hover:text-onyx dark:text-muted-foreground dark:hover:text-white"
                        href={link.href}
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex gap-6 text-onyx/70 dark:text-white/70 items-center">
              {socials.map((social) => (
                <Link
                  key={`header-social-${social.name}`}
                  className="group transition hover:text-onyx dark:hover:text-white"
                  target="_blank"
                  aria-label={social.name}
                  href={social.href}
                >
                  <social.icon className="size-6" />
                </Link>
              ))}
              <ThemeSwitch variant="ghost" />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Logo on the top in mobile view */}
      <Link
        href="/"
        aria-label="Vignesh Gupta Logo"
        className="relative top-5 left-0 right-0"
      >
        <Logo
          width={50}
          height={50}
          className="block mx-auto md:hidden opacity-60"
        />
      </Link>

      {/* Mobile navigation bar */}
      <MobileNav />
    </>
  );
};

export default Header;
