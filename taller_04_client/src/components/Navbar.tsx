import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useAuthContext} from "@/providers/AuthContext.tsx";
import {MdArrowForward} from "react-icons/md";

type NavbarProps = {
    routes: Array<{
        name: string;
        route: string;
    }>
}

const Navbar = ({ routes } : NavbarProps) => {

    const { logout } = useAuthContext();

    return (
        <div className="h-full max-h-screen flex-col gap-2 hidden border-r bg-muted/40 md:flex">
            <div className="flex flex-col h-full justify-center w-full">
                <nav className="grid  gap-5 items-start px-2 text-sm font-medium lg:px-4">

                    {routes.map((route, index) => (
                        <Link
                            key={index}
                            to={route.route}
                            className="flex items-center gap-3 rounded-lg px-3 py-4 text-muted-foreground transition-all hover:text-primary"
                        >
                            <MdArrowForward className="h-4 w-4"/>
                            {route.name}
                        </Link>
                    ))}

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
