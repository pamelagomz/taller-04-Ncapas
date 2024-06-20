import {Outlet, useNavigate} from "react-router-dom";
import Navbar from "@/components/Navbar.tsx";
import {useAuthContext} from "@/providers/AuthContext.tsx";
import {useEffect} from "react";

export default function AdminRoute() {
    const {user} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user information has been fetched
        if (user !== null) {
            // If user does not have the 'Admin' role, redirect to '/user'
            if (!user.roles.map(r => r.name).includes("Admin")) {
                navigate("/user");
            }
        }
    }, [user, navigate]);

    const routes = [
        {
            name: "Users",
            route: "/admin"
        },
    ]

    return (
        <div
            className={"grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]"}
        >
            <Navbar routes={routes}/>
            <Outlet/>
        </div>
    );
}
