// src/pages/LeaveLetterPage.jsx
import React, { useState } from "react";
import { useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { color, typo } from "../styles/tokens";
import BarNavigate from "../components/BarNavigate";
import { SentLetter } from "../features/Letters/components/SentLetter";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import { sendLetter } from "../api/letters";
import SideCategoryBox from "../features/Letters/components/SideCategoryBox";
import { getHallInfo } from "../api/memorial";

export const LeaveLetterPage = () => {
    const location = useLocation();
    const hallId = location.state?.hallId;
    const page = location.state?.page;

    // ★ 임시저장 → 전달된 데이터
    const letterData = location.state?.letterData || {};

    const navigate = useNavigate();

    const [letterText, setLetterText] = useState(letterData.content || "");
    const [toName, setToName] = useState(letterData.toName || "");
    const [fromName, setFromName] = useState(letterData.fromName || "");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");

    const isActive =
        letterText.trim().length > 0 &&
        toName.trim().length > 0 &&
        fromName.trim().length > 0;

    const handleOpenModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const [hallName, setHallName] = useState("");

    useEffect(() => {
        if (!hallId) {
            alert("유효하지 않은 추모관입니다.");
            navigate(-1);
            return;
        }

        const fetchHallName = async () => {
            try {
                const info = await getHallInfo(hallId);
                const name = info?.data?.name || info?.name || "";
                setHallName(name);
            } catch (err) {
                console.error("추모관 이름 조회 실패:", err);
            }
        };

        fetchHallName();
    }, [hallId, navigate]);


    // ===== 전달하기 =====
    const handleSendLetter = async () => {
        if (!hallId) return alert("유효하지 않은 추모관입니다.");

        if (!isActive) return alert("편지를 올바르게 작성해 주세요.");

        try {
            await sendLetter(hallId, {
                toName,
                fromName,
                content: letterText,
                isCompleted: true,
            });

            handleOpenModal("submit");
        } catch (err) {
            alert(err.response?.data?.message || "편지 보내기 실패");
        }
    };

    // ===== 임시보관 =====
    const handleTempSave = async () => {
        if (!hallId) return alert("유효하지 않은 추모관입니다.");

        try {
            await sendLetter(hallId, {
                toName,
                fromName,
                content: letterText,
                isCompleted: false,
            });

            handleOpenModal("temp");
        } catch (err) {
            alert(err.response?.data?.message || "임시 저장 실패");
        }
    };

    const handleModalConfirm = () => {
        setIsModalOpen(false);

        if (modalType === "temp") {
            navigate("/saved-letterbox", { state: { hallId, page } });
        } else {
            navigate("/leave-letterbox", { state: { hallId, page } });
        }
    };
    
    // ⭐ 추가: 임시보관함 클릭 → 이동
    const goSavedLetterBox = () => {
        navigate("/saved-letterbox", {
            state: { hallId, page },
        });
    };


    return (
        <Background>
        <Wrapper>
            <NavWrapper>
                <BarNavigate 
                paths={["나의 추모관", "편지쓰기"]} 
                onPathClick={(path) => {
                if (path === "나의 추모관") {
                    // hallId 유지하면서 홈으로 이동
                    navigate("/memorial", { state: { hallId } });
                }
                }}
            />
            </NavWrapper>

            <TextWrapper>
                <Title>나의 소중한 마음을 담아 편지를 써 보세요</Title>
                <Content>
                    이 편지는 당신이 세상을 떠난 후, 사랑하는 이들에게 전해져요
                    <br />
                    말로 다 하지 못한 마음을, 글로 남겨보세요
                </Content>
            </TextWrapper>
            <HoverBox>
                <DescriptionHover>
                    <HoverToolTip>
                        <UnorderedList>
                            <li>{hallName}님의 기일을 챙기는 방식에 대해 적어보세요</li>
                            <li>미처 사과하지 못했거나 풀고 싶은 마음에 대해 적어보세요</li>
                        </UnorderedList>
                    </HoverToolTip>
                    <DescriptionText>무슨 이야기를 적어야 할지 고민되시나요?</DescriptionText>
                </DescriptionHover>
                <SavedButton onClick={goSavedLetterBox}>임시보관함</SavedButton>
            </HoverBox>

            <SentLetter
                to={toName}
                from={fromName}
                value={letterText}
                onToChange={setToName}
                onFromChange={setFromName}
                onValueChange={setLetterText}
            />

            <ButtonWrapper>
                <Button text="임시 보관하기" size="M" color="white" onClick={handleTempSave} />
                <Button text="전달하기" size="M" active={isActive} onClick={handleSendLetter} />
            </ButtonWrapper>

            <ConfirmModal
                isOpen={isModalOpen}
                title={modalType === "temp" ? "편지를 임시 보관했어요" : "편지를 전달했어요"}
                description={
                    modalType === "temp"
                        ? "임시 보관함에서 확인할 수 있어요"
                        : "조금만 기다리면 답장이 올 거예요"
                }
                confirmText={"확인"}
                onConfirm={handleModalConfirm}
            />

            <SideCategoryBox hallId={hallId} page={page} />
        </Wrapper>
        </Background>
    );
};

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;

  background: linear-gradient(
    90deg,
    rgba(255, 241, 242, 0.5) 9.13%,
    rgba(255, 246, 235, 0.5) 76.44%,
    rgba(255, 239, 229, 0.5) 100%
  );
`;


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 68.5rem;
    margin-top: 1.81rem;
    position: relative;
`;

const NavWrapper = styled.div`
    width: 100%;
    display: flex;
    justify-content: flex-start;
`;

const TextWrapper = styled.div`
    width: 100%;
    margin-top: 4.5rem;
    margin-bottom: 0.34rem;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 0.62rem;
`;

const Title = styled.div`
    ${typo("h3")};
    color: ${color("black.70")};
`;

const Content = styled.div`
    ${typo("bodym")};
    color: ${color("black.50")};
`;

const ButtonWrapper = styled.div`
    margin-top: 4.62rem;
    display: flex;
    justify-content: center;
    gap: 1rem;
`;

const HoverBox = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    width: 56.25rem;
    gap: 0.62rem;
    margin-bottom: 1rem;
`;

// 툴팁 컨테이너 스타일 (마우스 오버 시 툴팁이 나타나야 하므로 position: relative)
const DescriptionHover = styled.div`
    display: flex;
    position: relative; /* 툴팁 위치 지정을 위한 기준점 */
    width: 17.5rem;
    height: 2.5rem;
    padding: 0 0.5625rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    border-radius: 0.25rem;
    border: 1px solid #F8E4CA;
    background: linear-gradient(90deg, #FFF1F2 9%, #FFF6EB 76%, #FFEFE5 100%);
    cursor: default;
    
    &:hover > div:first-child {
        opacity: 1;
        visibility: visible;
    }
`;

// 툴팁 텍스트를 감싸는 내부 엘리먼트 (기존 텍스트 내용)
const DescriptionText = styled.div`
    ${typo("body")}; 
    color: ${color("black.70")};
`;

const UnorderedList = styled.ul`
    list-style-type: disc; /* 동그라미 불릿 적용 */
    padding-left: 1.5rem; /* 불릿을 표시하기 위한 들여쓰기 */
    margin: 0;
    
    & li {
        ${typo("bodym")};
        color: ${color("black.70")};
        white-space: nowrap;
        margin-bottom: 0.62rem; 
    }
    
    & li:last-child {
        margin-bottom: 0; /* 마지막 아이템에서는 하단 간격 제거 */
    }
`;


const HoverToolTip = styled.div`
    position: absolute;
    bottom: calc(100% + 0.62rem);
    left: 0; 
    z-index: 10;
    opacity: 0;
    visibility: hidden;
    transition: opacity 0.3s, visibility 0.3s;
    pointer-events: none; 
        width: 25.125rem;
    height: 5rem;

    display: inline-flex;
    height: 5rem;
    padding: 0 0.5625rem; 
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    gap: 0; 
    border-radius: 0.25rem;
    border: 1px solid #F8E4CA;
    background: linear-gradient(90deg, #FFF1F2 9%, #FFF6EB 76%, #FFEFE5 100%);
`;


const SavedButton = styled.div`
    display: flex;
    width: 7.5rem;
    height: 2.5rem;
    padding: 0.4375rem 0.5rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    border-radius: 0.25rem;
    border: 1px solid var(--10, #DDD);
    background: #FFF;
    ${typo("body")};
    color: ${color("black.70")};
    box-sizing: border-box;
    cursor: pointer;
`;