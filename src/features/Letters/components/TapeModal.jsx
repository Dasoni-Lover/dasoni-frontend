import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";

import { Letter } from "../components/Letter";
import letterbox from "../assets/letter-wrapper.svg";
import tape from "../assets/tape.svg";
import foldedletter from "../assets/folded-letter.svg";
import playIcon from "../assets/play-icon.svg";
import pauseIcon from "../assets/pause-icon.svg";

export default function TapeModal({ onCancel, data }) {
  const [isOpened, setIsOpened] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);

  // 오버레이 클릭
  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  const handleFoldClick = () => setIsOpened(true);
  const handleTapeClick = () => setIsOpened(false);

  // 오디오 재생/일시정지
  const togglePlay = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  // 오디오 진행 상태 업데이트
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateProgress = () => {
      setCurrentTime(audio.currentTime);
      setDuration(audio.duration || 0);
      setProgress((audio.currentTime / (audio.duration || 1)) * 100);
    };

    const handleEnded = () => setIsPlaying(false);

    audio.addEventListener("timeupdate", updateProgress);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateProgress);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  // 재생바 클릭 이동
  const handleProgressClick = (e) => {
    if (!audioRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newTime = (clickX / rect.width) * (audioRef.current.duration || 0);
    audioRef.current.currentTime = newTime;
  };

  const formatTime = (time) => {
    if (!time) return "00:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Box>
        <LetterWrapper>
          <LetterBox src={letterbox} />
          {!isOpened && <Tape src={tape} />}
          {isOpened && <TapeOpened src={tape} onClick={handleTapeClick} />}
          {!isOpened && <FoldedLetter src={foldedletter} onClick={handleFoldClick} />}
          {isOpened && data && (
            <OpenedLetterWrapper>
              <Letter
                data={{
                  toName: data.toName,
                  fromName: data.fromName,
                  content: data.content || "(내용 없음)",
                  completedAt: data.createdAt,
                }}
                width="40.75rem"
              />
            </OpenedLetterWrapper>
          )}
        </LetterWrapper>

        {data?.audioUrl && (
          <Bar>
          <PlayButton onClick={togglePlay} isPlaying={isPlaying}>
  <img src={isPlaying ? pauseIcon : playIcon} alt="play-pause" />
</PlayButton>


            <TimeText>
              {formatTime(currentTime)} / {formatTime(duration)}
            </TimeText>
            <ProgressBarWrapper onClick={handleProgressClick}>
              <ProgressBar style={{ width: `${progress}%` }} />
              <ProgressKnob style={{ left: `${progress}%` }} />
            </ProgressBarWrapper>
            <audio ref={audioRef} src={data.audioUrl} />
          </Bar>
        )}
      </Box>
    </Overlay>
  );
}

// Styled Components
const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: flex-start;
  justify-content: center;
  z-index: 3000;
`;

const Box = styled.div`
  width: 51.25rem;
  margin-top: 7.5rem;
  display: flex;
  flex-direction: column;
`;

const LetterWrapper = styled.div`
  position: relative;
  width: 50rem;
  height: 43.75rem;
`;

const LetterBox = styled.img`
  width: 100%;
  height: 100%;
`;

const Tape = styled.img`
  position: absolute;
  top: 8.44rem;
  left: 50%;
  transform: translateX(-50%);
  width: 43.75rem;
  height: 31.33188rem;
  z-index: 10;
`;

const OpenedLetterWrapper = styled.div`
  position: absolute;
  top: 8rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
`;

const TapeOpened = styled.img`
  position: absolute;
  bottom: -0.7rem;
  right: -10.63rem;
  width: 12.5rem;
  height: 8.95194rem;
  aspect-ratio: 200.00/143.23;
  cursor: pointer;
  z-index: 30;
`;

const FoldedLetter = styled.img`
  position: absolute;
  right: -5.81rem;
  bottom: -2.63rem;
  width: 12.5rem;
  height: 12.5rem;
  aspect-ratio: 1/1;
  z-index: 11;
  cursor: pointer;
`;

const Bar = styled.div`
  display: flex;
  width: 51.25rem;
  height: 7.5rem;
  padding: 2.5rem 1.8125rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  border-radius: 0.625rem;
  background: linear-gradient(90deg, #fff1f2 9%, #fff6eb 76%, #ffefe5 100%);
  margin-top: 3.75rem;
  box-sizing: border-box;
`;

const PlayButton = styled.button`
  border: none;
  background: none;
  cursor: pointer;
  width: 2.5rem;
  height: 2.5rem;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: ${({ isPlaying }) => (isPlaying ? "3rem" : "100%")};
    height: ${({ isPlaying }) => (isPlaying ? "3rem" : "100%")};
    object-fit: contain; // 영역을 벗어나지 않고 가운데 정렬
  }
`;


const TimeText = styled.div`
  ${typo("bodym2")};
  color: ${color("black.70")};
  min-width: 6rem;
  text-align: center;
`;

const ProgressBarWrapper = styled.div`
  background: ${color("black.10")};
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  cursor: pointer;
  width: 31.25rem;  
  height: 0.5rem;
  overflow: visible;
`;

const ProgressBar = styled.div`
  height: 100%;
  background: #acacac;
   border-radius: 1rem;
`;

const ProgressKnob = styled.div`
  position: absolute;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: #313131;
`;
