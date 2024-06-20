import {DataTable} from "@/components/ui/dataTable.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {
    MdKeyboardArrowDown,
} from "react-icons/md";
import {Button} from "@/components/ui/button.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card.tsx";
import useSWR from "swr";
import {finishAppointment, getAppointmentByDoctor} from "@/hooks/Appointments.tsx";
import {format} from "date-fns";
import {es} from "date-fns/locale";
import {HoverCard, HoverCardContent, HoverCardTrigger} from "@/components/ui/hover-card.tsx";
import {toast} from "sonner";
import {useAuthContext} from "@/providers/AuthContext.tsx";
import AddPrescriptionDialog from "@/components/AddPrescriptionDialog.tsx";

export default function AppointmentTableViewDoctor() {

    const {user} = useAuthContext()

    const {data, isLoading} = useSWR(user?.id, getAppointmentByDoctor)

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
                if (cell.row.original.f_solicitada === null) return
                const date = new Date(cell.row.original.f_solicitada!);
                const formattedDate = format(date, "PPP,p", {locale: es})
                return <p>{formattedDate}</p>;
            }
        },
        {
            accessorKey: "f_finalizacion",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Fecha de finalizacion
                        <MdKeyboardArrowDown className="ml-2 h-4 w-4"/>
                    </Button>
                );
            },
            cell: ({cell}) => {
                if (cell.row.original.f_finalizacion === null) return <p>-</p>;
                const date = new Date(cell.row.original.f_finalizacion!);
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
                            {cell.row.original.reason && cell.row.original.reason.length > 50
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
                    <div className={'space-x-2'}>
                        <AddPrescriptionDialog medicalAppointmentId={cell.row.original.id}/>
                        <Button
                            variant="default"
                            onClick={() => {
                                toast.promise(
                                    finishAppointment(cell.row.original.id),
                                    {
                                        loading: 'Finalizando cita...',
                                        success: 'Cita finalizada',
                                        error: 'Error al finalizar la cita',
                                    }
                                )
                            }}
                        >
                            Finalizar cita
                        </Button>
                    </div>
                );
            },
        },
    ];

    return (
        <div className="container min-h-[100dvh] flex flex-col justify-center items-center gap-12">
            <Card className={'w-full'}>
                <CardHeader>
                    <CardTitle>Lista de citas medica asignadas</CardTitle>
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

// <PrescriptionDialog
//     identifier={cell.row.original.attend.user.id!}
// />
