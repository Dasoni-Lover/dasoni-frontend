// src/features/MemorialMyHall/components/VoiceRecord.jsx
import React, { useRef, useState, useEffect } from "react";
import styled from "styled-components";
import playicon from "../assets/icon-play.svg";
import pauseicon from "../assets/icon-pause.svg"; // 아직 미생성
import { color, typo } from "../../../styles/tokens";

export default function VoiceRecord({
  file,
  url,
  onReupload,
  onDelete,
  showTime = true, // ✅ 시간 표시 숨김/표시
  showDelete = true, // ✅ 삭제 버튼 숨김/표시
}) {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [fileUrl, setFileUrl] = useState("");

  useEffect(() => {
    // ✅ file이 있으면 objectURL 생성
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setFileUrl(objectUrl);
      return () => URL.revokeObjectURL(objectUrl);
    }

    // ✅ file은 없고 url만 있으면 그대로 사용
    if (!file && url) {
      setFileUrl(url);
      return;
    }

    // 둘 다 없으면 초기화
    setFileUrl("");
  }, [file, url]);

  // ✅ 소스가 바뀌면 재생 상태/시간 초기화 (안전)
  useEffect(() => {
    setIsPlaying(false);
    setCurrentTime(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  }, [fileUrl]);

  const handlePlayPause = async () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setIsPlaying(true);
    } catch (err) {
      // 자동재생 정책 등으로 실패할 수 있음
      setIsPlaying(false);
    }
  };

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const setAudioData = () => setDuration(audio.duration || 0);

    const handleEnded = () => {
      setIsPlaying(false);
      setCurrentTime(0);
    };

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setAudioData);
    audio.addEventListener("ended", handleEnded);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setAudioData);
      audio.removeEventListener("ended", handleEnded);
    };
  }, []);

  const formatTime = (time) => {
    if (isNaN(time)) return "00:00";
    const minutes = Math.floor(time / 60)
      .toString()
      .padStart(2, "0");
    const seconds = Math.floor(time % 60)
      .toString()
      .padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleProgressClick = (e) => {
    if (!duration) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const newTime = (clickX / width) * duration;

    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  return (
    <Wrapper>
      <Box $showTime={showTime}>
        <Play
          src={isPlaying ? pauseicon : playicon}
          alt="재생 버튼"
          onClick={handlePlayPause}
        />

        {showTime && (
          <Time>
            {formatTime(currentTime)} / {formatTime(duration)}
          </Time>
        )}

        <ProgressWrapper onClick={handleProgressClick}>
          <Progress value={duration ? (currentTime / duration) * 100 : 0}>
            <ProgressCircle />
          </Progress>
        </ProgressWrapper>

        <audio ref={audioRef} src={fileUrl} preload="metadata" />
      </Box>

      <ButtonWrapper>
        {onReupload && <Button onClick={onReupload}>재업로드</Button>}
        {showDelete && onDelete && <Button onClick={onDelete}>삭제</Button>}
      </ButtonWrapper>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  padding: 1.875rem;
  gap: 2rem;
  align-items: center;
  align-self: stretch;
  border-radius: 1.25rem;
  border: 1px solid var(--5, #e9e9e9);
  background: #fff4e6;
  box-sizing: border-box;
`;

const Box = styled.div`
  height: 4rem;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: 0.75rem;
  background: #fff;
  padding: 0 1rem;
  box-sizing: border-box;
`;

const Play = styled.img`
  transform: rotate(360deg);
  flex-shrink: 0;
  margin-right: 1rem;
  cursor: pointer;
`;

const ProgressWrapper = styled.div`
  width: 8.25rem;
  height: 0.4375rem;
  border-radius: 1.25rem;
  background: var(--50, #7a7a7a);
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
`;

const Progress = styled.div`
  width: ${(props) => props.value}%;
  height: 100%;
  background-color: #0e0e0e;
  border-radius: 1.25rem;
  transition: width 0.1s linear;
  position: relative;
`;

const ProgressCircle = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  width: 0.8125rem;
  height: 0.8125rem;
  background: #0e0e0e;
  border-radius: 50%;
`;

const Time = styled.div`
  color: var(--100, #000);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  text-align: center;
  margin-right: 1.69rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
`;

const Button = styled.div`
  display: flex;
  width: 6.25rem;
  height: 2.25rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.3125rem;
  border: 1px solid var(--5, #e9e9e9);
  background: var(--0, #fff);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.04);
  box-sizing: border-box;
  cursor: pointer;
  ${typo("h4")};
  color: ${color("black.70")};
`;
