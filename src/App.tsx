import { Route, BrowserRouter as Router, Routes } from "react-router-dom"
import NavBar from "./components/NavBar"
import FormBuilderPage from "./pages/FormBuilder"
import FormRendererPage from "./pages/FormRenderer"
import LoginPage from "./pages/Login"
import RequireUser from "./components/RequireUser"
import HideLogin from "./components/HideLogin"
import IndexPage from "./pages/Index"

function App() {
  return (
    <Router>
      <NavBar />
      <div>
        <Routes>
          <Route element={<HideLogin />}>
            <Route path="/login" element={<LoginPage />} />
          </Route>
          <Route element={<RequireUser />}>
            <Route path="/" element={<IndexPage />} />
            <Route path="/builder" element={<FormBuilderPage />} />
            <Route path="/builder/:formName?" element={<FormBuilderPage />} />
            <Route path="/renderer/*" element={<FormRendererPage />} />
          </Route>
        </Routes>
      </div>
    </Router>
  )
}

export default App
