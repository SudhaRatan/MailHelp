import { GoogleOAuthProvider } from "@react-oauth/google";
import { BrowserRouter } from "react-router-dom";
import { Navigate } from "./Navigate";

function App() {

  return (
    <GoogleOAuthProvider clientId="122417730027-0nor7ef753a36b5hd17lfdn9tunoih5t.apps.googleusercontent.com">
      <BrowserRouter>
        <Navigate />
      </BrowserRouter>
    </GoogleOAuthProvider>
  );
}

export default App;
