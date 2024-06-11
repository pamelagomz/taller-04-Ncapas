import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Input} from "@/components/ui/input"
import {Label} from "@/components/ui/label"
import {Link} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";

export default function RegisterView() {

    return (
        <section
            className={"flex flex-row h-dvh justify-around items-center"}
        >
            <div className={'flex flex-col gap-8 text-white font-bold items-start px-24 justify-center w-1/2 h-dvh bg-gray-950'}>
                <h1 className={"text-2xl"}>{"Bienvenido"}/a</h1>
                <p className={"text-secondaryText text-xl font-light w-1/2"}>
                    {"Clinica YaMerito, registrate para agendar una cita"}
                </p>
            </div>

            <Card className="mx-auto shadow-lg max-w-[30rem] p-4">
                <CardHeader>
                    <CardTitle className="text-2xl">Registrarse</CardTitle>
                    <CardDescription className={'font-light'}>
                        Escribe tu correo electronico en los campos de abajo, para crear tu cuenta
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-8">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre completo</Label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="Carlos Perez"
                                required
                            />
                        </div>
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
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                placeholder={"**********"}
                                required
                                type="password"
                            />
                        </div>
                        <Button type="submit" className="w-full">
                            Crear una cuenta
                        </Button>
                    </div>
                    <div className="mt-4 text-center text-sm">
                        Ya tienes una cuenta?{" "}
                        <Link to={"/"} className="underline">
                            Iniciar sesion
                        </Link>
                    </div>
                </CardContent>
            </Card>
        </section>
    );
}

