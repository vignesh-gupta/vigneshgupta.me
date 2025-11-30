import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getPostBySlug, getAllPostSlugs } from '@/lib/blog';
import { constructMetadata } from '@/lib/metadata';
import PageContainer from '@/components/common/page-container';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Calendar } from 'lucide-react';
import { ReactNode } from 'react';

interface MDXComponentProps {
  children: ReactNode;
  [key: string]: unknown;
}

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const slugs = getAllPostSlugs();
  return slugs.map((slug) => ({
    slug,
  }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    return constructMetadata({
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    });
  }

  return constructMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: [post.title.toLowerCase().split(' ')].flat(),
  });
}

function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

const mdxComponents = {
  h1: ({ children, ...props }: MDXComponentProps) => (
    <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-6" {...props}>
      {children}
    </h1>
  ),
  h2: ({ children, ...props }: MDXComponentProps) => (
    <h2 className="text-2xl md:text-3xl font-semibold leading-tight mb-4 mt-8" {...props}>
      {children}
    </h2>
  ),
  h3: ({ children, ...props }: MDXComponentProps) => (
    <h3 className="text-xl md:text-2xl font-semibold leading-tight mb-3 mt-6" {...props}>
      {children}
    </h3>
  ),
  p: ({ children, ...props }: MDXComponentProps) => (
    <p className="leading-relaxed mb-4 text-muted-foreground" {...props}>
      {children}
    </p>
  ),
  ul: ({ children, ...props }: MDXComponentProps) => (
    <ul className="list-disc list-inside space-y-2 mb-4 text-muted-foreground" {...props}>
      {children}
    </ul>
  ),
  ol: ({ children, ...props }: MDXComponentProps) => (
    <ol className="list-decimal ml-4 space-y-2 mb-4 text-muted-foreground" {...props}>
      {children}
    </ol>
  ),
  li: ({ children, ...props }: MDXComponentProps) => (
    <li className="leading-relaxed" {...props}>
      {children}
    </li>
  ),
  blockquote: ({ children, ...props }: MDXComponentProps) => (
    <blockquote className="border-l-4 border-primary pl-4 italic my-4 bg-card text-muted-foreground" {...props}>
      {children}
    </blockquote>
  ),
  pre: ({ children, ...props }: MDXComponentProps) => (
    <pre className="bg-card p-4 rounded-lg overflow-x-auto mb-4 text-sm" {...props}>
      {children}
    </pre>
  ),
  a: ({ children, ...props }: MDXComponentProps) => (
    <a className="text-primary hover:text-primary/80 underline underline-offset-2" {...props}>
      {children}
    </a>
  ),
  strong: ({ children, ...props }: MDXComponentProps) => (
    <strong className="font-semibold text-foreground" {...props}>
      {children}
    </strong>
  ),
};

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  return (
    <PageContainer className="max-w-4xl">
      <div className="mb-8">
        <Button variant="ghost" size="sm" className='mb-2 -ml-3' asChild>
          <Link href="/blog" className="inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Blogs
          </Link>
        </Button>
        
        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
          <Calendar size={16} />
          <time dateTime={post.date}>{formatDate(post.date)}</time>
        </div>
        
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold leading-tight mb-4">
          {post.title}
        </h1>
        
        {post.excerpt && (
          <p className="text-lg text-muted-foreground leading-relaxed">
            {post.excerpt}
          </p>
        )}
      </div>

      <article className="prose prose-gray dark:prose-invert max-w-none">
        <MDXRemote source={post.content} components={mdxComponents} />
      </article>

      <div className="mt-12 pt-8 border-t border-border">
        <Button variant="ghost" size="sm" className='mt-2 -ml-3' asChild>
          <Link href="/blog" className="inline-flex items-center gap-2">
            <ArrowLeft size={16} />
            Back to Blogs
          </Link>
        </Button>
      </div>
    </PageContainer>
  );
}