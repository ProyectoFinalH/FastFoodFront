import React from "react";
import { auth, googleProvider } from "../../../firebase";
import "./Login_Google.css";

const Login = () => {
  const handleLogin = async () => {
    try {
      const result = await auth.signInWithPopup(googleProvider);
      const token = await result.user.getIdToken();
      console.log("Token:", token);

      const response = await fetch(
        "http://localhost:5000/api/users/auth/google",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        console.error("Error data:", data);
        throw new Error("Failed to authenticate user");
      }

      console.log(data);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <button className="google-login-button" onClick={handleLogin}>
      <img
        className="google-icon"
        src="https://www.pngall.com/wp-content/uploads/5/Google-G-Logo-PNG-Image.png"
        alt="Google Icon"
      />
      Ingresa con Google
    </button>
  );
};

export default Login;
