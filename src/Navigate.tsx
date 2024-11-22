import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuthStore } from "./Stores/authStore";
import { SignIn } from "./Pages/SignIn";
import { Home } from "./Pages/Home";
import socket from "./Utils/Socket";

export const Navigate = () => {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token != "") {
      navigate("/app");
      
    } else {
      navigate("/auth");
      socket.disconnect();
    }

  }, [token]);

  return (
    <Routes>
      {token === "" ? (
        <Route path="/auth" element={<SignIn />} />
      ) : (
        <Route path="/app" element={<Home />} />
      )}
    </Routes>
  );
};
