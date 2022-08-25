import Head from "next/head";
import { getAllStaticPageIds, getStaticContent } from "../lib/markdownPageServer";
import { GetStaticProps, GetStaticPaths } from "next";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getAllStaticPageIds();
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  if (!params) {
    return {
      props: {},
    };
  }
  const markdownContent = await getStaticContent(params.markdownPage as String);
  return {
    props: {
      markdownContent,
    },
  };
};

export default function MarkdownPage({
  markdownContent,
}: {
  markdownContent: {
    title: string;
    subtitle: string;
    contentHtml: string;
  };
}) {
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
