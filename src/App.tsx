import './App.css'
import {Route, Routes} from "react-router-dom";
import {SignUp} from "@/pages/sign-up.tsx";

function App() {
  return (
    <>
      <div className="bg-neutral-50 dark:bg-neutral-950">
        <Routes>
          <Route path="/" element={<SignUp/>}/>

          <Route path="*" element={<SignUp/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
