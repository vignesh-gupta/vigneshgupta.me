import { Metadata } from "next";

import PageContainer from "@/components/page/page-container";
import PageHeader from "@/components/page/page-header";
import ExpandableSection from "@/components/uses/expandable-section";
import { constructMetadata } from "@/lib/metadata";
import { sanityFetch } from "@/sanity/lib/live";
import { SKILLS_QUERY } from "@/sanity/lib/queries";

export const metadata: Metadata = constructMetadata({
  preTitle: "Tech Stack | ",
  image: "/open-graph/uses.jpg",
});

type Skill = {
  _id: string;
  category: string | null;
  icon: any;
  name: string | null;
  use: string | null;
  link: string | null;
};

const UsesPage = async () => {
  const { data: skills }: { data: Skill[] } = await sanityFetch({
    query: SKILLS_QUERY,
  });

  // Group skills by category
  const designSkills = skills.filter(
    (skill) => skill.category?.toLowerCase() === "design"
  );

  const techSkills = skills.filter(
    (skill) => skill.category?.toLowerCase() === "technology"
  );

  const toolsSkills = skills.filter(
    (skill) => skill.category?.toLowerCase() === "tools"
  );

  const platformsSkills = skills.filter(
    (skill) => skill.category?.toLowerCase() === "platforms"
  );

  // Combine tools and platforms into "Others"
  const othersSkills = [...toolsSkills, ...platformsSkills];

  return (
    <>
      <PageHeader
        title="Tech Stack"
        subtitle="The techs, dev tools, apps I have used."
      />
      <PageContainer>
        {designSkills.length > 0 && (
          <ExpandableSection title="Design" items={designSkills} />
        )}

        {techSkills.length > 0 && (
          <ExpandableSection title="Technology" items={techSkills} />
        )}

        {othersSkills.length > 0 && (
          <ExpandableSection title="Tools & Platforms" items={othersSkills} />
        )}
      </PageContainer>
    </>
  );
};

export default UsesPage;
