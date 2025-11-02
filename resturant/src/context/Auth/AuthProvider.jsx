import { useState, useEffect } from "react";
import axios from "axios";
import { useGoogleLogin } from "@react-oauth/google";
import { AuthContext } from "./AuthContext";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null); // user object from backend
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(null);
  const navigate = useNavigate();

  //  Normal login (email/password)
  const login = async (email, password) => {
    try {
      const res = await axios.post("http://localhost:3000/auth/login", {
        email,
        password,
      });
      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      toast.success("Login successful!");
      navigate("/home", { replace: true });
    } catch (err) {
      console.log(err);
      alert(err.response.data.message);
    }
  };

  //  Login with Google
  const loginWithGoogle = useGoogleLogin({
    onSuccess: async (response) => {
      const { access_token } = response;
      // Send access token to backend to verify & create user
      const res = await axios.post(
        "http://localhost:3000/auth/google/callback",
        {
          access_token,
        }
      );

      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
      navigate("/home", { replace: true });
    },
    onError: (err) => console.error("Google Login Failed:", err),
  });
  // ✅ Register
  const register = async (email, role, userName, password) => {
    // console.log(email,role,userName, password);
    try {
      const res = await axios.post("http://localhost:3000/auth/register", {
        email,
        role,
        userName,
        password,
      });
      // console.log(res);

      setUser(res.data.user);
      setToken(res.data.token);
      localStorage.setItem("token", res.data.token);
    } catch (err) {
      console.log(err);
    }
  };

  // ✅ Logout
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
  };

  // ✅ Auto check if logged in
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      axios
        .get("http://localhost:3000/auth/me", {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((res) => {
          setUser(res.data.user);
          setToken(storedToken);
        })
        .catch(() => logout())
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
      return;
    }
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        register,
        loginWithGoogle,
        logout,
        isAdmin: user?.role === "admin",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
