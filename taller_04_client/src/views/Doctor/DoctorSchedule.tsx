import {
    Card,
    CardContent, CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {Label} from "@/components/ui/label.tsx"
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import DatePickerForm from "@/components/ui/datepicker.tsx";
import React, {useState} from "react";
import {cn} from "@/lib/utils.ts";
import {getDoctorSchedule} from "@/hooks/Appointments.tsx";
import useSWR from "swr";
import {format} from "date-fns";
import {es} from "date-fns/locale";

export const FormSchema = z.object({
    date: z.date({
        required_error: "A date of birth is required.",
    }),
})

export default function DoctorSchedule() {
    const [state, setState] = useState<Date>(new Date())

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        console.log(JSON.stringify(data));
        setState(data.date)
    }

    const {data, isLoading} = useSWR(state, getDoctorSchedule)

    return (
        <section
            className={"flex flex-row container min-h-dvh justify-around items-start"}
        >
            <Card className="sticky top-12 mx-auto shadow-lg w-[30rem] p-4">
                <CardHeader>
                    <CardTitle className="text-2xl">Agenda de citas</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">
                        <div className="grid gap-4">
                            <Label htmlFor="date">Fecha de la cita</Label>
                            <DatePickerForm
                                control={form.control}
                                id={"date"}
                                name={"date"}
                            />
                            <p className="text-sm text-muted-foreground">
                                Puedes filtrar las citas por el dia seleccionado
                            </p>
                        </div>

                        <Button type="submit" className="w-full">
                            Filtrar por dia seleccionado
                        </Button>

                    </form>
                </CardContent>
            </Card>

            <div
                className={'flex flex-row flex-wrap w-2/3 gap-8 font-bold items-center px-12 justify-center py-10'}>
                <h1 className={"text-2xl"}>{"Aqui podras ver la lista de tu citas"}</h1>
                {isLoading && <p>Loading...</p>}
                {
                    data?.map((
                        scheduleInfo: DoctorSchedule,
                        index: number
                    ) => (
                        <AppointmentCard
                            key={index}
                            scheduleInfo={scheduleInfo}
                        />
                    ))
                }
            </div>
        </section>
    );
}

type AppointmentCardProps = {
    scheduleInfo: DoctorSchedule
}

type CardProps = React.ComponentProps<typeof Card> & AppointmentCardProps;

export function AppointmentCard({className, scheduleInfo, ...props}: CardProps) {

    return (
        <Card className={cn("w-[450px] font-normal", className)} {...props}>
            <CardHeader>
                <CardTitle className="text-xl">
                    Cita medica
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col w-full gap-4">
                <div className={'flex flex-col gap-4'}>
                    <CardDescription>
                        Medicos asignados
                    </CardDescription>
                    {scheduleInfo.medics.map((medic, index) => (
                        <div
                            key={index}
                            className=" grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0"
                        >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-emerald-950"/>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {medic.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {medic.email}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
                <div className={'flex flex-col w-full gap-4'}>
                    <CardDescription>
                        Historial medico
                    </CardDescription>
                    {scheduleInfo.medicalHistories.map((history, index) => (
                        <div
                            key={index}
                            className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                        >
                            <span className="flex h-2 w-2 translate-y-1 rounded-full bg-emerald-950"/>
                            <div className="space-y-1">
                                <p className="text-sm font-medium leading-none">
                                    {history && history.date && format(new Date(history.date), "PPP, p", {locale: es})}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    {history.user.name}
                                </p>
                                <p className="text-sm text-muted-foreground">
                                    Razon: {history.reason}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}
