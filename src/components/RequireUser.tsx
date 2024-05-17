import { Navigate, Outlet, useLocation } from "react-router-dom";

export default function RequireUser({ isLoggedIn }: { isLoggedIn: boolean }) {
    const location = useLocation();
    return (
        isLoggedIn
            ? <Outlet />
            : <Navigate to='/' state={{ from: location }} replace />
    );
}