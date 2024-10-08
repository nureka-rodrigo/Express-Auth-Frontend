import "./App.css";
import { Route, Routes } from "react-router-dom";
import { Home, ForgotPassword, SignUp, SignIn } from "@/pages";
import { AdminUsers } from "@/pages/admin";
import { AdminDashboard } from "@/pages/admin/dashboard.tsx";

function App() {
  return (
    <>
      <div className="bg-white dark:bg-black">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />

          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/users" element={<AdminUsers />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
