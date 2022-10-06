import Head from "next/head";
import { getTopicPageIds, getTopicMetadata } from "../../services/staticTopicLoader";
import { GetStaticProps, GetStaticPaths } from "next";
import { Container, Stack } from "react-bootstrap";
import Navigation from "../../components/navigation";
import { NarrationBlock } from "../../components/narrationBlock";
import { loadMarkdownFile } from "../../services/markdownService";

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = getTopicPageIds();

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
  const topicMetadata = await getTopicMetadata(params.topicPage as String);
  let markdownSections: string[] = [];
  topicMetadata.contentFilename.forEach((fileName: string) => {
    markdownSections.push(loadMarkdownFile(topicMetadata.folderPath, fileName));
  })
  topicMetadata.markdownSections = markdownSections;

  return {
    props: {
      topicMetadata,
    },
  };
};

export default function TopicPage({
  topicMetadata,
}: {
  topicMetadata: {
    title: string;
    summary: string[];
    audio: {
      src: string;
      timestamps: number[];
    };
    markdownSections: string[];
    tags: string[];
  };
}) {
  console.log("onPage", topicMetadata);
  return (
    <div>
      <Head>
        <title>{topicMetadata.title}</title>
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
            <h1 className="display-6">{topicMetadata.title}</h1>
          </Container>
        </Stack>
      </Container>
      {/* <PrayerSummary /> */}
      <Container fluid className="bg-light place-items-center">
        <NarrationBlock
          markdownSections={topicMetadata.markdownSections}
          audio={topicMetadata.audio}
        />
      </Container>
      {/* <TagsBar tags={tags}/> */}
    </div>
  );
}
