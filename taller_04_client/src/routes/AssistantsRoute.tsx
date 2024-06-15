import {Link, Outlet, useNavigate} from "react-router-dom";
import {useAuthContext} from "@/providers/AuthContext.tsx";
import {Button} from "@/components/ui/button.tsx";
import {useEffect} from "react";
import Navbar from "@/components/Navbar.tsx";

export default function AssistantsRoute() {

    const navigate = useNavigate();
    const {user, logout} = useAuthContext();

    // useEffect(() => {
    //     if (!user?.roles.includes("Assitant")) {
    //         return navigate("/");
    //     }
    // }, []);

    return (
        <div
            className={"grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[240px_1fr]"}
        >
            <Navbar/>
            <Outlet/>
        </div>
    );
}
