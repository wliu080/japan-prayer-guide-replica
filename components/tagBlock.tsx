import { FC } from "react";
import { Badge, Container } from "react-bootstrap";

interface TagBlockProps {
  tags: string[];
}

const TagBlock: FC<TagBlockProps> = ({ tags }) => {
  return (
    <Container className="mb-1">
      <span>Tags:</span>
      {tags.map((tag) => (
        <a href="#" key={tag}>
          <Badge pill bg="info" className="mx-1">
            {tag}
          </Badge>
        </a>
      ))}
    </Container>
  );
};

export { TagBlock };
