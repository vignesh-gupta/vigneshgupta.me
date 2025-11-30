import { Metadata } from "next";
import Link from "next/link";
import { constructMetadata } from "@/lib/metadata";
import { getAllPosts, BlogPostMeta } from "@/lib/blog";
import PageContainer from "@/components/common/page-container";
import PageHeader from "@/components/common/page-header";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";

export const metadata: Metadata = constructMetadata({
  title: "Blog",
  description:
    "My thoughts, experiences, and learnings about web development, design, and technology.",
  keywords: [
    "blog",
    "web development",
    "programming",
    "technology",
    "tutorials",
  ],
});

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function BlogPostCard({ post }: { post: BlogPostMeta }) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-card border-border hover:border-primary/20 flex flex-col">
      <CardHeader className="pb-3">
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
          <Calendar size={16} />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        <h2 className="text-xl font-semibold leading-tight group-hover:text-primary transition-colors">
          {post.title}
        </h2>
      </CardHeader>
      <CardContent className="justify-between flex-1 flex flex-col">
        <p className="text-muted-foreground mb-4 leading-relaxed">
          {post.excerpt}
        </p>
        <Button
          variant="ghost"
          size="sm"
          className="hover:text-white/80 w-fit"
          asChild
        >
          <Link
            href={`/blog/${post.slug}`}
            className="inline-flex items-center gap-1 group/link"
          >
            Read more
            <ArrowRight
              size={16}
              className="transition-transform group-hover/link:translate-x-1"
            />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}

export default function BlogPage() {
  const posts = getAllPosts();

  return (
    <PageContainer>
      <PageHeader
        title="Blog"
        subtitle="My thoughts, experiences, and learnings about web development, design, and technology."
      />

      {posts.length === 0 ? (
        <p className="text-muted-foreground text-lg ">
          No blog posts yet. Check back soon for new content!
        </p>
      ) : (
        <div className="grid gap-2 lg:gap-6 md:grid-cols-2">
          {posts.map((post) => (
            <BlogPostCard key={post.slug} post={post} />
          ))}
        </div>
      )}
    </PageContainer>
  );
}
