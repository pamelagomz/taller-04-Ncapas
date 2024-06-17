import { Outlet, useNavigate} from "react-router-dom";
import {useAuthContext} from "@/providers/AuthContext.tsx";
import Navbar from "@/components/Navbar.tsx";
import {useEffect} from "react";

export default function DoctorRoute() {

    const {user} = useAuthContext();
    const navigate = useNavigate();

    useEffect(() => {
        // Check if user information has been fetched
        if (user !== null) {
            // If user does not have the 'Admin' role, redirect to '/user'
            if (!user.roles.map(r => r.name).includes("Doctor")) {
                navigate("/user");
            }
        }
    }, [user, navigate]);

    const routes = [
        {
            name: "Medical Appointments",
            route: "/doctor"
        },
        {
            name: "Prescriptions",
            route: "/doctor/prescriptions"
        },
        {
            name: "Schedule",
            route: "/doctor/schedule"
        }
    ]

    return (
        <div
            className={"grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]"}
        >
            <Navbar routes={routes} />
            <Outlet/>
        </div>
    );
}
