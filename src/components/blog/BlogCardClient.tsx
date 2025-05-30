
"use client";

import Link from 'next/link';
import Image from 'next/image';
import type { BlogPost } from '@/lib/types'; // Updated import
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';
import NProgress from 'nprogress';

interface BlogCardClientProps {
  post: BlogPost;
}

export function BlogCardClient({ post }: BlogCardClientProps) {
  const handleLinkClick = () => {
    NProgress.start();
    // Let Next.js handle navigation, TopProgressBar will handle NProgress.done()
  };

  return (
    <Link href={`/blog/${post.slug}`} passHref legacyBehavior>
      <a className="block group" onClick={handleLinkClick}>
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
  );
}
