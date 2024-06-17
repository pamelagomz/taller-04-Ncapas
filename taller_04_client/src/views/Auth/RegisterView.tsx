import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {Input} from "@/components/ui/input.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Link, useNavigate} from "react-router-dom";
import {Button} from "@/components/ui/button.tsx";
import {useAuthContext} from "@/providers/AuthContext.tsx";
import {z} from "zod";
import {useForm, SubmitHandler} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";

const registerSchema = z.object({
    name: z.string({
        required_error: "A reason is required.",
    }),
    password: z.string({
        required_error: "A reason is required.",
    }),
    email: z.string({
        required_error: "A reason is required.",
    })
})

export default function RegisterView() {

    const { register } = useAuthContext();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            name: "",
            email: "",
            password: ""
        }
    })

    const onSubmit: SubmitHandler<z.infer<typeof registerSchema>> = async (data) => {
        const registerSuccessful = await register(
            data.name,
            data.email,
            data.password
        )
        if (registerSuccessful)
            navigate("/")
    }

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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
                        <div className="grid gap-2">
                            <Label htmlFor="name">Nombre completo</Label>
                            <Input
                                id="name"
                                type="text"
                                {...form.register("name")}
                                placeholder="Carlos Perez"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...form.register("email")}
                                placeholder="m@example.com"
                                required
                            />
                        </div>
                        <div className="grid gap-2">
                            <Label htmlFor="password">Password</Label>
                            <Input
                                id="password"
                                placeholder={"**********"}
                                {...form.register("password")}
                                required
                                type="password"
                            />
                        </div>

                        <Button
                            type={"submit"}
                            className="w-full"
                            disabled={form.formState.isSubmitting}
                            // onClick={() => {onSubmit(form.getValues() as z.infer<typeof registerSchema>)}}
                        >
                            Crear una cuenta
                        </Button>

                    </form>
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

