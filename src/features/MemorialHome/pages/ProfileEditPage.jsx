import React from 'react'
import styled from 'styled-components'
import Header from "../../../components/Header"
import { color,typo } from '../../../styles/tokens'
import { InputField } from '../../../components/InputField'
import { EditSmallPhotoBox } from '../../../components/photobox/EditSmallPhotoBox'
import photo from "../assets/post-img.png"
import {PointText} from "../../../components/PointText"
import Button from "../../../components/Button"

export const ProfileEditPage = () => {
  return (
    <Wrapper>
        <Header/>
        <ContentBox>
            <Title>고인 정보 수정</Title>
            <Content>
            추모관 개설을 위한 정보를 입력해 주세요.<br />
            추모관에 입장한 사람들이 볼 수 있어요.
            </Content>
            <Container>
                <Box>
                    <InputWrapper>
                    <Text>고인의 성함</Text>
                    <InputField placeholder="고인의 이름을 입력하세요" />
                    </InputWrapper>
                    <InputWrapper>
                    <PointText question={"고인의 생일을 알려주세요"}/>
                    <InputField placeholder="고인의 이름을 입력하세요" />
                    </InputWrapper>
                    <InputWrapper>
                    <PointText question={"고인의 기일을 알려주세요"}/>
                    <InputField/>
                    </InputWrapper>
                    <InputWrapper>
                    <Text>고인의 프로필 사진을 업로드해 주세요</Text>
                    <EditSmallPhotoBox src={photo}/>
                    </InputWrapper>
                    <InputWrapper>
                    <Text>고인을 모신 곳을 알려주세요</Text>
                    <InputField placeholder="상세주소를 입력해 주세요" />
                    </InputWrapper>
                    <InputWrapper>
                    <Text>개설자의 연락처를 알려주세요</Text>
                    <InputField placeholder="ex) 010-0000-0000" />
                    </InputWrapper>
                </Box>
                <ButtonWrapper>
                    <Button text="저장하기" size="M"/>
                    <Button text="취소" size="M" color="white" />
                </ButtonWrapper>
            </Container>
        </ContentBox>
    </Wrapper>
  );
};

const InputWrapper=styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
`

const Text=styled.div`
    display: flex;
    height: 20px;
    width: 50%;
    align-items: center;
  ${typo("bodym2")};
  color: ${color("black.50")};
`

const Wrapper=styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
`

const ContentBox=styled.div`
    margin-top: 4.38rem;
`

const Title=styled.div`
    ${typo("h1")};
    color: black;
    width: 100%;
`
const Content=styled.div`
    ${typo("h4")};
    color: ${color("black.50")};
    margin-top: 12px;
    margin-bottom: 52px;
`

const Container=styled.div`
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
    gap: 5rem;
`

const Box=styled.div`
    display: flex;
    width: 53.9375rem;
    padding: 3.25rem;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 2rem;
    box-sizing: border-box;

    border-radius: 20px;
    background: #FFF;
    box-shadow: 0 2px 8.2px 0 rgba(0, 0, 0, 0.15);
`


const ButtonWrapper=styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 1rem;

    width: 13.75rem;
`