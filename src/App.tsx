import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, ForgotPassword, SignUp, SignIn } from "@/pages";

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
