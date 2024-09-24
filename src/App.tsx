import './App.css'
import {Route, Routes} from "react-router-dom";
import {SignUp} from "@/pages/sign-up.tsx";
import {SignIn} from "@/pages/sign-in.tsx";

function App() {
  return (
    <>
      <div className="bg-neutral-50 dark:bg-neutral-950">
        <Routes>
          <Route path="/sign-up" element={<SignUp/>}/>
          <Route path="/sign-in" element={<SignIn/>}/>

          <Route path="*" element={<SignUp/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
