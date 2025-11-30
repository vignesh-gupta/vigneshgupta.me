
import Link from "next/link";
import { motion, useMotionValueEvent, useScroll } from "motion/react";

import { navLinks } from "@/lib/constants";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";
import Logo from "./logo";
import { useState } from "react";
import MobileSocialMenu from "./mobile-social-menu";

const MobileNav = () => {
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
    <motion.header
      variants={{
        visible: { y: 0 },
        hidden: { y: 200 },
      }}
      initial={"hidden"}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.2 }}
      className="fixed z-50 md:hidden px-4 bottom-5 inset-x-0 block"
    >
      <div className="container mx-auto flex h-16 w-full max-w-lg items-center justify-between rounded-full border border-white/25 bg-white/25 px-8 backdrop-blur-md dark:border-[#5E5E5E]/20 dark:bg-[#18181D]/30">
        <div className="flex items-center flex-1">
          <Link aria-label="Vignesh Gupta Logo" href="/">
            <Logo width={32} height={32} />
          </Link>
          <nav className="relative flex justify-center flex-1">
            <ul className="m-0 flex list-none items-center gap-5 sm:gap-10 rounded-[6px] p-1 justify-evenly shrink flex-1">
              {navLinks.map((link) => (
                <li key={`nav-link-${link.name}`}>
                  <Tooltip delayDuration={100}>
                    <TooltipTrigger asChild>
                      <Link
                        className="block py-2 text-onyx/70 transition-colors hover:text-onyx dark:text-muted-foreground dark:hover:text-white"
                        href={link.href}
                      >
                        <link.Icon className="size-6" />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent className="border border-white/25 bg-white backdrop-blur-md dark:border-[#5E5E5E]/20 dark:bg-[#18181D] rounded-full">
                      <p>{link.name}</p>
                    </TooltipContent>
                  </Tooltip>
                </li>
              ))}
            </ul>
          </nav>

          <MobileSocialMenu />
          
        </div>
        {/* <div className="hidden items-center gap-4 sm:flex">
          <div className="flex gap-6 text-onyx/70 dark:text-white/70">
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
          </div>
        </div> */}
      </div>
    </motion.header>
  );
};

export default MobileNav;
