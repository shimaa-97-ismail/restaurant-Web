
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useContext } from "react";
import { ThemeContext } from "../../context/theme/ThemeContext";
import styled from "styled-components";
import {AuthContext} from "../../context/Auth/AuthContext";
import "./Header.css";
import { useTranslation } from "../../hooks/useTranslation";
// import logo3 from "../../assets/logo.png"
const ThemedNavbar = styled(Navbar)`
  background-color: ${({ theme }) => theme.navbarBg} !important;
  color: ${({ theme }) => theme.navbarText} !important;
  transition: background-color 0.3s ease, color 0.3s ease;

  .nav-link,
  .navbar-brand,
  .navbar-toggler-icon {
    color: ${({ theme }) => theme.navbarText} !important;
    transition: color 0.3s ease;
  }

  .nav-link:hover {
    color: ${({ theme }) => theme.primary} !important;
  }

  .theme-toggle {
    background: none;
    border: none;
    color: ${({ theme }) => theme.navbarText};
    font-size: 1.2rem;
    margin-left: 1rem;
    cursor: pointer;
    transition: color 0.3s ease;
  }

  .theme-toggle:hover {
    color: ${({ theme }) => theme.primary};
  }
`;
export function Header() {
   const { user, isAdmin, logout,login } = useContext(AuthContext);
  const { theme, toggleTheme } = useContext(ThemeContext);

   const {  t, language, setLanguage  } =useTranslation();
 
//  const handleCart=()=>{
//   console.log("here");
  
//  }
  return (

 <ThemedNavbar 
 style={{ direction: language === "ar" ? "rtl" : "ltr"}} fixed="top" collapseOnSelect expand="lg">
      <Container  >

        <Navbar.Brand href="/">logo
        {/* <img sty src=></img> */}
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" 
        />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto ">
            <Nav.Link href="/breakfast">{t("breakfast")}</Nav.Link>
            <Nav.Link href="/lanch">{t("lunch")}</Nav.Link>
            <Nav.Link href="/dinner">{t("dinner")}</Nav.Link>
           {isAdmin&&<Nav.Link href="/dashboard">{t("dashboard")}</Nav.Link>} 
          </Nav>

          <Nav>
             {/* <Nav.Link onClick={handleCart}>
                   <i class="bi bi-basket"></i>
            </Nav.Link> */}
            <Nav.Link onClick={()=> setLanguage(language === "en" ? "ar" : "en")}>
                     {language==="en"?" العربية":" English"}
            </Nav.Link>
         {/*    <Nav.Link onClick={()=>toggleLanguage("ar")}>
AR
            </Nav.Link> */}
            {user ? (
            <Nav.Link href="/login" onClick={logout}>
              {t("logout")}
            </Nav.Link>):
            (<Nav.Link href="/login" onClick={login}>
              {t("login")}
            </Nav.Link>)}
            <Nav.Link as="button" className="theme-toggle bg-transparent btn border-0 d-flex justify-content-start " onClick={toggleTheme}>
              {theme === "light" ? (
                <i className="bi bi-moon-stars-fill"></i>
              ) : (
                <i className="bi bi-brightness-high-fill"></i>
              )}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </ThemedNavbar>

  )}