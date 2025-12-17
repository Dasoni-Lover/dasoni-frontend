// src/features/Letters/components/NoneLetter.jsx
import React from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import Button from "../../../components/Button";

export default function NoneLetter({
  text,
  showButton = false,
  onWriteLetter,
  marginTop = "4rem",
}) {
  return (
    <Container marginTop={marginTop}>
      <Text>
        {text.split("\n").map((line, idx) => (
          <React.Fragment key={idx}>
            {line}
            <br />
          </React.Fragment>
        ))}
      </Text>

      {showButton && (
        <Button
          text="편지 쓰러 가기"
          size="M"
          width="14rem"
          icon="add2"
          onClick={onWriteLetter}
        />
      )}
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  width: 68.5rem;
  height: 33.1875rem;
  padding: 13rem 18.75rem;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  gap: 1.1875rem;

  margin-top: ${({ marginTop }) => marginTop};

  border-radius: 1.25rem;
  border: 1px solid #e9e9e9;
  background: #fff4e6;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.02);
`;

const Text = styled.div`
  width: 31rem;
  ${typo("h4")};
  color: ${color("black.50")};
  text-align: center;
`;
