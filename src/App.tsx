import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import FormBuilderPage from "./pages/FormBuilder"
import FormRendererPage from "./pages/FormRenderer"
import LoginPage from "./pages/Login"
import RequireUser from "./components/RequireUser"
import HideLogin from "./components/HideLogin"
import { useState, useEffect } from "react"
import checkCurrentUser from "./api/checkCurrentUser"

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const init = async () => setIsLoggedIn(await checkCurrentUser());
    init();
  }, []);
  return (
    <Router>
      <NavBar isLoggedIn={isLoggedIn} />
      <div>
        <Routes>
          <Route element={<HideLogin isLoggedIn={isLoggedIn} />}>
            <Route path="/" element={<LoginPage />} />
          </Route>
          <Route element={<RequireUser isLoggedIn={isLoggedIn} />}>
            <Route path="/builder" element={<FormBuilderPage />} />
            <Route path="/builder/:formName" element={<FormBuilderPage />} />
            <Route path="/renderer" element={<FormRendererPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
