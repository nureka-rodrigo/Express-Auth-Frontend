import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "@/pages/sign-up.tsx";
import { SignIn } from "@/pages/sign-in.tsx";
import { Home } from "@/pages/home.tsx";
import { ForgotPassword } from "@/pages/forgot-password.tsx";

function App() {
  return (
    <>
      <div className="bg-white dark:bg-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
