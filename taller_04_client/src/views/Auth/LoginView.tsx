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
import {z} from "zod";
import {SubmitHandler, useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {useAuthContext} from "@/providers/AuthContext.tsx";

const loginSchema = z.object({
    email: z.string(),
    password: z.string(),
})

export default function LoginView() {

    const navigate = useNavigate();

    const { login } = useAuthContext();

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: "",
            password: ""
        }
    })

     const onSubmit: SubmitHandler<z.infer<typeof loginSchema>> = async (data) => {
        const loginSuccessful = await login(
            data.email,
            data.password
        )
        if (loginSuccessful)
            navigate("/user")
    }

    return (
        <section
            className={"flex flex-row h-dvh justify-around items-center"}
        >
            <div
                style={{
                    backgroundImage: `url("/bgphoto.jpg")`,
                }}
                className={'flex flex-col bg-cover gap-8 bg-gray-950/80 bg-center bg-blend-darken text-white font-bold items-start px-24 justify-center w-1/2 h-dvh'}>
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
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
                        <div className="grid gap-2">
                            <Label htmlFor="email">Email</Label>
                            <Input
                                id="email"
                                type="email"
                                {...form.register("email")}
                                placeholder="m@example.com"
                                required
                            />
                            {form.formState.errors.email && (<small className="text-red-500">{form.formState.errors.email.message}</small>)}
                        </div>

                        <div className="grid gap-2">
                            <div className="flex items-center">
                                <Label htmlFor="password">Password</Label>
                            </div>
                            <Input
                                id="password"
                                placeholder={"******"}
                                {...form.register("password")}
                                type="password"
                                required
                            />
                            {form.formState.errors.password && (<small className="text-red-500">{form.formState.errors.password.message}</small>)}
                        </div>

                        <Button type="submit" className="w-full">
                            Login
                        </Button>

                    </form>

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

