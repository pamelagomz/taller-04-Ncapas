import { Outlet, useNavigate} from "react-router-dom";
import {useAuthContext} from "@/providers/AuthContext.tsx";
import Navbar from "@/components/Navbar.tsx";
import {useEffect} from "react";

export default function AssistantsRoute() {

    const navigate = useNavigate();
    const {user} = useAuthContext();

    useEffect(() => {
        // Check if user information has been fetched
        if (user !== null) {
            // If user does not have the 'Admin' role, redirect to '/user'
            if (!user.roles.map(r => r.name).includes("Assistant")) {
                navigate("/user");
            }
        }
    }, [user, navigate]);

    const routes = [
        {
            name: "Medical Appointments",
            route: "/assistant"
        },
        {
            name: "History",
            route: "/assistant/history"
        }
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
