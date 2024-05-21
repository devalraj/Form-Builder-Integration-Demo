import { Link } from "react-router-dom";
import logoutUser from "../api/logoutUser";
import useAuth from "../hooks/useAuth";

export default function NavBar() {
    const { isLoggedIn, setIsLoggedIn } = useAuth();
    const handleLogout = async () => {
        const success = await logoutUser();
        if (success) {
            localStorage.removeItem("formioUser");
            localStorage.removeItem("formioToken");
            setIsLoggedIn(false);
        }
    };
    return (
        <>
            {
                isLoggedIn ?
                    <nav>
                        < Link to="/" > Home</Link >
                        <button onClick={handleLogout}>LogOut</button>
                    </nav >
                    :
                    <></>
            }
        </>
    );
}