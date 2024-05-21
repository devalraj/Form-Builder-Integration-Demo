import { Navigate, Outlet, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";

export default function HideLogin() {
    const { isLoggedIn } = useAuth();
    const location = useLocation();
    const path = (location.state && location.state["from"]) ? location.state["from"]["pathname"] ?? "/" : "/";
    return (
        !isLoggedIn
            ? <Outlet />
            : <Navigate to={path} />
    );
}