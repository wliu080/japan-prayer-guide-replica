import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import remarkParse from 'remark-parse';
import remarkHtml from 'remark-html';

const staticPageDirectory = path.join(process.cwd(), 'markdownContent');

// Code based on NextJS posts tutorial

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(staticPageDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get markdownPage
    const markdownPage = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(staticPageDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    // Combine the data with the markdownPage
    return {
      markdownPage,
      ...matterResult.data,
    };
  });
  // Sort posts by date
  return allPostsData.sort(({ date: a }, { date: b }) => {
    if (a < b) {
      return 1;
    } else if (a > b) {
      return -1;
    } else {
      return 0;
    }
  });
}

export function getAllStaticPageIds() {
  const fileNames = fs.readdirSync(staticPageDirectory);

  // Returns an array that looks like this:
  // [
  //   {
  //     params: {
  //       markdownPage: 'about'
  //     }
  //   },
  //   {
  //     params: {
  //       markdownPage: 'toolkit'
  //     }
  //   }
  // ]

  return fileNames.map((fileName) => {
    return {
      params: {
        markdownPage: fileName.replace(/\.md$/, ''),
      },
    };
  });
}

export async function getStaticContent(markdownPage) {
  const fullPath = path.join(staticPageDirectory, `${markdownPage}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert mardown into HTML string
  const processedContent = await remark()
    .use(remarkParse)
    .use(remarkHtml)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the markdownPage
  return {
    markdownPage,
    contentHtml,
    ...matterResult.data,
  };
}