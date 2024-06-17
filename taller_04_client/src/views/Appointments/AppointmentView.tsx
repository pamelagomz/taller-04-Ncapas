import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import DatePickerForm from "@/components/ui/datepicker.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import React, {useState} from "react";
import {cn} from "@/lib/utils.ts";
import {Badge} from "@/components/ui/badge.tsx";
import {cancelAppointment, getOwnAppointments, requestAppointment} from "@/hooks/Appointments.tsx";
import useSWR, {mutate} from "swr";
import {format} from "date-fns";
import {es} from "date-fns/locale";
import {useAuthContext} from "@/providers/AuthContext.tsx";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
} from "@/components/ui/select.tsx";

export const FormSchema = z.object({
    reason: z.string({
        required_error: "A reason is required.",
    }),
    date: z.date({
        required_error: "A date of birth is required.",
    }),
})

export default function AppointmentView() {
    const { user } = useAuthContext()
    const [state, setState] = useState<string>("")

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) =>{
        const res = await requestAppointment(data.reason, data.date)
        if(res){
            toast.success("Cita agendada correctamente")
            form.reset()
        }else{
            toast.error("Error al agendar la cita")
            return
        }
        toast.promise(
            mutate('/appointment/own'),
            {
                loading: 'Loading...',
                success: 'Appointment updated!',
                error: 'An error occurred',
            }
        )
    }

    const { data , isLoading} = useSWR(['/appointment/own', state], getOwnAppointments)

    return (
        <section
            className={"flex flex-row container min-h-dvh justify-around items-start"}
        >
            <Card className="sticky top-12 mx-auto shadow-lg w-[30rem] p-4">
                <CardHeader>
                    <CardTitle className="text-2xl">Agenda una cita</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">

                        <div className="grid gap-4">
                            <Label htmlFor="reason">Razon de la consulta medica</Label>
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
                            <Label htmlFor="date">Fecha de la cita</Label>
                            <DatePickerForm
                                control={form.control}
                                id={"date"}
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
                className={'flex flex-row flex-wrap w-2/3 gap-8 font-bold items-center px-12 justify-center py-10'}>
                <div className={'flex flex-row gap-4 items-center'}>
                    <h1 className={"text-2xl"}>{"Aqui podras ver la lista de tu citas"}</h1>
                    <Select onValueChange={
                        (value) => setState(value == 'All' ? '' : value)} defaultValue={""}>
                        <SelectTrigger className="w-fit">
                        </SelectTrigger>
                        <SelectContent>
                            <SelectGroup>
                                <SelectLabel>Status</SelectLabel>
                                <SelectItem value="Approved">Approved</SelectItem>
                                <SelectItem value="Rejected">Rejected</SelectItem>
                                <SelectItem value="Requested">Requested</SelectItem>
                                <SelectItem value="Canceled">Canceled</SelectItem>
                                <SelectItem value="In progress">In progress</SelectItem>
                                <SelectItem value="Completed">Completed</SelectItem>
                                <SelectItem value="All">All</SelectItem>
                            </SelectGroup>
                        </SelectContent>
                    </Select>
                </div>
                {isLoading && <p>Loading...</p>}
                {
                    user && user.roles.map(
                        (role) => role.name === "Patient"
                    ) && (
                        data?.map((
                            appointment: AppointmentRequest,
                            index: number
                        ) => (
                            <AppointmentCard
                                key={index}
                                appointment={appointment}
                            />
                        ))
                    )
                }
            </div>
        </section>
    );
}

type AppointmentCardProps = {
    appointment: AppointmentRequest
}

type CardProps = React.ComponentProps<typeof Card> & AppointmentCardProps;

export function AppointmentCard({className, appointment, ...props}: CardProps) {

    const date = new Date(appointment.f_solicitada!);
    const formattedDate = format(date, "PPP, p", {locale: es})

    return (
        <Card className={cn("w-[450px] font-normal", className)} {...props}>
            <CardHeader>
                <CardTitle className={'text-lg font-medium'}>
                    <HoverCard>
                        <HoverCardTrigger>
                            {appointment.reason.length > 50
                                ? `${appointment.reason.substring(0, 50)}..`
                                : appointment.reason}
                        </HoverCardTrigger>
                        <HoverCardContent>
                            {appointment.reason}
                        </HoverCardContent>
                    </HoverCard>
                </CardTitle>
                <div className={'flex flex-row gap-4 items-center text-sm text-gray-500'}><Badge
                    className={"w-fit font-normal p-2 rounded-xl"}
                    variant="default">{appointment.state}</Badge> {formattedDate}</div>
            </CardHeader>
            <CardContent className="grid gap-4">
                <div>
                    {appointment.prescriptions.map((notification, index) => (
                        <div
                            key={index}
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-emerald-950" />
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {notification.medicine}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {notification.dosis}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <Button
                    variant={'outline'}
                    size={'lg'}
                    onClick={ () => {
                        if (appointment.state === 'Canceled'){
                            toast.error("La cita ya ha sido cancelada")
                            return
                        }
                        toast.promise(
                            cancelAppointment(appointment.id),
                            {
                                loading: 'Cancelando cita',
                                success: () => {
                                    return 'Cita cancelada'
                                },
                                error: 'Error al cancelar la cita',
                            }
                        )
                    }}
                >
                    Cancelar cita
                </Button>
            </CardContent>
        </Card>
    )
}
