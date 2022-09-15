import Head from "next/head";
import ReactMarkdown from "react-markdown";
import rehypeSlug from "rehype-slug";
import { getAllStaticPageIds, getStaticContent } from "../lib/markdownPageServer";
import { GetStaticProps, GetStaticPaths } from "next";
import { Container, Stack } from "react-bootstrap";
import Navigation from "../components/navigation";
import AudioPlayer from "../components/audioPlayer";

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
    timestamps: number[];
    markdown: string;
  };
}) {
  return (
    <div>
      <Head>
        <title>{markdownContent.title}</title>
      </Head>
      <Container
        className="cover-hero md-banner"
        fluid
        style={{
          backgroundRepeat: "no-repeat",
        }}
      >
        <Navigation />
        <Stack gap={1} direction="horizontal" className="mx-auto cover">
          <Container className="text-primary text-center text-uppercase">
            <h1 className="display-6">{markdownContent.title}</h1>
          </Container>
        </Stack>
      </Container>
      <Container fluid className="bg-light place-items-center">
        <AudioPlayer />
        <article>
          <h1 className="text-center place-content-center pt-5">{markdownContent.subtitle}</h1>
          <Container>
            {/* rehypeSlug plugin automatically adds ids for sections based on name */}
            <ReactMarkdown
              rehypePlugins={[rehypeSlug]}
              children={markdownContent.markdown}
              includeElementIndex={true}
              components={{
                // map <p> to also have timestamp data
                p: ({ node, ...props }) => <p data-timestamp={props.index !== null ? markdownContent.timestamps[props.index]: 'n/a'} {...props} />,
              }}
            />
            {/* <div className="align-self-center" dangerouslySetInnerHTML={{ __html: markdownContent.contentHtml }} /> */}
          </Container>
        </article>
      </Container>
    </div>
  );
}
