import "./App.css";
import { Route, Routes } from "react-router-dom";
import { SignUp } from "@/pages/sign-up.tsx";
import { SignIn } from "@/pages/sign-in.tsx";
import { Home } from "@/pages/home.tsx";

function App() {
  return (
    <>
      <div className="bg-background dark:bg-foreground">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
