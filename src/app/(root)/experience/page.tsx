import type { Metadata } from "next";

import PageContainer from "@/components/common/page-container";
import PageHeader from "@/components/common/page-header";
import ExperienceCard from "@/components/pages/experience/experience-card";
import { constructMetadata } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/live";
import { EXPERIENCE_QUERY } from "@/sanity/lib/queries";
import Link from "next/link";

export const metadata: Metadata = constructMetadata({
  preTitle: "Experience | ",
  title: "Professional Journey",
  description:
    "My professional journey and work experience across various companies and roles.",
  image: "/open-graph/experience.jpg",
});

const ExperiencePage = async () => {
  const { data: experiences } = await sanityFetch({
    query: EXPERIENCE_QUERY,
  });

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
              {experiences.map((experience) => (
                <ExperienceCard key={experience._id} experience={experience} />
              ))}
            </div>

            {/* End dot */}
            <div className="relative shrink-0 ml-6">
              <div className="flex items-center justify-center w-4 h-4 rounded-full bg-primary/20" />
            </div>
          </div>

          {/* CTA Section */}
          <div className="p-8 mt-16 text-center border rounded-lg bg-card">
            <h3 className="mb-4 text-xl font-semibold">
              Interested in working together?
            </h3>
            <p className="mb-6 text-muted-foreground">
              I&apos;m always open to discussing new opportunities and
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
