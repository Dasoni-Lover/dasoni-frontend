// src/components/SideCategoryBox.jsx
import React, { useState } from "react";
import styled from "styled-components";
import { useNavigate, useLocation } from "react-router-dom";
import SideCategoryBoxItem from "./SideCategoryBoxItem";
import { CheckReturnModal } from "./CheckReturnModal";
import ConfirmModal from "../../../components/ConfirmModal"; // ConfirmModal 임포트 유지
import { getLetterStatus } from "../../../api/letters";

export default function SideCategoryBox({ hallId, page }) {
    const navigate = useNavigate();
    const location = useLocation();

    const [activeMenu, setActiveMenu] = useState(
        location.state?.activeMenu || "sent"
    );

    const [showModal, setShowModal] = useState(false);
    const [showEditBlockedModal, setShowEditBlockedModal] = useState(false); // ⭐ 추가: 고인 정보 수정 불가 모달 상태
    const closeModal = () => setShowModal(false);
    const closeEditBlockedModal = () => setShowEditBlockedModal(false); // ⭐ 추가: 고인 정보 수정 불가 모달 닫기

    // ==========================
    // 편지 쓰기 클릭
    // ==========================
    const handleClickWriteLetter = () => {
        setActiveMenu("write");

        // ✔ page가 "me"일 경우 → 모달 없이 즉시 이동
        if (page === "me") {
            navigate("/sent-letter", {
                state: { hallId, page, activeMenu: "write" },
            });
            return;
        }

        // ✔ admin / follower → 기존 모달 열림
        setShowModal(true);
    };

    // ==========================
    // 모달 내 확인 처리
    // ==========================
    const handleModalConfirm = async (selectedOption) => {
        setShowModal(false);

        // CASE 1: "아니오" → 무조건 sent-letter 이동
        if (selectedOption === "no") {
            navigate("/sent-letter", {
                state: { hallId, page, activeMenu: "write", selectedOption },
            });
            return;
        }

        // CASE 2: "예" → API 조회
        try {
            const { isOpen, isSet } = await getLetterStatus(hallId);

            if (isOpen === true && isSet === true) {
                navigate("/sent-letter", {
                    state: { hallId, page, activeMenu: "write", selectedOption },
                });
            } else if (isOpen === true && isSet === false) {
                if (page === "follower") {
                    navigate("/edit-hallinfo", {
                        state: { hallId, page, activeMenu: "edit", selectedOption },
                    });
                } else {
                    navigate("/sent-letter", {
                        state: { hallId, page, activeMenu: "write", selectedOption },
                    });
                }
            } else if (isOpen === false) {
                if (page === "admin") {
                    navigate("/edit-hallinfo", {
                        state: { hallId, page, activeMenu: "edit", selectedOption },
                    });
                } else {
                    navigate("/edit-hallinfo", {
                        state: { hallId, page, activeMenu: "write", selectedOption },
                    });
                }
            }
        } catch (error) {
            console.error("편지 작성 가능 여부 조회 실패:", error);
        }
    };
    
    // ==========================
    // ⭐ 고인 정보 수정 클릭 (로직 수정)
    // ==========================
    const handleClickEditHallInfo = async () => {
        setActiveMenu("edit");
        
        try {
            const { isOpen } = await getLetterStatus(hallId);

            if (page === "follower" && isOpen === false) {
                // follower이면서 isOpen이 false일 때, 모달 띄우고 페이지 이동 막음
                setShowEditBlockedModal(true);
                return;
            }
            
            // 나머지 경우는 페이지 이동
            navigate("/edit-hallinfo", {
                state: { hallId, page, activeMenu: "edit" },
            });

        } catch (error) {
            console.error("고인 정보 수정 가능 여부 조회 실패:", error);
            // 에러 발생 시에도 일단 페이지 이동을 시킬지, 에러 메시지를 띄울지 결정 필요
            // 여기서는 일단 이동을 막고 에러 메시지를 띄우는 것으로 가정합니다.
            alert("정보 조회 중 오류가 발생했습니다.");
        }
    };


    return (
        <>
            <Container>
                <SideCategoryBoxItem
                    text="보낸 편지함"
                    bgcolor={activeMenu === "sent" ? "#FFF4E6" : undefined}
                    border={activeMenu === "sent" ? "1px solid #FFBC67" : undefined}
                    onClick={() => {
                        setActiveMenu("sent");
                        navigate("/sent-letterbox", {
                            state: { hallId, page, activeMenu: "sent" },
                        });
                    }}
                />

                {(page === "admin" || page === "follower") && (
                    <SideCategoryBoxItem
                        text="받은 편지함"
                        bgcolor={activeMenu === "received" ? "#FFF4E6" : undefined}
                        border={activeMenu === "received" ? "1px solid #FFBC67" : undefined}
                        onClick={() => {
                            setActiveMenu("received");
                            navigate("/received-letterbox", {
                                state: { hallId, page, activeMenu: "received" },
                            });
                        }}
                    />
                )}

                <SideCategoryBoxItem
                    text="편지 쓰기"
                    bgcolor={activeMenu === "write" ? "#FFF4E6" : undefined}
                    border={activeMenu === "write" ? "1px solid #FFBC67" : undefined}
                    onClick={handleClickWriteLetter}
                />

                {(page === "admin" || page === "follower") && (
                    <SideCategoryBoxItem
                        text="고인 정보 수정"
                        bgcolor={activeMenu === "edit" ? "#FFF4E6" : undefined}
                        border={activeMenu === "edit" ? "1px solid #FFBC67" : undefined}
                        onClick={handleClickEditHallInfo} // ⭐ 수정된 핸들러 연결
                    />
                )}
            </Container>

            {showModal && (
                <CheckReturnModal
                    onClose={closeModal}
                    onConfirm={handleModalConfirm}
                />
            )}
            
            {/* ⭐ 추가: 고인 정보 수정 불가 모달 */}
            {showEditBlockedModal && (
                <ConfirmModal
                    isOpen={showEditBlockedModal}
                    title="지금은 고인 정보를 설정할 수 없어요"
                    description={
                        <>
                            추모관 관리자가 고인 정보 설정을 완료하면
                            <br />
                            설정할 수 있어요
                        </>
                    }
                    confirmText="확인"
                    onConfirm={closeEditBlockedModal}
                    onCancel={closeEditBlockedModal}
                />
            )}
        </>
    );
}

const Container = styled.div`
    position: fixed;
    top: 20.63rem;
    left: 3.75rem;
    width: 15rem;
    display: flex;
    flex-direction: column;
    gap: 0.625rem;

    @media (max-width: 1200px) {
        display: none;
    }
`;