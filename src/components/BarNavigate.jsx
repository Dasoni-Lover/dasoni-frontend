import React from "react";
import nextbtn from "../assets/next-btn.png";
import styled from "styled-components";
import { color, typo } from "../styles/tokens";
import { Column } from "../styles/flex";

const BarNavigate = ({
  paths = ["홈", "故 박영수의 추모관"],
  title,
  onPathClick, // 부모에서 경로 이동을 처리하는 콜백
}) => {
  return (
    <Column>
      <Wrapper>
        {paths.map((path, index) => (
          <React.Fragment key={index}>
            <ClickableText onClick={() => onPathClick?.(path, index)}>
              {path}
            </ClickableText>
            {index < paths.length - 1 && (
              <Next src={nextbtn} alt=">" />
            )}
          </React.Fragment>
        ))}
      </Wrapper>
      <Title>{title}</Title>
    </Column>
  );
};

// 💅 스타일
const Wrapper = styled.div`
  display: flex;
  height: 1.75rem;
  align-items: center;
  align-self: stretch;
`;

const ClickableText = styled.div`
  ${typo("bodym")};
  color: ${color("black.50")};
  cursor: pointer;

`;

const Next = styled.img`
  width: 1.75rem;
  height: 1.75rem;
`;

const Title = styled.div`
  margin-top: 0.5rem;
  ${typo("h2")};
  color: ${color("black.70")};
`;

export default BarNavigate;




// const MyPage = () => {
//   const navigate = useNavigate();

//   const handlePathClick = (path, index) => {
//     // 원하는 로직으로 자유롭게 처리
//     if (path === "홈") navigate("/");
//     else navigate(`/memorial/${index}`);
//   };

//   return (
//     <BarNavigate
//       paths={["홈", "故 박영수의 추모관"]}
//       title="추모관 홈"
//       onPathClick={handlePathClick}
//     />
//   );
// };
