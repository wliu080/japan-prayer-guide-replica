import { useState, useRef, useEffect } from "react";
import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import styles from "../styles/audioPlayer.module.scss";

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
  const progressBarRef = useRef<HTMLInputElement>(null);
  const animationFrameRef = useRef<number>(0);

  // vars for dealing with marking the current paragraph
  const CURRENT_CLASS = "current";

  /* useEffect runs given function on val change (2nd param/s), empty ([]) for once on load (but audio may not have loaded yet) 
      Note that useEffect does not update predictably (every single etc), so will be inconsistent for consistent animation
      */
  useEffect(() => {
    if (audioPlayerRef.current !== null && progressBarRef.current !== null) {
      const audioDuration = Math.floor(audioPlayerRef.current.duration);
      progressBarRef.current.max = audioDuration.toString();
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
    if (progressBarRef.current !== null && audioPlayerRef.current !== null) {
      progressBarRef.current.value = audioPlayerRef.current.currentTime.toString();
      setCurrTime(progressBarRef.current.valueAsNumber);
      markCurrParagraph(progressBarRef.current.valueAsNumber);
    }
    // requestAnimationFrame will only run once, so it must be recalled again in whilePlaying to keep updating
    animationFrameRef.current = requestAnimationFrame(whilePlaying);
  }

  // Called whenever the user drags the time slider, we want to update the audio to match slider
  function updateAudioTime(): void {
    if (audioPlayerRef.current !== null && progressBarRef.current !== null) {
      audioPlayerRef.current.currentTime = progressBarRef.current.valueAsNumber;
      setCurrTime(progressBarRef.current.valueAsNumber);
      markCurrParagraph(progressBarRef.current.valueAsNumber);
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
      section.classList.add(CURRENT_CLASS);
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

      <Row className="align-items-center">
        <Col xs={1}>
          <Button onClick={toggleAudio}>{isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}</Button>
        </Col>
        <Col xs={1} className="text-end">
          {isNaN(currTime) ? "00:00" : formatAsAudioTime(currTime)}
        </Col>
        <Col xs={9}>
          <Form.Range defaultValue={0} ref={progressBarRef} onChange={updateAudioTime} />
        </Col>
        <Col xs={1}>{isNaN(duration) ? "00:00" : formatAsAudioTime(duration)}</Col>
      </Row>
    </Container>
  );
};

export { AudioPlayer };
