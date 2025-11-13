import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import playicon from "../assets/play-icon.svg"
import pauseicon from "../assets/play-icon.svg" // 아직 미생성

export default function VoiceRecord({ file }) {
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const [fileUrl, setFileUrl] = useState("")

  useEffect(() => {
    if (file) {
      const url = URL.createObjectURL(file)
      setFileUrl(url)
      return () => URL.revokeObjectURL(url)
    }
  }, [file])

  const handlePlayPause = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
    } else {
      audioRef.current.play()
    }
    setIsPlaying(!isPlaying)
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const updateTime = () => setCurrentTime(audio.currentTime)
    const setAudioData = () => setDuration(audio.duration || 0)

    audio.addEventListener('timeupdate', updateTime)
    audio.addEventListener('loadedmetadata', setAudioData)

    return () => {
      audio.removeEventListener('timeupdate', updateTime)
      audio.removeEventListener('loadedmetadata', setAudioData)
    }
  }, [])

  const formatTime = (time) => {
    if (isNaN(time)) return '00:00'
    const minutes = Math.floor(time / 60).toString().padStart(2, '0')
    const seconds = Math.floor(time % 60).toString().padStart(2, '0')
    return `${minutes}:${seconds}`
  }

  const handleProgressClick = (e) => {
    const rect = e.target.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const width = rect.width
    const newTime = (clickX / width) * duration
    audioRef.current.currentTime = newTime
  }

  return (
    <Wrapper>
      <Box>
        <Play
          src={isPlaying ? pauseicon : playicon}
          alt="재생 버튼"
          onClick={handlePlayPause}
        />
        <Time>{formatTime(currentTime)} / {formatTime(duration)}</Time>
        <ProgressWrapper onClick={handleProgressClick}>
          <Progress value={duration ? (currentTime / duration) * 100 : 0}>
            <ProgressCircle />
          </Progress>
        </ProgressWrapper>
        <audio ref={audioRef} src={fileUrl} preload="metadata" />
      </Box>
      <ButtonWrapper>
        <Button>파일 수정</Button>
        <Button>파일 삭제</Button>
      </ButtonWrapper>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  padding: 1.875rem 2.5rem;
  justify-content: space-between;
  align-items: center;
  align-self: stretch;
  border-radius: 1.25rem;
  border: 1px solid var(--5, #E9E9E9);
  background: var(--Lightgrey, #F8F8F8);
  box-sizing: border-box;
`

const Box = styled.div`
  width: 26rem;
  height: 4rem;
  display: flex;
  align-items: center;
  flex-shrink: 0;
  border-radius: 1.25rem;
  background: var(--10, #DDD);
  padding: 0 1rem;
  box-sizing: border-box;
`

const Play = styled.img`
  width: 1.3125rem;
  height: 1.125rem;
  transform: rotate(360deg);
  flex-shrink: 0;
  margin-right: 1rem;
  margin-left: 2rem;
  cursor: pointer;
`

const ProgressWrapper = styled.div`
  width: 8.25rem;
  height: 0.4375rem;
  border-radius: 1.25rem;
  background: var(--50, #7A7A7A);
  cursor: pointer;
  position: relative;
  display: flex;
  align-items: center;
`

const Progress = styled.div`
  width: ${(props) => props.value}%;
  height: 100%;
  background-color: #0e0e0e;
  border-radius: 1.25rem;
  transition: width 0.1s linear;
  position: relative;
`

const ProgressCircle = styled.div`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translate(50%, -50%);
  width: 0.8125rem;
  height: 0.8125rem;
  background: #0e0e0e;
  border-radius: 50%;
`

const Time = styled.div`
  color: var(--100, #000);
  font-family: Pretendard;
  font-size: 1rem;
  font-style: normal;
  font-weight: 500;
  line-height: 130%;
  text-align: center;
  margin-right: 1.69rem;
`

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  gap: 1rem;
`

const Button = styled.div`
  display: flex;
  width: 13.75rem;
  height: 2.75rem;
  justify-content: center;
  align-items: center;
  border-radius: 0.3125rem;
  border: 2px solid var(--5, #E9E9E9);
  background: var(--0, #FFF);
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.04);
  cursor: pointer;
`