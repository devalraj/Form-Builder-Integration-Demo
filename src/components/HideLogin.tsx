import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function HideLogin({ isLoggedIn }: { isLoggedIn: boolean }) {
    const location = useLocation();
    return (
        !isLoggedIn
            ? <Outlet />
            : <Navigate to={location.state["from"]["pathname"]} />
    );
}