import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { auth, googleProvider } from "../../../firebase";
import { login_User_Google } from "../../../Redux/actions";

const LoginGoogle = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.stopPropagation();
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
    <button
      type="button"
      className="bg-white border border-gray-500 py-2 px-10 rounded-md flex items-center text-sm text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200"
      onClick={handleLogin}
    >
      <img
        className="h-6 w-6 mr-2"
        src="https://www.pngall.com/wp-content/uploads/5/Google-G-Logo-PNG-Image.png"
        alt="Google Icon"
      />
      <span className="whitespace-nowrap">
        Registrarse/iniciar sesión con Google
      </span>
    </button>
  );
};

export default LoginGoogle;
