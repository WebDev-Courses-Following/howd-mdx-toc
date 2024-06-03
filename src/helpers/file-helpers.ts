/**
 * eslint-disable no-await-in-loop
 *
 * @format
 */

/* eslint-disable no-restricted-syntax */
import matter from 'gray-matter';
import fs from 'node:fs/promises';
import path from 'node:path';
import React from 'react';

import { extractMdxHeadings } from './heading-helpers';

const BLOG_POST_DIR_PATH = '/content';

export type BlogPostMetadata = {
  title: string;
  slug: string;
};

export const loadBlogPost = React.cache(async (slug: string) => {
  const rawContent = await readFile(`${BLOG_POST_DIR_PATH}/${slug}.mdx`);
  const { data: frontmatter, content } = matter(rawContent);

  const headings = extractMdxHeadings(content);

  return { headings, frontmatter, content };
});

export const getBlogPostList = async () => {
  const fileNames = await readDirectory(BLOG_POST_DIR_PATH);

  const blogPosts = [];

  for (const fileName of fileNames) {
    const rawContent = await readFile(`${BLOG_POST_DIR_PATH}/${fileName}`);
    const { data: frontmatter } = matter(rawContent);

    blogPosts.push({
      slug: fileName.replace('.mdx', ''),
      title: frontmatter.title,
    });
  }

  return blogPosts;
};

function readFile(localPath: string) {
  return fs.readFile(path.join(process.cwd(), localPath), 'utf8');
}

function readDirectory(localPath: string) {
  return fs.readdir(path.join(process.cwd(), localPath));
}
