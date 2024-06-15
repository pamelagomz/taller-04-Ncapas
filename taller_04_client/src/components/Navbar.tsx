import {Home, Package, ShoppingCart } from "lucide-react";
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useAuthContext} from "@/providers/AuthContext.tsx";

const Navbar = () => {

    const { logout } = useAuthContext();

    return (
        <div className="h-full max-h-screen flex-col gap-2 hidden border-r bg-muted/40 md:flex">
            <div className="flex flex-col h-full justify-center w-full">
                <nav className="grid  gap-5 items-start px-2 text-sm font-medium lg:px-4">
                    <Link
                        to="/assistant"
                        className="flex items-center gap-3 rounded-lg px-3 py-4 text-muted-foreground transition-all hover:text-primary"
                    >
                        <Home className="h-4 w-4"/>
                        Medical Appointments
                    </Link>
                    <Link
                        to="/assistant/history"
                        className="flex items-center gap-3 rounded-lg px-3 py-4 text-muted-foreground transition-all hover:text-primary"
                    >
                        <ShoppingCart className="h-4 w-4"/>
                        History
                    </Link>
                    <Link
                        to="#"
                        className="flex items-center gap-3 rounded-lg bg-muted px-3 py-4 text-primary transition-all hover:text-primary"
                    >
                        <Package className="h-4 w-4"/>
                        History{" "}
                    </Link>
                    <Button
                        className={'mt-6'}
                        onClick={() => {
                            logout()
                        }}
                    >
                        Cerrar sesion
                    </Button>
                </nav>
            </div>
        </div>
    )
}

export default Navbar;
