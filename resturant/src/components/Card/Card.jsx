import Card from "react-bootstrap/Card";
import { BasicButton } from "../../styledComponents";
import styled from "styled-components";
import { useTranslation } from "../../hooks/useTranslation";
const StyledCard = styled(Card)`
  width: 100%;
  max-width: 22rem;
  border: none;
  border-radius: 1.25rem;
  overflow: hidden;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  background-color: ${({ theme }) => theme.cardBg || "#fff"};

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 18px rgba(0, 0, 0, 0.18);
  }

  @media (max-width: 768px) {
    max-width: 90%;
  }

  @media (max-width: 480px) {
    max-width: 100%;
    border-radius: 1rem;
   
  }
`;

const ImageWrapper = styled.div`
  overflow: hidden;
  height: 230px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transition: transform 0.4s ease;
  }

  &:hover img {
    transform: scale(1.07);
  }

  @media (max-width: 480px) {
    height: 180px;
  }
`;

const Title = styled(Card.Title)`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.textPrimary || "#222"};
  margin-bottom: 0.5rem;
`;

const Description = styled(Card.Text)`
  color: ${({ theme }) => theme.textSecondary || "#777"};
  font-size: 0.95rem;
  min-height: 60px;
`;

const Price = styled(Card.Text)`
  font-weight: 600;
  font-size: 1.1rem;
  color: #16a34a;
  margin: 0.75rem 0 1.5rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
`;
export function MyCard({ item,onShow}) {
  const {  t, language  } =useTranslation();
  
  return (
  
    (
      <StyledCard  style={{ direction: language === "ar" ? "rtl" : "ltr", width: "22rem" }}>
        <ImageWrapper>
        <Card.Img  variant="top" src={item.img} /> 
        </ImageWrapper>
        
        <Card.Body className="">
          <Title >{item.name[language]}</Title>
          <Description>{item.description[language]}</Description>
          <Price >{t("price")}: ${item.price}</Price>
          <ButtonWrapper >
            <BasicButton onClick={()=>onShow(item)}  >
             {t("orderNow")} 
              </BasicButton>
          </ButtonWrapper>
        </Card.Body>
      </StyledCard>

    )
  );
}
