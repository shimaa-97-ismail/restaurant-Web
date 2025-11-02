import { BasicButton } from "../../styledComponents";
import { useState, useContext } from "react";
import { isEmpty, isEmail, isPassword } from "../../utils/validation";
import { AuthContext } from "../../context/Auth/AuthContext";
import { useTranslation } from "../../hooks/useTranslation";
import {
  LoginWrapper,
  Title,
  StyledForm,
  Label,
  Input,
  ErrorMsg,
  ButtonWrapper,
} from "./LoginStyle";
export function Login() {
  const { login, loginWithGoogle } = useContext(AuthContext);
const {t,language} =useTranslation();
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const [errors, setError] = useState({
    email: "",
    password: "",
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const validationemail = () => {
    let msg = "";
    if (isEmpty(user.email)) msg = "email is required";
    else if (!isEmail(user.email)) {
      msg = "Invalid email format";
    }
    setError((prev) => ({
      ...prev,
      email: msg,
    }));

    return msg === "";
  };
  const validationPassword = () => {
    let msg = "";
    if (isEmpty(user.password)) msg = "password is required";
    else if (!isPassword(user.password)) {
      msg =
        "Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.";
    }

    setError((prev) => ({
      ...prev,
      password: msg,
    }));
    return msg === "";
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validationemail() && validationPassword();
    if (!isValid) return;
    try {
      login(user.email, user.password);
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <LoginWrapper style={{ direction: language === "ar" ? "rtl" : "ltr"}}>
      <Title>{t("login")}</Title>

      <StyledForm onSubmit={handleSubmit}>
        <div>
          <Label>{t("email")}</Label>
          <Input
            type="email"
            name="email"
            placeholder="Enter Email"
            value={user.email}
            onChange={handleChange}
            // onBlur={validationemail}
          />
          {errors.email && <ErrorMsg>{errors.email}</ErrorMsg>}
        </div>

        <div>
          <Label>{t("password")}</Label>
          <Input
            type="password"
            name="password"
            placeholder="Password"
            value={user.password}
            onChange={handleChange}
            // onBlur={validationPassword}
          />
          {errors.password && <ErrorMsg>{errors.password}</ErrorMsg>}
        </div>

        <ButtonWrapper>
          <BasicButton>{t("submit")}</BasicButton>
        </ButtonWrapper>

        <p style={{ textAlign: "center", margin: "1rem 0", color: "#888" }}>
          — or continue with —
        </p>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <BasicButton type="button"   onClick={loginWithGoogle}>
          {t("loginWithGoogle")}
          </BasicButton >
          {/* <GoogleLogin
            onSuccess={loginWithGoogle}
            onError={() => console.log("Login Failed")}
            useOneTap // ✅ valid prop for @react-oauth/google
          /> */}
        </div>
      </StyledForm>
    </LoginWrapper>
  );
}
// useOneTap
