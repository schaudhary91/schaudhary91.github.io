import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData, type BlogPost } from '@/lib/blog';
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';

export const metadata = {
  title: 'Tech Threads | Sandeep Chaudhary',
  description: 'A collection of thoughts, tutorials, and insights on web development, UX engineering, and technology by Sandeep Chaudhary.',
};

export default function BlogIndexPage() {
  const allPosts = getSortedPostsData();

  return (
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow pt-20 sm:pt-24"> {/* Increased padding for header offset */}
        <Container id="blog-index">
          <SectionTitle subtitle="Thoughts, tutorials, and insights on web development, UX engineering, and technology.">
            Tech Threads
          </SectionTitle>
          
          {allPosts.length === 0 ? (
            <p className="text-center text-muted-foreground">No blog posts yet. Check back soon!</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allPosts.map((post: BlogPost) => (
                <Link key={post.slug} href={`/blog/${post.slug}`} passHref legacyBehavior>
                  <a className="block group">
                    <Card className="h-full flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 bg-card">
                      {post.coverImage && (
                        <div className="relative w-full h-48">
                          <Image
                            src={post.coverImage}
                            alt={post.coverImageAlt || post.title}
                            fill
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                            data-ai-hint={post.dataAiHint || "blog cover"}
                          />
                        </div>
                      )}
                      <CardHeader>
                        <CardTitle className="text-xl group-hover:text-accent transition-colors">{post.title}</CardTitle>
                        <CardDescription className="text-sm text-muted-foreground">
                          {format(new Date(post.date), 'MMMM d, yyyy')} by {post.author}
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="flex-grow">
                        <p className="text-sm text-foreground/80 mb-4">{post.summary}</p>
                        {post.tags && post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-auto pt-2">
                            {post.tags.map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs">{tag}</Badge>
                            ))}
                          </div>
                        )}
                      </CardContent>
                    </Card>
                  </a>
                </Link>
              ))}
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
