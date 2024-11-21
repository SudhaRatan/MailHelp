import { API_URL, scopes } from "./Constants/config";
import { useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import { useAuthStore } from "./Stores/authStore";
import { useState } from "react";

export default function GoogleLogin() {
  const [auth, setAuth] = useState<boolean>(false);

  const setToken = useAuthStore((state) => state.setToken);
  const setTokenInfo = useAuthStore((state) => state.setTokenInfo);
  const serverAuth = async (token: string) => {
    const response = await fetch(`${API_URL}/api/auth`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ access_token: token }),
    });
    response
      .json()
      .then((data) => {
        // console.log(data)
        setTokenInfo(data.data);
        setToken(token);
        setAuth(false)
      })
      .catch((error) => {
        setAuth(false)
        console.warn(error);
      });
    console.log(response);
  };

  const login = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      console.log(tokenResponse);
      setAuth(true)
      serverAuth(tokenResponse.access_token);
    },
    onError: (errorResponse) => {
      console.log(errorResponse);
    },
    scope: scopes.join(" "),
  });

  return (
    <div>
      <button
      disabled={auth}
        className="btn"
        onClick={() => {
          login();
        }}
      >
        {auth ? (
          <>
          <span className="loading loading-spinner"></span>
          Logging in
          </>
        ) : (
          <>
            <FaGoogle />
            Google login
          </>
        )}
      </button>
    </div>
  );
}
