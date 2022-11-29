import { useState, useRef, useEffect } from "react";
import { Button, Col, Container, Form, Navbar, Row } from "react-bootstrap";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";

interface PlayerProps {
  timestamps: number[];
  containerRef: React.RefObject<HTMLDivElement>;
}

const AudioPlayer = ({ timestamps, containerRef }: PlayerProps): React.ReactElement => {
  const [isPlaying, setIsPlaying] = useState(false); // for js-jsx state based changes, nb: it's async
  const [currTime, setCurrTime] = useState(0);
  // stores duration as seconds according to the audio element's duration property, format on display
  const [duration, setDuration] = useState(0);

  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const progressBarRefTop = useRef<HTMLInputElement>(null);
  const progressBarRefBot = useRef<HTMLInputElement>(null);
  const animationFrameRef = useRef<number>(0);

  // vars for dealing with marking the current paragraph
  const CURRENT_CLASS = "current";

  /* useEffect runs given function on val change (2nd param/s), empty ([]) for once on load (but audio may not have loaded yet) 
      Note that useEffect does not update predictably (every single etc), so will be inconsistent for consistent animation
      */
  useEffect(() => {
    if (audioPlayerRef.current !== null && progressBarRefTop.current !== null && progressBarRefBot.current !== null) {
      const audioDuration = Math.floor(audioPlayerRef.current.duration);
      progressBarRefTop.current.max = audioDuration.toString();
      progressBarRefBot.current.max = audioDuration.toString();
      setDuration(audioDuration);
    }
  }, [audioPlayerRef?.current?.onloadedmetadata, audioPlayerRef?.current?.readyState]);

  function formatAsAudioTime(givenTime: number): string {
    const totalSeconds = Math.floor(givenTime);
    const mins = Math.floor(totalSeconds / 60);
    const formattedMins = mins < 10 ? `0${mins}` : mins;
    const secondsRemaining = totalSeconds % 60;
    const formattedSeconds = secondsRemaining < 10 ? `0${secondsRemaining}` : secondsRemaining;
    return `${formattedMins}:${formattedSeconds}`;
  }

  function toggleAudio(): void {
    // should only do anything once we're sure the audioPlayerRef has loaded
    if (audioPlayerRef.current !== null) {
      const shouldPause = isPlaying;
      setIsPlaying(!shouldPause);

      if (!shouldPause) {
        audioPlayerRef.current.play();
        animationFrameRef.current = requestAnimationFrame(whilePlaying);
      } else {
        audioPlayerRef.current.pause();
        cancelAnimationFrame(animationFrameRef.current);
      }
    }
  }

  // update the progressBar to match audio as it's playing
  function whilePlaying(): void {
    if (progressBarRefTop.current !== null && progressBarRefBot.current !== null && audioPlayerRef.current !== null) {
      progressBarRefTop.current.value = audioPlayerRef.current.currentTime.toString();
      progressBarRefBot.current.value = audioPlayerRef.current.currentTime.toString();
      setCurrTime(progressBarRefTop.current.valueAsNumber);
      markCurrParagraph(progressBarRefTop.current.valueAsNumber);
    }
    // requestAnimationFrame will only run once, so it must be recalled again in whilePlaying to keep updating
    animationFrameRef.current = requestAnimationFrame(whilePlaying);
  }

  // Called whenever the user drags the time slider, we want to update the audio to match slider
  function updateAudioTimeTop(): void {
    if (audioPlayerRef.current !== null && progressBarRefTop.current !== null && progressBarRefBot.current !== null) {
      audioPlayerRef.current.currentTime = progressBarRefTop.current.valueAsNumber;
      progressBarRefBot.current.value = progressBarRefTop.current.value;
      setCurrTime(progressBarRefTop.current.valueAsNumber);
      markCurrParagraph(progressBarRefTop.current.valueAsNumber);
    }
  }

  function updateAudioTimeBot(): void {
    if (audioPlayerRef.current !== null && progressBarRefBot.current !== null && progressBarRefTop.current !== null) {
      audioPlayerRef.current.currentTime = progressBarRefBot.current.valueAsNumber;
      progressBarRefTop.current.value = progressBarRefBot.current.value;
      setCurrTime(progressBarRefBot.current.valueAsNumber);
      markCurrParagraph(progressBarRefBot.current.valueAsNumber);
    }
  }

  const markCurrParagraph = (currentTime: number): void => {
    // only run if the page has timestamps provided!
    if (!timestamps) {
      return;
    }

    let sectionId = 0;

    // find which section we are currently in
    while (currentTime > timestamps[sectionId]) {
      if (timestamps[sectionId + 1] && currentTime >= timestamps[sectionId + 1]) {
        sectionId++;
      } else {
        break;
      }
    }

    // mark desired section as current with a class
    if (containerRef.current) {
      const section = containerRef.current.querySelectorAll('p[index="' + sectionId + '"]')[0];
      if (!section.classList.contains(CURRENT_CLASS)) {
        section.classList.add(CURRENT_CLASS);

        // ff: twitchy behaviour, chrome: only scrolls on pause
        // window.scrollTo({
        //   top: section.getBoundingClientRect().y,
        //   behavior: "smooth",
        // });

        section.scrollIntoView({ behavior: "smooth" });
      }
    }

    // clear out class from current(now previous) paragraphId if not initial state
    if (containerRef.current) {
      const notCurrentSection = containerRef.current.querySelectorAll('p[index]:not([index="' + sectionId + '"])');
      notCurrentSection.forEach((pNode) => {
        pNode.classList.remove(CURRENT_CLASS);
      });
    }
  };

  return (
    <Container>
      <audio ref={audioPlayerRef} src="/sample_audio_花も.mp3" preload="metadata"></audio>

      <Row className="align-items-center d-none d-md-flex">
        <Col md={1}>
          <Button onClick={toggleAudio}>{isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}</Button>
        </Col>
        <Col md={1} className="text-end">
          {isNaN(currTime) ? "00:00" : formatAsAudioTime(currTime)}
        </Col>
        <Col md={9}>
          <Form.Range defaultValue={0} ref={progressBarRefTop} onChange={updateAudioTimeTop} />
        </Col>
        <Col md={1}>{isNaN(duration) ? "00:00" : formatAsAudioTime(duration)}</Col>
      </Row>

      <Navbar bg="info" fixed="bottom" className="d-flex d-md-none bg-gradient">
        <Row className="align-items-center">
          <Col sd={1} className="text-end">
            {isNaN(currTime) ? "00:00" : formatAsAudioTime(currTime)}
          </Col>
          <Col sd={10}>
            <Form.Range defaultValue={0} ref={progressBarRefBot} onChange={updateAudioTimeBot} />
          </Col>
          <Col sd={1}>{isNaN(duration) ? "00:00" : formatAsAudioTime(duration)}</Col>
        </Row>
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Brand>
            <Button onClick={toggleAudio}>{isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}</Button>
          </Navbar.Brand>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};

export { AudioPlayer };
