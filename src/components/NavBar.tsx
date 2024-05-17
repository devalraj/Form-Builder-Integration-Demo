import { Link } from "react-router-dom";
import logoutUser from "../api/logoutUser";

export default function NavBar({ isLoggedIn }: { isLoggedIn: boolean }) {
    const handleLogout = async () => {
        const success = await logoutUser();
        if (success) {
            localStorage.removeItem("formioUser");
            localStorage.removeItem("formioToken");
        }
    };
    return (
        <nav>
            {!isLoggedIn && <Link to="/">Login</Link>}
            <Link to="/builder">Form Builder</Link>
            <Link to="/renderer">Form Render</Link>
            {isLoggedIn && <button onClick={handleLogout}>LogOut</button>}
        </nav>
    );
}