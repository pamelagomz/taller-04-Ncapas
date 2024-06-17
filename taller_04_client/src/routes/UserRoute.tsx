import { Outlet } from "react-router-dom";
import Navbar from "@/components/Navbar.tsx";

export default function UserRoute() {

    const routes = [
        {
            name: "Medical Appointments",
            route: "/user"
        },
        {
            name: "Record",
            route: "/user/record"
        },
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
