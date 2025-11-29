"use client";

import { useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "lucide-react";
import UsesCard from "./uses-card";
import { Button } from "@/components/ui/button";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

type Skill = {
  _id: string;
  category: string | null;
  icon: SanityImageSource | null;
  name: string | null;
  use: string | null;
  link: string | null;
};

type ExpandableSectionProps = {
  title?: string;
  items: Skill[];
};

const ExpandableSection = ({ title, items }: ExpandableSectionProps) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const visibleItems = isExpanded ? items : items.slice(0, 3);
  const hasMoreItems = items.length > 3;

  return (
    <section className={title && "mb-12"}>
      <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
        {title && <h2 className="text-3xl font-bold md:text-5xl">{title}</h2>}
        {hasMoreItems && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center gap-2 transition-all duration-200 bg-transparent border-muted-foreground/20 text-muted-foreground hover:bg-muted-foreground/10 hover:text-foreground"
          >
            {isExpanded ? (
              <>
                Show Less
                <ChevronUpIcon className="w-4 h-4" />
              </>
            ) : (
              <>
                Show More
                <ChevronDownIcon className="w-4 h-4" />
              </>
            )}
          </Button>
        )}
      </div>

      <div
        className={`grid grid-cols-1 gap-4 md:grid-cols-3 transition-all duration-500 ease-in-out ${
          isExpanded ? "opacity-100" : "opacity-100"
        }`}
      >
        {visibleItems.map(({ _id, category, icon, name, use, link }) => {
          if (!category || !icon || !name || !use || !link) {
            console.log({
              _id,
              category,
              icon,
              name,
              use,
              link,
            });
            return null;
          }

          return (
            <div
              key={_id}
              className={`transition-all duration-300 ease-in-out ${
                isExpanded &&
                items.indexOf(visibleItems.find((item) => item._id === _id)!) >=
                  3
                  ? "animate-fade-in"
                  : ""
              }`}
            >
              <UsesCard image={icon} title={name} url={link} use={use} />
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default ExpandableSection;
