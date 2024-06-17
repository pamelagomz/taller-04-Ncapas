import {
    Card,
    CardContent, CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card.tsx"
import {Label} from "@/components/ui/label.tsx"
import React from "react";
import {cn} from "@/lib/utils.ts";
import useSWR from "swr";
import {addDays, format} from "date-fns";
import {es} from "date-fns/locale";
import {getUserRecord} from "@/hooks/User.tsx";
import {DateRange} from "react-day-picker";
import {DatePickerWithRange} from "@/components/DateRangePicker.tsx";

export default function UserRecord() {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2024, 5, 1),
        to: addDays(new Date(2024, 5, 1), 20),
    })

    const {data, isLoading} = useSWR([date!.from!, date!.to!], getUserRecord)

    return (
        <section
            className={"flex flex-row container min-h-dvh justify-around items-start"}
        >
            <Card className="sticky top-12 mx-auto shadow-lg w-[30rem] p-4">
                <CardHeader>
                    <CardTitle className="text-2xl">Record medico</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="grid gap-8">
                        <div className="grid gap-4">
                            <Label htmlFor="date">Rango de fechas a filtrar</Label>
                            <DatePickerWithRange
                                date={date} setDate={setDate}
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            <div
                className={'flex flex-col w-2/3 gap-8 font-bold items-center px-12 justify-center py-10'}>
                <h1 className={"text-2xl"}>{"Aqui podras ver tu record medico"}</h1>
                {isLoading && <p>Loading...</p>}
                {!data && !isLoading && <p>No hay citas para mostrar en este rango de fechas</p>}
                {
                    data?.map((
                        medicalHistory: MedicalHistory,
                        index: number
                    ) => (
                        <AppointmentCard
                            key={index}
                            medicalHistory={medicalHistory}
                        />
                    ))
                }
            </div>
        </section>
    );
}

type AppointmentCardProps = {
    medicalHistory: MedicalHistory
}

type CardProps = React.ComponentProps<typeof Card> & AppointmentCardProps;

export function AppointmentCard({className, medicalHistory, ...props}: CardProps) {

    return (
        <Card className={cn("w-[450px] font-normal", className)} {...props}>
            <CardHeader>
                <CardTitle className="text-xl">
                    Historial medico
                </CardTitle>
            </CardHeader>
            <CardContent className="flex flex-col w-full gap-4">
                <div className={'flex flex-col gap-4'}>
                    Fecha del historial
                    <CardDescription>
                        {medicalHistory && medicalHistory.date && format(new Date(medicalHistory.date), "PPP, p", {locale: es})}
                    </CardDescription>
                </div>
                <div className={'flex flex-col w-full gap-4'}>
                    Razon del historial
                    <CardDescription>
                        {medicalHistory && medicalHistory.reason}
                    </CardDescription>
                </div>
            </CardContent>
        </Card>
    )
}
