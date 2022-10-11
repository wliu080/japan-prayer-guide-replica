import { FC, useRef } from "react";
import { Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { loadMarkdownFile } from "../services/markdownService";
import { AudioPlayer } from "./audioPlayer";

interface NarrationBlockProps {
  audio: {
    src: string;
    timestamps: number[];
  };
  markdownSections: string[];
  options?: {
    useMultiblockLayout: boolean;
  };
}

const NarrationBlock: FC<NarrationBlockProps> = ({ audio, markdownSections, options }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  if (options?.useMultiblockLayout) {
    // not currently supported
  }
  const markdown = markdownSections[0];

  return (
    <div>
      <AudioPlayer timestamps={audio.timestamps} containerRef={containerRef} />
      <article>
        <Container ref={containerRef} className="narration">
          <ReactMarkdown
            includeElementIndex={true}
            components={{
              // map <p> to also have timestamp data
              p: ({ node, ...props }) => (
                <p
                  data-timestamp={props.index !== undefined && audio.timestamps ? audio.timestamps[props.index] : "n/a"}
                  {...props}
                />
              ),
            }}
          >
            {markdown}
          </ReactMarkdown>
        </Container>
      </article>
    </div>
  );
};

export { NarrationBlock };
