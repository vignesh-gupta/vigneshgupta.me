"use client";

import { useState } from "react";
import { Button } from "../ui/button";
import { socials } from "@/lib/constants";
import { MenuIcon } from "lucide-react";
import Link from "next/link";
import { ThemeSwitch } from "../theme/theme-switch";
import { AnimatePresence } from "motion/react";
import * as motion from "motion/react-client";

const MobileSocialMenu = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  return (
    <div className="relative">
      <Button
        variant="ghost"
        className="size-6 [&_svg]:size-5 hover:bg-transparent"
        size="icon"
        onClick={() => setDropdownOpen((prev) => !prev)}
      >
        <MenuIcon />
      </Button>
      <AnimatePresence initial={false}>
        {dropdownOpen && (
          <motion.div
            className="absolute bottom-10 -right-5 mb-2 rounded-lg border-[1px] border-white/25 bg-white/50 px-8 backdrop-blur-md dark:border-[#5E5E5E]/20 dark:bg-[#18181D]/50 py-3"
            
            variants={{
              visible: { opacity: 1, y: 0, scale: 1 },
              hidden: { opacity: 0, y: 10, scale: 0.95 },
            }}
            initial={"hidden"}
            animate={"visible"}
            exit={"hidden"}
            transition={{ duration: 0.2 }}
          >
            <div className="flex gap-4">
              {socials.map((social) => (
                <Link
                  key={`mobile-social-${social.name}`}
                  className="group transition hover:text-onyx dark:hover:text-white"
                  target="_blank"
                  aria-label={social.name}
                  href={social.href}
                  onClick={() => setDropdownOpen(false)}
                >
                  <social.icon className="size-6" />
                </Link>
              ))} 

              {/* Create a vertical separator */}
              <div className="w-[1px] h-6 bg-white/25 dark:bg-[#5E5E5E]/20" />
              <ThemeSwitch onClick={()=> setDropdownOpen(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MobileSocialMenu;
