// src/features/MemorialHall/pages/ProfileEditPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../../components/header/Header";
import { color, typo } from "../../../styles/tokens";
import { InputField } from "../../../components/InputField";
import { EditSmallPhotoBox } from "../../../components/photobox/EditSmallPhotoBox";
import { PointText } from "../../../components/PointText";
import Button from "../../../components/Button";
import DatePicker from "../../../components/DatePicker";
import { useNavigate, useLocation } from "react-router-dom";
import { updateHallProfile, getHallInfo } from "../../../api/memorial";
import { getPresignedUrlForImage, uploadFileToS3 } from "../../../api/files";
import defaultprofile from "../../../assets/default-profile-icon.svg";
import IconRadioFilled from "../../../assets/icon-radio-filled.svg";
import IconRadioBlank from "../../../assets/icon-radio-blank.svg";
import { Column, Row } from "../../../styles/flex";

export const ProfileEditPage = () => {
  const nav = useNavigate();
  const location = useLocation();
  const hallId = location.state?.hallId;
  console.log("ProfileEditPage hallId:", hallId);

  // 상태값
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [deathDate, setDeathDate] = useState(null);
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");

  // 🔄 검색 허용 여부 (secret = true → 비공개 / false → 공개)
  const [secret, setSecret] = useState(null);

  // 기존 이미지 URL (preview용)
  const [profileImageUrl, setProfileImageUrl] = useState(null);
  // 새로 업로드할 File 객체
  const [profileFile, setProfileFile] = useState(null);

  // YYYY.MM.DD 포맷 변환
  const toDotFormat4 = (date) => {
    if (!date) return null;
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    return `${year}.${month}.${day}`;
  };

  // 전화번호 자동 하이픈 formatting
  const formatPhone = (value) => {
    const num = value.replace(/[^0-9]/g, "");
    if (num.length <= 3) return num;
    if (num.length <= 7) return `${num.slice(0, 3)}-${num.slice(3)}`;
    return `${num.slice(0, 3)}-${num.slice(3, 7)}-${num.slice(7, 11)}`;
  };

  // 기존 데이터 불러오기
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await getHallInfo(hallId);
        const data = res?.data;

        setName(data?.name || "");
        setPlace(data?.place || "");
        setPhone(data?.phone || "");
        setProfileImageUrl(data?.profile || null);
        setBirthDate(data?.birthday || null);
        setDeathDate(data?.deadday || null);

        // 🔄 백엔드의 secret 필드 받아오기 (true: 비공개 / false: 공개)
        setSecret(typeof data?.secret === "boolean" ? data.secret : null);
      } catch (e) {
        console.error("추모관 정보 불러오기 실패:", e);
      }
    };
    if (hallId) fetchData();
  }, [hallId]);

  // File 선택 시 처리 (미리보기 + 상태 저장)
  const handleFileSelect = (file) => {
    if (!file) return;
    setProfileFile(file);
    setProfileImageUrl(URL.createObjectURL(file)); // preview
  };

  // 저장
  const handleSave = async () => {
    let uploadedProfileUrl = profileImageUrl;

    try {
      // 파일이 선택되었으면 S3 업로드
      if (profileFile) {
        const { uploadUrl, fileUrl, contentType } =
          await getPresignedUrlForImage(profileFile);
        await uploadFileToS3(uploadUrl, profileFile, contentType);
        uploadedProfileUrl = fileUrl; // 실제 S3 URL
      }

      const body = {
        profile: uploadedProfileUrl || null,
        name: name || null,
        birthday: birthDate ? toDotFormat4(birthDate) : null,
        deadday: deathDate ? toDotFormat4(deathDate) : null,
        place: place || null,
        phone: phone || null,
        // 🔥 secret 필드 적용
        // 선택 안 했으면 기존값 유지하도록 null 그대로 전달
        secret: typeof secret === "boolean" ? secret : null,
      };

      await updateHallProfile(hallId, body);
      alert("추모관 정보가 수정되었습니다.");
      nav(-1);
    } catch (e) {
      console.error("프로필 수정 실패:", e);
      alert("수정에 실패했습니다.");
    }
  };

  const handleSelectSecret = (value) => setSecret(value);

  return (
    <Wrapper>
      <Header />
      <ContentBox>
        <Title>추모관 정보 수정</Title>
        <Content>
          추모관 개설을 위한 정보를 입력해 주세요.
          <br />
          추모관에 입장한 사람들이 볼 수 있어요.
        </Content>

        <Container>
          <Box>
            <InputWrapper>
              <Text>고인의 성함</Text>
              <InputField
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="성함을 입력해 주세요"
              />
            </InputWrapper>

            <InputWrapper>
              <PointTextWrapper>
                <PointText question="고인의 생일" />
              </PointTextWrapper>
              <DateWrapper>
                <DatePicker
                  selected={birthDate}
                  onChange={setBirthDate}
                  placeholder="YYYY/M/D"
                />
              </DateWrapper>
            </InputWrapper>

            <InputWrapper>
              <PointTextWrapper>
                <PointText question="고인의 기일" />
              </PointTextWrapper>
              <DateWrapper>
                <DatePicker
                  selected={deathDate}
                  onChange={setDeathDate}
                  placeholder="YYYY/M/D"
                />
              </DateWrapper>
            </InputWrapper>

            <InputWrapper>
              <Text>고인의 프로필 사진</Text>
              <EditSmallPhotoBox
                src={profileImageUrl || defaultprofile}
                onFileSelect={handleFileSelect}
              />
            </InputWrapper>

            <InputWrapper>
              <Text>고인을 모신 곳</Text>
              <InputField
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="상세주소를 입력해 주세요"
              />
            </InputWrapper>

            <InputWrapper>
              <Text>개설자 연락처</Text>
              <InputField
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="ex) 010-0000-0000"
              />
            </InputWrapper>

            {/* 🔥 secret 라디오 UI */}
            <InputWrapper>
              <Text>추모관 검색 허용 여부</Text>
              <RadioGroup>
                {/* 공개(검색 허용) → secret: false */}
                <RadioBox onClick={() => handleSelectSecret(false)}>
                  <Row $gap={"1rem"} $align={"start"}>
                    <RadioIcon
                      src={secret === false ? IconRadioFilled : IconRadioBlank}
                    />
                    <Column $gap={"0.125rem"}>
                      <RadioText>검색 허용하기</RadioText>
                      <RadioInfo>
                        다른 이용자가 고인의 이름으로 추모관을 검색해 방문할 수
                        있어요.
                      </RadioInfo>
                    </Column>
                  </Row>
                </RadioBox>

                {/* 비공개(검색 불가) → secret: true */}
                <RadioBox onClick={() => handleSelectSecret(true)}>
                  <Row $gap={"1rem"} $align={"start"}>
                    <RadioIcon
                      src={secret === true ? IconRadioFilled : IconRadioBlank}
                    />
                    <Column $gap={"0.125rem"}>
                      <RadioText>검색 허용하지 않기</RadioText>
                      <RadioInfo>
                        초대 링크를 받은 사람만 추모관에 들어올 수 있어요.
                      </RadioInfo>
                    </Column>
                  </Row>
                </RadioBox>
              </RadioGroup>
            </InputWrapper>
          </Box>

          <ButtonWrapper>
            <Button text="저장하기" size="M" onClick={handleSave} />
            <Border>
              <Button
                text="취소"
                size="M"
                color="white"
                onClick={() => nav(-1)}
              />
            </Border>
          </ButtonWrapper>
        </Container>
      </ContentBox>
    </Wrapper>
  );
};

