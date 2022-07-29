import Head from "next/head";
import { getAllStaticPageIds, getStaticContent } from "../lib/markdownPageServer";

export async function getStaticPaths() {
  const paths = getAllStaticPageIds();
  return {
    paths,
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const markdownContent = await getStaticContent(params.markdownPage);
  return {
    props: {
      markdownContent,
    },
  };
}

export default function MarkdownPage({ markdownContent }) {
  return (
    <div>
      <Head>
        <title>{markdownContent.title}</title>
      </Head>
      <article>
        <h1>{markdownContent.subtitle}</h1>
        <div dangerouslySetInnerHTML={{ __html: markdownContent.contentHtml }} />
      </article>
    </div>
  );
}