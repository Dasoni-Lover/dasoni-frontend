// src/features/MemorialHome/pages/ProfileEditPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Header from "../../../components/Header";
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

export const ProfileEditPage = () => {
  const nav = useNavigate();
  const location = useLocation();
  const hallId = location.state?.hallId;

  // 상태값
  const [name, setName] = useState("");
  const [birthDate, setBirthDate] = useState(null);
  const [deathDate, setDeathDate] = useState(null);
  const [place, setPlace] = useState("");
  const [phone, setPhone] = useState("");

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
      };

      await updateHallProfile(hallId, body);
      alert("추모관 정보가 수정되었습니다.");
      nav(-1);
    } catch (e) {
      console.error("프로필 수정 실패:", e);
      alert("수정에 실패했습니다.");
    }
  };

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
                <PointText question="고인의 생일을 알려주세요" />
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
                <PointText question="고인의 기일을 알려주세요" />
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
              <Text>고인의 프로필 사진을 업로드해 주세요</Text>
              <EditSmallPhotoBox
                src={profileImageUrl || defaultprofile}
                onFileSelect={handleFileSelect} // File 객체 그대로 전달
              />
            </InputWrapper>

            <InputWrapper>
              <Text>고인을 모신 곳을 알려주세요</Text>
              <InputField
                value={place}
                onChange={(e) => setPlace(e.target.value)}
                placeholder="상세주소를 입력해 주세요"
              />
            </InputWrapper>

            <InputWrapper>
              <Text>개설자의 연락처를 알려주세요</Text>
              <InputField
                value={phone}
                onChange={(e) => setPhone(formatPhone(e.target.value))}
                placeholder="ex) 010-0000-0000"
              />
            </InputWrapper>
          </Box>

          <ButtonWrapper>
            <Button text="저장하기" size="M" onClick={handleSave} />
            <Border>
              <Button text="취소" size="M" color="white" onClick={() => nav(-1)} />
            </Border>
          </ButtonWrapper>
        </Container>
      </ContentBox>
    </Wrapper>
  );
};

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
  align-items: center;
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
