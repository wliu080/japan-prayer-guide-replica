import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const staticPageDirectory = path.join(process.cwd(), 'markdownContent');

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

export async function getStaticContent(markdownPage: String) {
  const fullPath = path.join(staticPageDirectory, `${markdownPage}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse and split between metadata section and markdown content
  const matterResult = matter(fileContents);
  const markdown = matterResult.content;

  // Use remark to convert markdown into HTML string
  // const processedContent = await remark()
  //   .use(remarkParse)
  //   .use(remarkHtml)
  //   .process(matterResult.content);
  // const contentHtml = processedContent.toString();

  // Combine the data with the markdownPage
  return {
    markdownPage,
    markdown,
    ...matterResult.data,
  };
}