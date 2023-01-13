import Image from "next/image";
import { FC, useRef } from "react";
import { Container } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import { AudioPlayer } from "./audioPlayer";

interface NarrationBlockProps {
  audio: {
    src: string;
    timestamps: number[];
  };
  markdownSections: string[];
}

const NarrationBlock: FC<NarrationBlockProps> = ({ audio, markdownSections }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // when multiple sections are used we need to keep track of total index count across markdown sections
  let pIndex = -1; 

  return (
    <div>
      <AudioPlayer timestamps={audio.timestamps} containerRef={containerRef} />
      <article>
        <Container ref={containerRef} className="narration">
          {markdownSections.map((md, i) => (
            <ReactMarkdown key={i}
            components={{
              // map <p> to also have timestamp data
              p: ({ node, ...props }) => {
                if (node.children[0].tagName === "img") {
                  const image = node.children[0];
                  return (
                    <Image 
                    src={image.properties.src}
                    width="500"
                    height="500"
                    alt={image.properties.alt}
                    />
                  );
                }

                pIndex++;
                return (
                  <p
                    data-timestamp={audio.timestamps ? audio.timestamps[pIndex] : "n/a"}
                    index={pIndex}
                    {...props} />
                );
              },
            }}
          >
            {md}
          </ReactMarkdown>
          ))}
          
        </Container>
      </article>
    </div>
  );
};

export { NarrationBlock };
