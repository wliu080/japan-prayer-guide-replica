import { useState, useRef, useEffect } from 'react';
import { Button, Container } from 'react-bootstrap';
import { BsFillPlayFill, BsFillPauseFill } from 'react-icons/bs';
import styles from '../styles/audioPlayer.module.scss'

export default function AudioPlayer() {
    const [isPlaying, setIsPlaying] = useState(false); // for js-jsx state based changes, nb: it's async
    const [duration, setDuration] = useState("00:00");

    const audioPlayer = useRef(); // points to an element for js manipulation / access
    
    /* useEffect runs given function at (2nd param) interval, 
       [] for once on load (but audio may not have loaded yet) */
    useEffect(() => {
        const audioDuration = audioPlayer.current.duration;
        setDuration(formatAsAudioTime(audioDuration));
    }, [audioPlayer?.current?.loadedmetadata, audioPlayer?.current?.readyState]);

    function formatAsAudioTime(givenTime) {
        const totalSeconds = Math.floor(givenTime);
        const mins = Math.floor(totalSeconds/60);
        const secondsRemaining = totalSeconds%60;
        return `${mins}:${secondsRemaining}`;
    }

    function toggleAudio() {
        const shouldPause = isPlaying;
        setIsPlaying(!shouldPause);

        if (!shouldPause) {
            audioPlayer.current.play();
        } else {
            audioPlayer.current.pause();
        }
        
    }

    return (
        <Container>
            <audio ref={audioPlayer} src="/sample_audio_花も.mp3" preload="metadata"></audio>
            <Button onClick={toggleAudio}>{ isPlaying ? <BsFillPauseFill/> : <BsFillPlayFill/> }</Button>
            <div>0:00</div>
            <div><input type="range"/></div>
            <div>{duration}</div>
        </Container>
    );
}