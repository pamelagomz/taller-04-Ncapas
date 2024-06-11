import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

export default function LoginView() {

    const navigate = useNavigate();

    return (
        <section
            className={"flex flex-row h-dvh justify-around items-center"}
        >
            <div
                className={'flex flex-col gap-8 text-white font-bold items-start px-24 justify-center w-1/2 h-dvh bg-gray-950'}>
                <h1 className={"text-2xl"}>{"Bienvenido"}/a</h1>
                <p className={"text-secondaryText text-xl font-light w-1/2"}>
                    {"Clinica YaMerito, inicia sesion para agendar una cita"}
                </p>
            </div>

            <Card className="mx-auto shadow-lg w-[30rem] p-4">
                <CardHeader>
                    <CardTitle className="text-2xl">Login</CardTitle>
                    <CardDescription>
                        Enter your email below to login to your account
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-8">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                placeholder="m@example.com"
                                required
                            />
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                placeholder={"******"}
                                type="password"
                                required
                            />
                        </div>

                        <Button type="submit" className="w-full" onClick={
                            () => {
                                navigate('/appointments/own')
                            }
                        }>
                            Login
                        </Button>

                    </div>

                    <div className="mt-4 text-center text-sm">
                        Don&apos;t have an account?{" "}
                        <Link to={'/signup'} className={"underline"}>
                            Sign up
                        </Link>
                    </div>

                </CardContent>
            </Card>
        </section>
    );
}

