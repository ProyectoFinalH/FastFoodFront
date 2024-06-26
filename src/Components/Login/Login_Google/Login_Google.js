import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../../firebase";
import { login_User_Google } from "../../../Redux/actions";
import "./Login_Google.css";

const LoginGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await auth?.signInWithPopup(googleProvider);
      const token = await result?.user?.getIdToken();

      dispatch(login_User_Google({ token }));

      navigate("/home");
    } catch (error) {
      console.error("Error al iniciar sesión con Google:", error);
    }
  };

  return (
    <button className="google-login-button" onClick={handleLogin}>
      <img
        className="google-icon"
        src="https://www.pngall.com/wp-content/uploads/5/Google-G-Logo-PNG-Image.png"
        alt="Google Icon"
      />
      Registrarse e iniciar sesión con Google
    </button>
  );
};

export default LoginGoogle;
