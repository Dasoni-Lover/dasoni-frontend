import React from "react";
import styled from "styled-components";
import { color, typo } from "../../../styles/tokens";
import IconDownload from "../../../assets/icon-download.svg";
import PhotoBox from "../assets/photobox-big.png";
import { Column, Row } from "../../../styles/flex";
import Button from "../../../components/Button";

export default function GenerateComplete() {
  return (
    <Row>
      <Column>
        <Row $justify={"start"}>
          <DownloadButtonWrapper>
            <img src={IconDownload} />
            <DownloadText>다운로드</DownloadText>
          </DownloadButtonWrapper>
        </Row>

        <Row $gap={"2.8rem"} style={{ marginBottom: "13rem" }}>
          <GeneratedImg img={PhotoBox} />
          <Column style={{ width: "24.5rem" }} $justify={"space-between"}>
            <InformText>{`요청하신 사항에 맞추어 \n이미지를 생성했어요`}</InformText>
            <Column $gap={"1.25rem"}>
              <Button
                size="L"
                color="main"
                text="이 이미지로 게시물 작성하기"
              />
              <Button size="L" color="white" text="다시 생성" />
              <Button size="L" color="white" text="취소" />
            </Column>
          </Column>
        </Row>
      </Column>
    </Row>
  );
}

const DownloadButtonWrapper = styled.div`
  cursor: pointer;
  display: flex;
  padding: 0.5rem 1.25rem 0.5rem 1rem;
  align-items: center;
  gap: 0.125rem;
`;

const DownloadText = styled.div`
  ${typo("h4")};
  color: ${color("black.50")};
`;

const GeneratedImg = styled.img`
  width: 32.5rem;
  height: 32.5rem;
  border-radius: 0.4375rem;
  border: 3px solid var(--5, #e9e9e9);
  background: url(<path-to-image>) lightgray 50% / cover no-repeat;
  box-shadow: 0 4px 32px 0 rgba(0, 0, 0, 0.25);
`;

const InformText = styled.div`
  ${typo("h2")};
  color: ${color("black")};
  white-space: pre-line;
`;
