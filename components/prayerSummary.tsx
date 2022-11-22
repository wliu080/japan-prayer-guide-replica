import { FC } from "react";
import { Container, ListGroup } from "react-bootstrap";

interface PrayerSummaryProps {
  summary: string[];
}

const PrayerSummary: FC<PrayerSummaryProps> = ({ summary }) => {
  return (
    <Container className="my-2">
      <ListGroup as="ul">
        <ListGroup.Item as="li" active>
          Prayer Summary
        </ListGroup.Item>
        {summary.map((prayerPoint) => (
          <ListGroup.Item key={prayerPoint} as="li">
            {prayerPoint}
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
};

export { PrayerSummary };
