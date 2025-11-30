"use client";

import { Badge } from "@/components/ui/badge";
import { useMediaQuery } from "@/lib/hooks/use-media-query";
import { cn, formatDuration } from "@/lib/utils";
import { urlFor } from "@/sanity/lib/image";
import { PortableText } from "next-sanity";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { EXPERIENCE_QUERYResult } from "sanity.types";

type ExperienceCardProps = {
  experience: NonNullable<EXPERIENCE_QUERYResult[0]>;
};

const ExperienceCard = ({ experience }: ExperienceCardProps) => {
  const isMobile = useMediaQuery("(max-width: 768px)");

  const [isSkillsExpanded, setIsSkillsExpanded] = useState(false);
  const [isDescriptionExpanded, setIsDescriptionExpanded] = useState(false);

  const { period, duration } = formatDuration(
    experience.duration,
    experience.isPresent
  );

  return (
    <div key={experience._id} className="relative flex gap-1 md:gap-4 lg:gap-8">
      {/* Timeline dot */}
      <div className="relative flex items-center justify-center shrink-0 border-4 rounded-full shadow-lg size-16 border-background bg-card">
        {experience.logoUrl ? (
          <Image
            loading="lazy"
            src={urlFor(experience.logoUrl).width(38).height(38).url()}
            blurDataURL={urlFor(experience.logoUrl).width(4).height(4).url()}
            alt={`${experience.company} logo`}
            width={38}
            height={38}
            className="rounded-full"
          />
        ) : (
          <div className="rounded-full size-8 bg-primary/20" />
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 min-w-0 gap-4 p-6 pb-8 border rounded-lg shadow-sm bg-card">
        {/* Header */}
        <div className="flex flex-col gap-2">
          <div className="flex items-start justify-between gap-4">
            <div>
              <h3 className="md:text-lg lg:text-xl font-light text-foreground/60">
                <span className="font-semibold text-foreground">
                  {experience.role}
                </span>{" "}
                @{" "}
                {experience.website ? (
                  <a
                    href={experience.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:underline underline-offset-4"
                  >
                    {experience.company}
                  </a>
                ) : (
                  <span>{experience.company}</span>
                )}
              </h3>
              {experience.location && (
                <p className="text-sm text-muted-foreground">
                  {experience.location}
                </p>
              )}
            </div>
            {experience.isPresent && (
              <Badge
                variant="secondary"
                className="text-green-800 bg-green-100 dark:bg-green-900 dark:text-green-200"
              >
                Current
              </Badge>
            )}
          </div>

          <div className="flex flex-col gap-2 text-sm sm:flex-row sm:items-center text-muted-foreground">
            <span>{period}</span>
            <span className="hidden sm:inline">•</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* Technologies */}
        {experience.technologies && experience.technologies.length > 0 && (
          <div>
            <h4 className="mb-2 text-sm font-medium text-foreground">
              Technologies & Skills
            </h4>
            <div className="flex flex-wrap gap-2">
              {experience.technologies
                .filter((s) => s.name && s.link)
                .map((skill) => (
                  <Link
                    href={skill.link ?? "#"}
                    key={skill._id}
                    target="_blank"
                  >
                    <Badge
                      variant="outline"
                      className="flex items-center gap-1 text-xs hover:bg-secondary"
                    >
                      {skill.iconUrl && (
                        <Image
                          src={skill.iconUrl}
                          alt={skill.name ?? "Skill icon"}
                          width={16}
                          height={16}
                          className="rounded-sm"
                        />
                      )}
                      {skill.name}
                    </Badge>
                  </Link>
                ))
                .slice(0, isSkillsExpanded ? undefined : isMobile ? 4 : 10)}

              {experience.technologies.length > (isMobile ? 4 : 10) && (
                <Badge
                  variant="outline"
                  className="flex items-center gap-1 text-xs hover:bg-secondary"
                  onClick={() => setIsSkillsExpanded((prev) => !prev)}
                >
                  {isSkillsExpanded
                    ? "Show Less"
                    : `+${
                        experience.technologies.length - (isMobile ? 4 : 10)
                      } `}
                </Badge>
              )}
            </div>
          </div>
        )}

        {/* Description */}
        {experience.description && (
          <div className="relative">
            <div
              className={cn(
                "ml-4 prose-sm prose dark:prose-invert max-w-none",
                {
                  "max-h-24 overflow-hidden":
                    isMobile && !isDescriptionExpanded,
                }
              )}
            >
              <PortableText
                value={experience.description}
                components={{
                  list: {
                    bullet: ({ children }) => (
                      <ul className="space-y-1 md:space-y-2 list-disc text-muted-foreground text-sm md:text-base">
                        {children}
                      </ul>
                    ),
                  },
                  listItem: {
                    bullet: ({ children }) => <li>{children}</li>,
                  },
                  block: {
                    normal: ({ children }) => (
                      <p className="mb-2 leading-relaxed text-muted-foreground">
                        {children}
                      </p>
                    ),
                  },
                }}
              />
            </div>

            {/* Fade overlay and expand button for mobile */}
            {isMobile && !isDescriptionExpanded && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-card via-card/80 to-transparent h-12 flex items-end justify-center pb-2">
                <button
                  onClick={() => setIsDescriptionExpanded(true)}
                  className="text-xs text-primary hover:text-primary/80 font-medium"
                >
                  Read more
                </button>
              </div>
            )}

            {/* Show less button for mobile */}
            {isMobile && isDescriptionExpanded && (
              <div className="mt-2 flex justify-center">
                <button
                  onClick={() => setIsDescriptionExpanded(false)}
                  className="text-xs text-primary hover:text-primary/80 font-medium"
                >
                  Show less
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default ExperienceCard;
