import { getPostData, getAllPostSlugs } from '@/lib/blog';
import type { BlogPost } from '@/lib/types'; // Updated import
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { Container } from '@/components/ui/container';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  try {
    const post = await getPostData(params.slug);
    if (!post) {
      return {
        title: 'Post Not Found | Tech Threads',
        description: 'The blog post you are looking for could not be found.',
      };
    }
    return {
      title: `${post.title} | Tech Threads`,
      description: post.summary,
      openGraph: {
        title: post.title,
        description: post.summary,
        type: 'article',
        publishedTime: post.date,
        authors: [post.author],
        images: post.coverImage ? [{ url: post.coverImage, alt: post.coverImageAlt || post.title }] : [],
        url: `https://sandeepchaudhary.com/blog/${post.slug}`, // Assuming your domain
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.summary,
        images: post.coverImage ? [post.coverImage] : [],
      },
    };
  } catch (error) {
    console.error(`Error generating metadata for slug ${params.slug}:`, error);
    return {
      title: 'Error | Tech Threads',
      description: 'Could not load blog post details.',
    };
  }
}

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths.map(path => ({
    slug: path.params.slug,
  }));
}

// Define the type for the props expected by the BlogPostPage component
interface BlogPostPageProps { params: { slug: string; };}
export default async function BlogPostPage({ params }: BlogPostPageProps): Promise<React.ReactElement> {
  let post: BlogPost;
  try {
    post = await getPostData(params.slug);
  } catch (error) {
    console.error(`Error fetching post data for slug ${params.slug}:`, error);
    notFound(); 
  }

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-20 sm:pt-24"> {/* Increased padding for header offset */}
        <Container id={`blog-post-${post.slug}`} className="max-w-3xl mx-auto">
          <article>
            <header className="mb-8 border-b border-border pb-6">
              <Button variant="outline" size="sm" asChild className="mb-6 shadow hover:shadow-md transition-shadow">
                <Link href="/blog">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Tech Threads
                </Link>
              </Button>
              <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-primary mb-3">{post.title}</h1>
              <div className="text-muted-foreground text-sm sm:text-base flex flex-wrap items-center gap-x-4 gap-y-2">
                <span>By {post.author}</span>
                <span>{format(new Date(post.date), 'MMMM d, yyyy')}</span>
              </div>
              {post.tags && post.tags.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {post.tags.map(tag => (
                    <Badge key={tag} variant="secondary">{tag}</Badge>
                  ))}
                </div>
              )}
            </header>

            {post.coverImage && (
              <div className="relative w-full aspect-[16/9] sm:aspect-[2/1] mb-8 shadow-lg rounded-lg overflow-hidden">
                <Image
                  src={post.coverImage}
                  alt={post.coverImageAlt || post.title}
                  fill
                  className="object-cover"
                  priority 
                  data-ai-hint={post.dataAiHint || "blog cover"}
                />
              </div>
            )}
            
            {post.contentHtml && (
              <div 
                className="prose dark:prose-invert prose-sm sm:prose-base lg:prose-lg xl:prose-xl max-w-none 
                           prose-headings:text-primary prose-a:text-accent prose-a:no-underline hover:prose-a:underline 
                           prose-img:rounded-lg prose-img:shadow-md prose-code:before:content-none prose-code:after:content-none"
                dangerouslySetInnerHTML={{ __html: post.contentHtml }} 
              />
            )}
          </article>
        </Container>
      </main>
      <Footer />
    </div>
  );
}
