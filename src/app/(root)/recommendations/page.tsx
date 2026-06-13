import { ArrowUpRight, Quote } from "lucide-react";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import PageContainer from "@/components/common/page-container";
import PageHeader from "@/components/common/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { constructMetadata } from "@/lib/metadata";
import { urlFor } from "@/sanity/lib/image";
import { sanityFetch } from "@/sanity/lib/live";
import { RECOMMENDATIONS_QUERY } from "@/sanity/lib/queries";
import type { RECOMMENDATIONS_QUERYResult } from "sanity.types";

export const metadata: Metadata = constructMetadata({
  preTitle: "Recommendations | ",
  title: "People I’ve Collaborated With",
  description:
    "Notes and recommendations from people I’ve worked and collaborated with across projects and teams.",
  keywords: ["Recommendations", "Testimonials", "Colleagues", "Collaborators"],
  image: "/open-graph/recommendation.jpg",
});

type RecommendationCardProps = {
  recommendation: NonNullable<RECOMMENDATIONS_QUERYResult[number]>;
};

const RecommendationCard = ({ recommendation }: RecommendationCardProps) => {
  const initials = recommendation.name
    ?.split(" ")
    .filter(Boolean)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="h-full border-border/60 bg-card shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="space-y-4">
        <Quote className="size-8 text-primary/60" />
        <p className="text-base leading-relaxed text-muted-foreground">
          {recommendation.quote}
        </p>
      </CardHeader>
      <CardContent className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <div className="flex size-12 items-center justify-center overflow-hidden rounded-full border border-border bg-muted">
            {recommendation.avatarUrl ? (
              <Image
                src={urlFor(recommendation.avatarUrl)
                  .width(96)
                  .height(96)
                  .url()}
                alt={recommendation.name ?? "Recommendation author"}
                width={48}
                height={48}
                className="size-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-foreground/70">
                {initials}
              </span>
            )}
          </div>
          <div>
            <p className="font-semibold text-foreground">
              {recommendation.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {[recommendation.role, recommendation.company]
                .filter(Boolean)
                .join(" · ")}
            </p>
            {recommendation.relationship && (
              <p className="text-xs text-muted-foreground/80">
                {recommendation.relationship}
              </p>
            )}
          </div>
        </div>

        {recommendation.profileUrl && (
          <Link
            href={recommendation.profileUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open ${recommendation.name}'s profile`}
            className="inline-flex shrink-0 items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            Profile
            <ArrowUpRight className="size-4" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
};

const RecommendationsPage = async () => {
  const { data: recommendations }: {
    data: RECOMMENDATIONS_QUERYResult;
  } = await sanityFetch({
    query: RECOMMENDATIONS_QUERY,
  });

  return (
    <>
      <PageHeader
        title="Recommendations"
        subtitle="People I’ve worked with, collaborated with, or learned from — and what they chose to share."
      />
      <PageContainer>
        <section className="space-y-6">
          <div className="max-w-3xl space-y-3">
            <p className="text-lg leading-relaxed text-muted-foreground">
              This is not a testimonial wall. It’s a collection of
              recommendations from colleagues and collaborators I’ve had the
              chance to build with.
            </p>
          </div>

          {recommendations.length === 0 ? (
            <p className="text-muted-foreground">
              No recommendations yet — check back after the next collaboration.
            </p>
          ) : (
            <div className="grid gap-4 md:grid-cols-2">
              {recommendations.map((recommendation) => (
                <RecommendationCard
                  key={recommendation._id}
                  recommendation={recommendation}
                />
              ))}
            </div>
          )}
        </section>
      </PageContainer>
    </>
  );
};

export default RecommendationsPage;
