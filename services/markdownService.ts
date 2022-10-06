import fs from 'fs';
import path from 'path';

/**
 * Loads markdown file content for a given .md file.
 * Note this uses fs so must be called within getStaticPaths/getStaticProps only
 * @param folderPath 
 * @param filename 
 * @returns 
 */
const loadMarkdownFile = (folderPath: string, filename: string) => {
  const staticPageDirectory = path.join(process.cwd(), folderPath);
  const fullPath = path.join(staticPageDirectory, `${filename}`);
  const fileContents = fs.readFileSync(fullPath, "utf8");

  // todo: do we still need metadata for the markdown files specifically?

  /**
   * // Use gray-matter to parse and split between metadata section and markdown content
   * const matterResult = matter(fileContents);
   * const markdown = matterResult.content;
   * 
   * // Combine the metadata with the markdownPage
   * return {
   *  filename,
   *  markdown,
   *  ...matterResult.data,
   * };
   */
  
  return fileContents;
  
};

export { loadMarkdownFile };
