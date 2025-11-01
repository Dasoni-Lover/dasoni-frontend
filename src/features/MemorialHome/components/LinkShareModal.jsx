import React from 'react';
import styled from 'styled-components';
import { color, typo } from '../../../styles/tokens';

const LinkShareModal = ({ onClose }) => {
  return (
    <Wrapper>
        <Box>
            <TextWrapper>
                <Text>추모관 링크가 복사되었어요</Text>
                <Content>함께 추모하고 싶은 사람에게 공유해 주세요</Content>
            </TextWrapper>
            <Button onClick={onClose}>확인</Button>
        </Box>
    </Wrapper>
  )
}

export default LinkShareModal;

const Wrapper=styled.div`
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.40);
    backdrop-filter: blur(5.4px);
    position: fixed;
    top: 0;
    left: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2000;
`;

const Box=styled.div`
    display: flex;
    padding: 84px 76px 44px 76px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 88px;
    border-radius: 20px;
    background-color: white;
    box-sizing: border-box;
`;

const TextWrapper=styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 11px;
    align-self: stretch;
`;

const Text=styled.div`
    ${typo("h2")};
    color: ${color("black.80")};
    text-align: center;
`;

const Content=styled.div`
    ${typo("bodym2")};
    color: ${color("black.80")};
    text-align: center;
`;

const Button=styled.div`
    display: flex;
    width: 392px;
    height: 52px;
    padding: 13px 30px;
    justify-content: center;
    align-items: center;
    border-radius: 8px;
    box-sizing: border-box;
    background: var(--70, #313131);
    color: white;
    cursor: pointer;
    box-shadow: 0 0 10px 0 rgba(0, 0, 0, 0.04);
`;
