import {Outlet} from "react-router-dom";
import Navbar from "@/components/Navbar.tsx";

export default function AdminRoute() {
    /*const {user} = UseUserContext();

    if (!user) {
        return <Navigate to={LOGIN} />;
    }*/

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
