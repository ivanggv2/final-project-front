import styled from "styled-components";

const HomePageStyled = styled.div`
  width: 450px;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 15px;

  @media (min-width: 450px) {
    width: 100%;
    padding: 0;
  }
`;

export default HomePageStyled;
