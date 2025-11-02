import { useNavigate, Outlet } from "react-router-dom";
import Nav from "react-bootstrap/Nav";
import { SharedHeader } from "../../shared/SharedHeader";
import { useTranslation } from "../../hooks/useTranslation";
import styled, { ThemeProvider } from "styled-components";

const DashboardWrapper = styled.div`
  display: flex;
  min-height: 100vh;
 
  background-color: ${({ theme }) => theme.background};
 transition: background-color 0.3s ease;
 color: ${({ theme }) => theme.text};
 margin-top: 3rem;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;
const Sidebar = styled.div`
  background-color: ${({ theme }) => theme.sidebarBg};
  color: ${({ theme }) => theme.navbarText};
  width: 20%;
  min-height: 100vh;
  padding: 2rem;
transition: background-color 0.3s ease;
  h4 {
    text-align: center;
    margin-bottom: 2rem;
    
    
  }

  @media (max-width: 768px) {
    width: 100%;
    min-height: auto;
  }
`;
const SidebarButton = styled.button`
  width: 100%;
  margin-bottom: 1rem;
  padding: 0.5rem 1rem;
  background-color: transparent;
  color: ${({ theme }) => theme.navbarText};
  border: 1px solid ${({ theme }) => theme.border};
  cursor: pointer;
  font-weight: 500;
  border-radius: 5px;
  transition: all 0.3s;

  &:hover {
    background-color: ${({ theme }) => theme.primary};
    color: ${({ theme }) => theme.text};
     transform: translateX(5px);
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  }
`;
const Content = styled.div`
  width: 80%;
  background-color: ${({ theme }) => theme.card};
  padding: 2rem;
 transition: all 0.3s ease;
  @media (max-width: 768px) {
    width: 100%;
    display: flex;
    justify-content: center;
   
  }
`;

export function Dashboard() {
  const navigate = useNavigate();
  const { t,language } = useTranslation();
  return (
    // <DashboardWrapper  theme={themeMode === "light" ? lightTheme : darkTheme}>
    <DashboardWrapper style={{ direction: language === "ar" ? "rtl" : "ltr"}}>
      <Sidebar>
        <h4>{t("dashboard")}</h4>
      
          <SidebarButton
            onClick={() => {
              navigate("user");
            }}
          >
            {t("user")}
          </SidebarButton>
       
          <SidebarButton
            onClick={() => {
              navigate("menu");
            }}
          >
            {t("menu")}
          </SidebarButton>
       

        <SidebarButton
          onClick={() => {
            navigate("menuItem");
          }}
        >
          {t("itemMenu")}
        </SidebarButton>

        <SidebarButton
         
          onClick={() => {
            navigate("order");
          }}
        >
          {t("orders")}
        </SidebarButton>
      </Sidebar>
      <Content className="" style={{ width: "80%" }}>
        <SharedHeader title="" />
        {/* {location==="/dashboard"}?
           (<div>
              <Revenue title="Daily"/>
              <Revenue title="Monthly"/>
              <Revenue title="Weekly"/>
            </div>) : */}
        <Outlet />
      </Content>
    </DashboardWrapper>
  );
}
