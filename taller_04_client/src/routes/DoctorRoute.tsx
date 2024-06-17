import { Outlet, useNavigate} from "react-router-dom";
import {useAuthContext} from "@/providers/AuthContext.tsx";
import Navbar from "@/components/Navbar.tsx";

export default function DoctorRoute() {

    const navigate = useNavigate();
    const {user, logout} = useAuthContext();

    // useEffect(() => {
    //     if (!user?.roles.includes("Assitant")) {
    //         return navigate("/");
    //     }
    // }, []);

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
