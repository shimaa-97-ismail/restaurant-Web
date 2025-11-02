import { BasicButton } from "../../styledComponents";
import styled from "styled-components";
import { useTranslation } from "../../hooks/useTranslation";
// Container wrapper
const Container = styled.div`
  margin: 1rem;
  border: 2px solid oklch(0.93 0.01 257.07);
  border-radius: 1rem;
  overflow: hidden;
  padding-bottom: 2rem;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
    transition: background-color 0.3s ease, color 0.3s ease;
`;

// Header section
const Header = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 2rem;

  h3 {
    margin-bottom: 1rem;
    text-decoration: underline;
    color: ${({ theme }) => theme.accent};
       transition: color 0.3s ease;
  }

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    h3 {
      text-align: center;
    }
  }
`;

// Cards wrapper
const CardsWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1.5rem;
  justify-content: center;
  transition: all 0.3s ease;

   @media (max-width: 480px) {
    justify-content: center !important;
    align-items: center;
  }
`;

// Single card
const Card = styled.div`
  width: 350px;
  background: ${({ theme }) => theme.cardBackground};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 1rem;
  padding: 1rem;
  margin: 1.5rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: ${({title}) => ( title === "All menuitems"  ? "start" : "center")};
   color: ${({ theme }) => theme.text};
  transition: background 0.3s ease, color 0.3s ease, box-shadow 0.3s ease;
 &:hover {
    box-shadow: 0 6px 12px ${({ theme }) => theme.shadow};
  }
  h5 {
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
    color: ${({ theme }) => theme.text};
     transition: color 0.3s ease;
  }

  p {
    font-size: 0.875rem;
    height: 75px;
    overflow: hidden;
    color: ${({ theme }) => theme.secondaryText};
     transition: color 0.3s ease;
  }

  h4 {
    margin-top: 0.5rem;
    font-weight: bold;
    color: ${({ theme }) => theme.accent};
     transition: color 0.3s ease;
  }

  button-group {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;

     ${BasicButton}{
      /* width: 1.5rem; */
      border:1px solid white;
      transition: background 0.3s ease, color 0.3s ease, transform 0.2s ease;

      &:hover {
        transform: translateY(-2px);
      }
  }

  @media (max-width: 768px) {
    width: 90%;
  }
}
`;
// const translations = {
//   "ALL Orders": "الطلبات",
//   "allItemMenus": "عناصر القائمة",
//   Menu: "القائمة",
//  "All Users": "المستخدم"
// };

export default function SimpleCard({ title, data,onDelete,onAdd,onEdit }) {
   const {  t,language  } =useTranslation();

  const getText = (field, language) => {
  if (!field) return undefined;
  // if field is an object with language keys
  if (typeof field === "object" && field[language]) return field[language];

  // if field is a string, just return it
  if (typeof field === "string"&& field.trim() !== "") return field;

  return undefined;
};
const translations = {
  allusers: "جميع المستخدمين",
};
  return (
    <Container
     
      // style={{ borderColor: "oklch(0.93 0.01 257.07)" }}
       >
      <Header >
        <h3>{translations[title] || title}</h3>
        <BasicButton
                  
          onClick={onAdd}
        >
          {t("add")}
        </BasicButton>
      </Header>

      <CardsWrapper>
        {data.length > 0 ? (
          data.map((item) => (
            console.log(item),
            
            <Card
              key={item._id} >
              <div
                // className={
                //   title === "All menuitems" || title === "All menuItems"
                //     ? "text-start"
                //     : "text-center"
                // }
              >
                <h5 >{getText(item.name, language) || item.userName || "No Name"}</h5>

                <p >
                  {getText(item.description, language) || item.role || "No Description"}
                </p>
                {title === "All menuItems" && <h4>{t("price")} : ${item.price}</h4>}
                <button-group >
                  <BasicButton
                    onClick={() => onEdit(item._id)}
                  >{t("edit")}</BasicButton>
                  <BasicButton                  
                    onClick={() => onDelete(item._id)}
                  >{t("delete")}</BasicButton>
                </button-group>
              </div>
            </Card>
          ))
        ) : (
          <p>No data found.</p>
        )}
      </CardsWrapper>
    </Container>
  );
}
