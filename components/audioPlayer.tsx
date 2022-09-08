import { useState, useRef, useEffect } from "react";
import { Button, Container } from "react-bootstrap";
import { BsFillPlayFill, BsFillPauseFill } from "react-icons/bs";
import styles from "../styles/audioPlayer.module.scss";

export default function AudioPlayer(): React.ReactElement {
  const [isPlaying, setIsPlaying] = useState(false); // for js-jsx state based changes, nb: it's async
  const [currTime, setCurrTime] = useState(0);
  // stores duration as seconds according to the audio element's duration property, format on display
  const [duration, setDuration] = useState(0);

  const audioPlayerRef = useRef<HTMLAudioElement>(null);
  const progressBarRef = useRef<HTMLInputElement>(null);

  /* useEffect runs given function at (2nd param) interval, 
       [] for once on load (but audio may not have loaded yet) */
  useEffect(() => {
    if (audioPlayerRef.current !== null && progressBarRef.current !== null) {
      const audioDuration = Math.floor(audioPlayerRef.current.duration);
      progressBarRef.current.max = audioDuration.toString();
      setDuration(audioDuration);
    }
  }, [audioPlayerRef?.current?.loadedmetadata, audioPlayerRef?.current?.readyState]);

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
      } else {
        audioPlayerRef.current.pause();
      }
    }
  }

  // Called whenever the user drags the time slider
  function updateAudioTime(): void {
    if (audioPlayerRef.current !== null && progressBarRef.current !== null) {
        audioPlayerRef.current.currentTime = progressBarRef.current.valueAsNumber;
        setCurrTime(progressBarRef.current.valueAsNumber)
    }
  }

  return (
    <Container>
      <audio ref={audioPlayerRef} src="/sample_audio_花も.mp3" preload="metadata"></audio>
      <Button onClick={toggleAudio}>{isPlaying ? <BsFillPauseFill /> : <BsFillPlayFill />}</Button>
      <div>{isNaN(currTime) ? "00:00" : formatAsAudioTime(currTime)}</div>
      <div>
        <input type="range" defaultValue={0} ref={progressBarRef} onChange={updateAudioTime}/>
      </div>
      <div>{isNaN(duration) ? "00:00" : formatAsAudioTime(duration)}</div>
    </Container>
  );
}
