import {DataTable} from "@/components/ui/dataTable.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {
    MdKeyboardArrowDown,
} from "react-icons/md";
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import AppointmentDetail from "@/views/Appointments/AppointmentDetail.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import useSWR from "swr";
import {getAppointments, rejectAppointment} from "@/hooks/Appointments.tsx";
import {format} from "date-fns";
import {es} from "date-fns/locale";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import {toast} from "sonner";

export default function AppointmentTableView() {

    const {data, isLoading} = useSWR('/appointment/', getAppointments)

    const columns: ColumnDef<AppointmentRequest>[] = [
        {
            accessorKey: "f_solicitada",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Fecha de solicitud
                        <MdKeyboardArrowDown className="ml-2 h-4 w-4"/>
                    </Button>
                );
            },
            cell: ({cell}) => {
                const date = new Date(cell.row.original.f_solicitada!);
                const formattedDate = format(date, "PPP,p", {locale: es})
                return <p>{formattedDate}</p>;
            }
        },
        {
            accessorKey: "f_estimada_finalizacion",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        ETA de finalizacion
                        <MdKeyboardArrowDown className="ml-2 h-4 w-4"/>
                    </Button>
                );
            },
            cell: ({cell}) => {
                if (cell.row.original.f_estimada_finalizacion === null) return <p>-</p>;
                const date = new Date(cell.row.original.f_estimada_finalizacion!);
                const formattedDate = format(date, "PPP, p", {locale: es})
                return <p>{formattedDate}</p>;
            }
        },
        {
            accessorKey: "reason",
            header: "Razon de la consulta",
            cell: ({cell}) => {
                return (
                    <HoverCard>
                        <HoverCardTrigger>
                            {cell.row.original.reason.length > 50
                                ? `${cell.row.original.reason.substring(0, 50)}..`
                                : cell.row.original.reason}
                        </HoverCardTrigger>
                        <HoverCardContent>
                            {cell.row.original.reason}
                        </HoverCardContent>
                    </HoverCard>
                    );
            }
        },
        {
            accessorKey: "state",
            header: "Estado de la cita",
            cell: ({cell}) => {
                return (
                    <Badge
                        variant="default"
                        className="font-normal w-24 py-2 justify-center rounded-xl bg-sky-950"
                    >
                        {cell.row.original.state}
                    </Badge>
                )
            }
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({cell}) => {
                return (
                    <div className={'flex flex-row gap-2 justify-center items-center'}>
                        <AppointmentDetail appointment={cell.row.original}/>
                        <Button
                            variant="default"
                            onClick={ () => {
                                toast.promise(
                                    rejectAppointment(cell.row.original.id),
                                    {
                                        loading: 'Rechazando',
                                        success: 'Cita rechazada',
                                        error: 'Error al rechazar la cita',
                                    }
                                )
                            }}
                        >
                            Rechazar cita
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="container min-h-[100dvh] h-full py-16 flex flex-col justify-center items-center gap-12">
            <Card className={'w-full'}>
                <CardHeader>
                    <CardTitle>Lista de solicitudes de citas medicas</CardTitle>
                    <CardDescription>
                        En este apartado puedes administrar las solicitudes de citas medicas
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    {isLoading && <p>Cargando...</p>}
                    {data &&
                        <DataTable
                            columns={columns}
                            data={data}
                            shearchValue="reason"
                            searhValuePlaceholder="Buscar por razon de cita..."
                        />
                    }
                </CardContent>
            </Card>
        </div>
    );
}
