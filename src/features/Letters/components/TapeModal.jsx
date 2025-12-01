// TapeModal.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";

import { Letter } from "../components/Letter";

import letterbox from "../assets/letter-wrapper.svg";
import tape from "../assets/tape.svg";
import play from "../../MemorialHall/assets/icon-play.svg";
import foldedletter from "../assets/folded-letter.svg";

export default function TapeModal({ onCancel }) {
  const [isOpened, setIsOpened] = useState(false); // 접힘/펼침 상태

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onCancel();
  };

  const handleFoldClick = () => {
    setIsOpened(true); // 펼치기
  };

  const handleTapeClick = () => {
    if (isOpened) setIsOpened(false); // 다시 접기
  };

  return (
    <Overlay onClick={handleOverlayClick}>
      <Box>
        <LetterWrapper>
          <LetterBox src={letterbox} />

          {/* 접힌 상태: 중앙 tape */}
          {!isOpened && <Tape src={tape} />}

          {/* 펼쳐진 상태: 오른쪽 아래 tape */}
          {isOpened && (
            <TapeOpened src={tape} onClick={handleTapeClick} />
          )}

          {/* 접힌 상태에서만 foldedletter 보임 */}
          {!isOpened && (
            <FoldedLetter src={foldedletter} onClick={handleFoldClick} />
          )}

          {/* 펼쳐진 상태 Letter 표시 */}
          {isOpened && (
            <OpenedLetterWrapper>
              <Letter
                data={{
                  toName: "다예1",
                  content: "안녕",
                  completedAt: "2025-12-01",
                  fromName: "다예2",
                }}
                width="40.75rem"
              />
            </OpenedLetterWrapper>
          )}
        </LetterWrapper>

        <Bar>
          <Play src={play} />
          <Time>00:00 / 00:58</Time>

          <ProgressBarWrapper>
            <ProgressBar />
            <ProgressKnob />
          </ProgressBarWrapper>
        </Bar>
      </Box>
    </Overlay>
  );
}

/* ----------------- 스타일 ------------------ */

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

/* 접힌 상태의 tape (중앙 위치) */
const Tape = styled.img`
  position: absolute;
  top: 8.44rem;
  left: 50%;
  transform: translateX(-50%);
  width: 43.75rem;
  height: 31.33188rem;
  z-index: 10;
`;

/* 펼쳐진 Letter가 표시될 위치 */
const OpenedLetterWrapper = styled.div`
  position: absolute;
  top: 8rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 20;
`;

/* 펼쳐진 상태용 tape (letterbox 기준: 오른쪽 +10.62rem, 아래 +0.7rem) */
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
  gap: 3.125rem;
  border-radius: 0.625rem;
  background: linear-gradient(90deg, #fff1f2 9%, #fff6eb 76%, #ffefe5 100%);
  margin-top: 3.75rem;
  box-sizing: border-box;
`;

const Play = styled.img`
  width: 2.5rem;
  height: 2.1875rem;
`;

const Time = styled.div`
  ${typo("bodym2")};
  color: ${color("black.70")};
`;

const ProgressBarWrapper = styled.div`
  flex: 1;
  height: 0.5rem;
  background: ${color("black.10")};
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
`;

const ProgressBar = styled.div`
  height: 0.5rem;
  width: 31.25rem;
  border-radius: 1.25rem;
  background: #acacac;
`;

const ProgressKnob = styled.div`
  position: absolute;
  top: 50%;
  left: 31.25rem;
  transform: translate(-50%, -50%);
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
`;
