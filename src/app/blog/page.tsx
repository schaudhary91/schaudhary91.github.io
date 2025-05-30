
import Link from 'next/link';
import Image from 'next/image';
import { getSortedPostsData } from '@/lib/blog';
import type { BlogPost } from '@/lib/types'; // Updated import
import { Container } from '@/components/ui/container';
import { SectionTitle } from '@/components/ui/SectionTitle';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BlogCardClient } from '@/components/blog/BlogCardClient';

export const metadata = {
  title: 'Tech Threads | Sandeep Chaudhary',
  description: 'A collection of thoughts, tutorials, and insights on web development, UX engineering, and technology by Sandeep Chaudhary.',
};

export default async function BlogIndexPage() {
  const allPosts: BlogPost[] = getSortedPostsData();

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow pt-20 sm:pt-24"> {/* Increased padding for header offset */}
        <Container id="blog-index">
          <SectionTitle subtitle="Thoughts, tutorials, and insights on web development, UX engineering, and technology.">
            Tech Threads
          </SectionTitle>
          
          {allPosts.length === 0 ? (
            <p className="text-center text-muted-foreground">Loading posts or no posts yet. Check back soon!</p>
          ) : (
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {allPosts.map((post: BlogPost) => (
                <BlogCardClient key={post.slug} post={post} />
              ))}
            </div>
          )}
        </Container>
      </main>
      <Footer />
    </div>
  );
}
