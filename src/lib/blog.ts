import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

const postsDirectory = path.join(process.cwd(), 'src/content/blog');

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  author: string;
  summary: string;
  coverImage?: string;
  coverImageAlt?: string;
  dataAiHint?: string;
  tags?: string[];
  contentHtml?: string; // For individual post
}

export function getSortedPostsData(): BlogPost[] {
  // Get file names under /src/content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((fileName) => fileName.endsWith('.md')) // Ensure we only process markdown files
    .map((fileName) => {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        slug,
        title: matterResult.data.title as string,
        date: matterResult.data.date as string,
        author: matterResult.data.author as string,
        summary: matterResult.data.summary as string,
        coverImage: matterResult.data.coverImage as string | undefined,
        coverImageAlt: matterResult.data.coverImageAlt as string | undefined,
        dataAiHint: matterResult.data.dataAiHint as string | undefined,
        tags: matterResult.data.tags as string[] | undefined,
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getPostData(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    slug,
    title: matterResult.data.title as string,
    date: matterResult.data.date as string,
    author: matterResult.data.author as string,
    summary: matterResult.data.summary as string,
    coverImage: matterResult.data.coverImage as string | undefined,
    coverImageAlt: matterResult.data.coverImageAlt as string | undefined,
    dataAiHint: matterResult.data.dataAiHint as string | undefined,
    tags: matterResult.data.tags as string[] | undefined,
    contentHtml,
  };
}
