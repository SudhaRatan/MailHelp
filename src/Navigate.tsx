import React, { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { useAuthStore } from "./Stores/authStore";
import { SignIn } from "./Pages/SignIn";
import { Home } from "./Pages/Home";

export const Navigate = () => {
  const token = useAuthStore((state) => state.token);
  const navigate = useNavigate();

  useEffect(() => {
    if (token != "") {
      navigate("/app");
    } else {
      navigate("/auth");
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
