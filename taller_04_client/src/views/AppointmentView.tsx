import {
    Card,
    CardContent, CardDescription, CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import DatePickerForm from "@/components/ui/datepicker.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import React from "react";
import {cn} from "@/lib/utils.ts";
import { CheckIcon } from "lucide-react";
import {Badge} from "@/components/ui/badge.tsx";

export const FormSchema = z.object({
    reason: z.string({
        required_error: "A reason is required.",
    }),
    date: z.date({
        required_error: "A date of birth is required.",
    }),
})

export default function AppointmentView() {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("You submitted the following values: " + JSON.stringify(data))
    }

    return (
        <section
            className={"flex flex-row container h-dvh justify-around items-center"}
        >
            <Card className="sticky mx-auto shadow-lg w-[30rem] p-4">
                <CardHeader>
                    <CardTitle className="text-2xl">Agenda una cita</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">

                        <div className="grid gap-4">
                            <Label htmlFor="message-2">Razon de la consulta medica</Label>
                            <Textarea
                                {...form.register("reason")}
                                name={"reason"}
                                required
                                placeholder="Escribe tu razon aqui."
                                id="reason"
                            />
                            <p className="text-sm text-muted-foreground">
                                Nuestro personal revisara tu solicitud lo mas pronto posible.
                            </p>
                        </div>

                        <div className="grid gap-4">
                            <Label htmlFor="email">Fecha de la cita</Label>
                            <DatePickerForm
                                control={form.control}
                                name={"date"}
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Reservar cita
                        </Button>

                    </form>
                </CardContent>
            </Card>

            <div
                className={'flex flex-col gap-8 font-bold items-start px-12 justify-center w-1/2 h-dvh'}>
                <h1 className={"text-2xl"}>{"Aqui podras ver la lista de tu citas"}/a</h1>
                <AppointmentCard/>
            </div>
        </section>
    );
}

const preescriptions = [
    {
        title: "Aceclofenac 100mg",
        description: "20 tablets every 8 hours",
    },
    {
        title: "Paracetamol 500mg",
        description: "10 tablets every 6 hours",
    },
    {
        title: "Ibuprofen 200mg",
        description: "10 tablets every 8 hours",
    },
]

type CardProps = React.ComponentProps<typeof Card>

export function AppointmentCard({ className, ...props }: CardProps) {
    return (
        <Card className={cn("w-full font-normal", className)} {...props}>
            <CardHeader>
                <CardTitle>Dolor de cabeza | 24 de Mayo 2024</CardTitle>
            </CardHeader>
            <CardContent className="grid gap-4">
                <Badge className={"w-fit font-normal p-2 rounded-xl"} variant="default">Completada</Badge>
                <span>
                    Preecripcion medica
                </span>
                <div>
                    {preescriptions.map((notification, index) => (
                        <div
                            key={index}
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-emerald-950" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {notification.title}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {notification.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