/* -------- styled-components 그대로 유지하되 isSearchOpen 관련 제거 -------- */

const Wrapper = styled.div`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
`;

const ContentBox = styled.div`
  margin-top: 4.38rem;
`;

const Title = styled.div`
  ${typo("h1")};
  color: black;
  width: 100%;
`;

const Content = styled.div`
  ${typo("h4")};
  color: ${color("black.50")};
  margin-top: 12px;
  margin-bottom: 52px;
`;

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 5rem;
`;

const Box = styled.div`
  display: flex;
  width: 53.9375rem;
  padding: 3.25rem;
  flex-direction: column;
  gap: 2rem;
  border-radius: 20px;
  background: #fff;
  box-shadow: 0 2px 8.2px 0 rgba(0, 0, 0, 0.15);
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 1rem;
`;

const PointTextWrapper = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const DateWrapper = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50%;
`;

const Text = styled.div`
  display: flex;
  height: 20px;
  width: 50%;
  align-items: center;
  ${typo("bodym2")};
  color: ${color("black.50")};
`;

const ButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  width: 13.75rem;
`;

const Border = styled.div`
  width: 100%;
  border-radius: 0.5rem;
  border: 2px solid #e9e9e9;
  background: #fff;
  box-shadow: 0 0 5px rgba(0, 0, 0, 0.04);
`;

const RadioGroup = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: ${color("lightgrey")};
  gap: 1.5rem;
`;

const RadioBox = styled.div`
  cursor: pointer;
`;

const RadioIcon = styled.img``;

const RadioText = styled.div`
  ${typo("bodym")};
  color: ${color("black.70")};
`;

const RadioInfo = styled.div`
  ${typo("bodym")};
  color: ${color("black.30")};
`;
