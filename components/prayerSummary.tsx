import { FC } from "react";
import { Accordion, Badge, Container, ListGroup } from "react-bootstrap";

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

      {/* <Accordion defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Accordion.Header>Prayer Summary</Accordion.Header>
          <Accordion.Body>
            <ListGroup>
              {summary.map((prayerPoint) => (
                <ListGroup.Item key={prayerPoint}>{prayerPoint}</ListGroup.Item>
              ))}
            </ListGroup>
          </Accordion.Body>
        </Accordion.Item>
      </Accordion> */}
    </Container>
  );
};

export { PrayerSummary };
