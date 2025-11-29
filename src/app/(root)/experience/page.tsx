import { PortableText } from "@portabletext/react";
import { Metadata } from "next";
import Image from "next/image";

import PageContainer from "@/components/page/page-container";
import PageHeader from "@/components/page/page-header";
import { Badge } from "@/components/ui/badge";
import { constructMetadata } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/live";
import { EXPERIENCE_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";
import { urlFor } from "@/sanity/lib/image";

export const metadata: Metadata = constructMetadata({
  preTitle: "Experience | ",
  title: "Professional Journey",
  description:
    "My professional journey and work experience across various companies and roles.",
  image: "/open-graph/experience.jpg",
});

const ExperiencePage = async () => {
  const { data: experiences = [] } = await sanityFetch({
    query: EXPERIENCE_QUERY,
  });

  const formatDuration = (duration: any, isPresent: boolean | null) => {
    const start = new Date(duration.start);
    const end = isPresent ? new Date() : new Date(duration.end);

    const startMonth = start.toLocaleDateString("en-US", { month: "short" });
    const startYear = start.getFullYear();
    const endMonth = end.toLocaleDateString("en-US", { month: "short" });
    const endYear = end.getFullYear();

    const months =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;

    let durationText = "";
    if (years > 0) {
      durationText += `${years} yr${years > 1 ? "s" : ""}`;
    }
    if (remainingMonths > 0) {
      if (durationText) durationText += " ";
      durationText += `${remainingMonths} mo${remainingMonths > 1 ? "s" : ""}`;
    }

    const period = isPresent
      ? `${startMonth} ${startYear} - Present`
      : `${startMonth} ${startYear} - ${endMonth} ${endYear}`;

    return { period, duration: durationText || "1 mo" };
  };

  return (
    <>
      <PageHeader
        title="Professional Journey"
        subtitle="My work experience and career progression."
      />
      <PageContainer>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-8 top-0 bottom-0 w-[2px] bg-gradient-to-b from-primary/50 via-primary/30 to-transparent" />

            {/* Experience items */}
            <div className="space-y-12">
              {experiences.map((experience) => {
                const { period, duration } = formatDuration(
                  experience.duration,
                  experience.isPresent
                );

                return (
                  <div key={experience._id} className="relative flex gap-8">
                    {/* Timeline dot */}
                    <div className="relative flex items-center justify-center flex-shrink-0 border-4 rounded-full shadow-lg size-16 border-background bg-card">
                      {experience.logoUrl ? (
                        <Image
                          src={urlFor(experience.logoUrl)
                            .width(38)
                            .height(38)
                            .url()}
                          blurDataURL={urlFor(experience.logoUrl)
                            .width(10)
                            .height(10)
                            .url()}
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
                            <h3 className="text-xl font-light text-foreground/60">
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
                            <div className="flex flex-col gap-1">
                              {experience.location && (
                                <p className="text-sm text-muted-foreground">
                                  {experience.location}
                                </p>
                              )}
                            </div>
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
                      {experience.technologies &&
                        experience.technologies.length > 0 && (
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
                                          width={12}
                                          height={12}
                                          className="rounded-sm"
                                        />
                                      )}
                                      {skill.name}
                                    </Badge>
                                  </Link>
                                ))}
                            </div>
                          </div>
                        )}

                      {/* Description */}
                      {experience.description && (
                        <div className="ml-4 prose-sm prose dark:prose-invert max-w-none">
                          <PortableText
                            value={experience.description}
                            components={{
                              list: {
                                bullet: ({ children }) => (
                                  <ul className="space-y-2 leading-relaxed list-disc text-muted-foreground">
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
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            {/* End dot */}
            <div className="relative flex-shrink-0 ml-6">
              <div className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/20" />
            </div>
          </div>

          {/* CTA Section */}
          <div className="p-8 mt-16 text-center border rounded-lg bg-card">
            <h3 className="mb-4 text-xl font-semibold">
              Interested in working together?
            </h3>
            <p className="mb-6 text-muted-foreground">
              I'm always open to discussing new opportunities and
              collaborations.
            </p>
            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a
                href="/contact"
                className="inline-flex items-center justify-center px-6 py-3 font-medium transition-colors rounded-lg bg-primary text-primary-foreground hover:bg-primary/90"
              >
                Get in touch
              </a>
              <Link
                prefetch={false}
                href={"/resume.pdf"}
                target="_blank"
                className="inline-flex items-center justify-center px-6 py-3 font-medium transition-colors border rounded-lg border-border text-foreground hover:bg-accent"
              >
                View Resume
              </Link>
            </div>
          </div>
        </div>
      </PageContainer>
    </>
  );
};

export default ExperiencePage;
