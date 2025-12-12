import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import letterbg from "../assets/letter-bg.svg";

export const SentLetter = ({
  to,
  from,
  value,
  onToChange,
  onFromChange,
  onValueChange,
}) => {
  // 초기 너비의 기본값을 null로 설정하여 렌더링 시 180px 기본값을 명시적으로 사용하게 합니다.
  const [toWidth, setToWidth] = useState(null);
  const [fromWidth, setFromWidth] = useState(null);

  const toMeasureRef = useRef(null);
  const fromMeasureRef = useRef(null);

  // To. 입력 필드 너비 계산 로직
  useEffect(() => {
    let animationFrameId;
    
    const measureWidth = () => {
      if (toMeasureRef.current) {
        // requestAnimationFrame을 사용하여 DOM이 완전히 업데이트된 후 측정
        animationFrameId = requestAnimationFrame(() => {
          // 8px는 padding/margin 등을 고려한 최소 간격
          setToWidth(toMeasureRef.current.offsetWidth + 8);
        });
      }
    };
    
    measureWidth();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [to]);

  // From. 입력 필드 너비 계산 로직 (수정 적용)
  useEffect(() => {
    let animationFrameId;
    
    const measureWidth = () => {
      if (fromMeasureRef.current) {
        // requestAnimationFrame을 사용하여 DOM이 완전히 업데이트된 후 측정
        animationFrameId = requestAnimationFrame(() => {
          // 8px는 padding/margin 등을 고려한 최소 간격
          setFromWidth(fromMeasureRef.current.offsetWidth + 8);
        });
      }
    };
    
    measureWidth();
    
    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [from]);

  return (
    <Container>
      <Row1>
        <Label>To.</Label>
        <InputWrapper>
          <MeasureSpan ref={toMeasureRef}>
            {to || "이름을 입력해 주세요"}
          </MeasureSpan>
          <NameInput
            type="text"
            placeholder="이름을 입력해 주세요"
            value={to}
            onChange={(e) => onToChange(e.target.value)}
            // 너비가 null일 경우 기본값 180px 사용
            style={{ width: `${toWidth !== null ? toWidth : 180}px` }}
            maxLength={15}
          />
        </InputWrapper>
      </Row1>

      <InputBox>
        <Input
          placeholder="전하고 싶은 이야기를 적어주세요."
          value={value}
          onChange={(e) => onValueChange(e.target.value)}
          maxLength={999}
        />
        <Text>{value.length} / 1,000자</Text>
      </InputBox>

      <Row2>
        <Label>From.</Label>
        <InputWrapper>
          <MeasureSpan ref={fromMeasureRef}>
            {from || "이름을 입력해 주세요"}
          </MeasureSpan>
          <NameInput
            type="text"
            placeholder="이름을 입력해 주세요"
            value={from}
            onChange={(e) => onFromChange(e.target.value)}
            // 너비가 null일 경우 기본값 180px 사용
            style={{ width: `${fromWidth !== null ? fromWidth : 180}px`, textAlign: "right" }}
            maxLength={15}
          />
        </InputWrapper>
      </Row2>
    </Container>
  );
};

const Container = styled.div`
  width: 56.25rem;
  height: 32rem;
  box-sizing: border-box;
  border-radius: 0.625rem;
  padding: 0.81rem 1.38rem;

  background-image: url(${letterbg});
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-color: #d9d9d9;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Row1 = styled.div`
  display: flex;
  align-items: center;
  /* Label과 Input 사이의 간격을 좁힘 */
  gap: 0.3rem; 
`;

const Row2 = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  /* From.과 InputWrapper 사이의 간격을 좁힘 */
  gap: 0.3rem;
`;

const Label = styled.div`
  color: var(--80, #0e0e0e);
  font-family: "Nanum OeHarMeoNiGeurSsi";
  font-size: 2rem;
  line-height: 145%;
`;

const InputWrapper = styled.div`
  position: relative;
  display: inline-block;
`;

// 실제 너비 계산용 숨겨진 span (안정성 향상)
const MeasureSpan = styled.span`
  /* visibility: hidden 대신 opacity: 0와 pointer-events: none 사용 */
  opacity: 0;
  pointer-events: none;
  position: absolute;
  white-space: pre;
  font-family: "Nanum OeHarMeoNiGeurSsi";
  font-size: 2rem;
  /* 폰트 렌더링에 영향을 주지 않으면서 숨김 */
`;

const NameInput = styled.input`
  border: none;
  background: transparent;
  outline: none;
  font-family: "Nanum OeHarMeoNiGeurSsi";
  font-size: 2rem;
  color: var(--80, #0e0e0e);
  transition: width 0.15s ease;

  &::placeholder {
    color: ${color("black.80")};
  }
`;

const InputBox = styled.div`
  border-top: 1px solid var(--50, #7a7a7a);
  border-bottom: 1px solid var(--50, #7a7a7a);
  height: 23.125rem;
  padding: 0.94rem 0.5rem;
  margin-bottom: 0.75rem;
  display: flex;
  flex-direction: column;

  /* 스크롤 가능하지만 스크롤바 숨기기 */
  overflow-y: auto;
  overflow-x: hidden;

  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }
`;

const Input = styled.textarea.attrs({ maxLength: 1000 })`
  flex: 1;
  width: 100%;
  resize: none;
  border: none;
  outline: none;
  background: transparent;
  ${typo("bodym2")};
  color: ${color("black.80")};

  /* 스크롤 가능하지만 스크롤바 숨기기 */
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* IE 10+ */
  &::-webkit-scrollbar {
    display: none; /* Chrome, Safari, Opera */
  }

  &::placeholder {
    color: ${color("black.30")};
  }
`;

const Text = styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
  display: flex;
  justify-content: flex-end;
  margin-top: 0.62rem;
`;