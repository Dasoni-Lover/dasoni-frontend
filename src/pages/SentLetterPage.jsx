// src/pages/SentLetterPage.jsx
import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import { color, typo } from "../styles/tokens";
import BarNavigate from "../components/BarNavigate";
import { SentLetter } from "../features/Letters/components/SentLetter";
import Button from "../components/Button";
import ConfirmModal from "../components/ConfirmModal";
import { sendLetter } from "../api/letters";
import { getHallInfo } from "../api/memorial";
import SideCategoryBox from "../features/Letters/components/SideCategoryBox";
import bgicon from "../features/Letters/assets/bg-icon.svg";


export const SentLetterPage = () => {
    const location = useLocation();
    const hallId = location.state?.hallId;
    const isWanted = location.state?.isWanted;
    const page = location.state?.page;
    const navigate = useNavigate();

    const [letterText, setLetterText] = useState("");
    const [toName, setToName] = useState("");
    const [fromName, setFromName] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [modalType, setModalType] = useState("");

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

    const isActive =
        letterText.trim().length >0 &&
        toName.trim().length > 0 &&
        fromName.trim().length > 0;

    const handleOpenModal = (type) => {
        setModalType(type);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);

    const handleTempSave = async () => {
        try {
            await sendLetter(hallId, {
                toName,
                fromName,
                content: letterText,
                isCompleted: false,
                isWanted: isWanted,
            });

            handleOpenModal("temp");
        } catch (err) {
            console.error("임시보관 실패:", err.response?.data || err);
            alert(err.response?.data?.message || "임시보관 실패");
        }
    };

    const handleSendLetter = async () => {
        if (!isActive || isSubmitting) return;

        setIsSubmitting(true); // 🔒 버튼 즉시 비활성

        try {
            await sendLetter(hallId, {
                toName,
                fromName,
                content: letterText,
                isCompleted: true,
                isWanted: isWanted,
            });

            handleOpenModal("submit");
        } catch (err) {
            const msg = err.response?.data?.message;

            if (msg === "이미 편지를 보냈어요") {
                alert("오늘 이미 편지를 보냈어요.");
            } else {
                alert(msg || "편지 보내기 실패");
            }

            setIsSubmitting(false); // ❗ 실패 시 다시 활성화
        }
    };


    const handleModalConfirm = () => {
        setIsModalOpen(false);

        navigate("/sent-letterbox", {
            state: {
                hallId,
                page,
                activeMenu: "sent",
            },
        });
    };
    
    const goSavedLetterBox = () => {
        navigate("/saved-letterbox", {
            state: { hallId, page },
        });
    };


    const hallTitle = hallName ? `故 ${hallName}의 추모관` : "故 추모관";

    return (
        <Background>
            <BGIcon src={bgicon} alt="" />
        <Wrapper>
            <NavWrapper>
                <BarNavigate 
                paths={["홈", hallTitle, "편지쓰기"]} 
                onPathClick={(path) => {
                if (path === "홈") {
                    // hallId 유지하면서 홈으로 이동
                    navigate("/home", { state: { hallId } });
                }else if (path === hallTitle){
                    navigate("/memorial", { state: { hallId } });
                }
                }}
            />
            </NavWrapper>

            <TextWrapper>
                <Title>나의 소중한 마음을 담아 편지를 써 보세요</Title>
                <Content>
                    고인께 전하고 싶은 말과 함께 편지에 마음을 담으면, 다소니가 전달해 드릴게요 <br />
                    생일, 기일, 명절 등 기념일에 답장이 올 거예요.
                </Content>
            </TextWrapper>

            <HoverBox>
                <DescriptionHover>
                    <HoverToolTip>
                        <UnorderedList>
                            <li>{hallName}님과 함께한 소중한 추억에 대해 적어보세요</li>
                            <li>{hallName}님에게 들려주고 싶은 나의 근황에 대해 적어보세요</li>
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
                <Button
                    text="임시 보관하기"
                    size="M"
                    color="white"
                    onClick={handleTempSave}
                />

            <Button
                text="전달하기"
                size="M"
                active={isActive && !isSubmitting}
                onClick={handleSendLetter}
            />

            </ButtonWrapper>

            <ConfirmModal
                isOpen={isModalOpen}
                title={
                    modalType === "temp" ? "편지를 임시 보관했어요" : "편지를 전달했어요"
                }
                description={
                    modalType === "temp"
                        ? "임시보관함에서 확인할 수 있어요"
                        : isWanted === false
                            ? "소중한 마음을 전해드릴게요"
                            : "조금만 기다리면 답장이 올 거예요"
                }
                confirmText="확인"
                onConfirm={handleModalConfirm}
                onCancel={handleCloseModal}
            />


            <SideCategoryBox hallId={hallId} page={page} activeMenu="sent" />
        </Wrapper>
        </Background>
    );
};

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  position: relative;  /* ⭐ bgicon 기준 */
  display: flex;
  flex-direction: column;
  align-items: center;

  background: linear-gradient(
    90deg,
    rgba(255, 241, 242, 0.3) 9.13%,
    rgba(255, 246, 235, 0.3) 76.44%,
    rgba(255, 239, 229, 0.3) 100%
  );
`;

const BGIcon = styled.img`
  position: fixed;  
  bottom: 3.5rem;
  right: 2.5rem;
  width: 22.00006rem;
  height: 11.62256rem;
  opacity: 0.7;
  pointer-events: none;
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

const DescriptionHover = styled.div`
    display: flex;
    position: relative;
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

const DescriptionText = styled.div`
    ${typo("body")}; 
    color: ${color("black.70")};
`;

const UnorderedList = styled.ul`
    list-style-type: disc;
    padding-left: 1.5rem;
    margin: 0;
    
    & li {
        ${typo("bodym")};
        color: ${color("black.70")};
        white-space: nowrap;
        margin-bottom: 0.62rem;
    }
    
    & li:last-child {
        margin-bottom: 0;
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
    padding: 0.5rem 0.5625rem; 
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