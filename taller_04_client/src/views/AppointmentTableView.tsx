import { DataTable } from "@/components/ui/dataTable";
import { ColumnDef } from "@tanstack/react-table";
import {
    MdMoreHoriz,
    MdKeyboardArrowDown,
    MdDeleteSweep,
} from "react-icons/md";

import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import {toast} from "sonner";

export default function AppointmentTableView() {
    const navigate = useNavigate();

    // const [homesState, setHomesState] = useState(homes); // Initialize state with imported homes
    //
    // const handleRemoveHome = (home: Home) => {
    //     const updatedHomes = homesState.filter((h) => h.id !== home.id);
    //     setHomesState(updatedHomes); // Update state with the new homes array
    //     toast.success("Listo!.", {
    //         description: `Haz eleminado la casa <span class="font-bold"> # ${home.homeNumber}</span> con exito.`
    //     });
    // };

    const appointments = [
        {
            id: 1,
            patient: "Paciente 1",
            date: "2023-05-24",
            reason: "Dolor de cabeza",
            status: "Completada"
        },
        {
            id: 2,
            patient: "Paciente 2",
            date: "2023-06-15",
            reason: "Chequeo rutinario",
            status: "Pendiente"
        },
        {
            id: 3,
            patient: "Paciente 3",
            date: "2023-07-01",
            reason: "Dolor de estómago",
            status: "Cancelada"
        },
        // Agrega más citas según sea necesario
    ]

    const columns: ColumnDef<AppointmentRequest>[] = [
        {
            accessorKey: "id",
            header: "ID",
        },
        {
            accessorKey: "patient",
            header: "Paciente",
        },
        {
            accessorKey: "date",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        Fecha
                        <MdKeyboardArrowDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "reason",
            header: "Razon de la consulta",
        },
        {
            accessorKey: "status",
            header: "Estado de la cita",
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ cell }) => {
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MdMoreHoriz className="h-4 w-4" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem
                                onClick={() => {
                                    navigate(`/admin/hogares/${cell.row.original.id}`);
                                }}
                                className="cursor-pointer"
                            >
                                {"Ver mas informacion"}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem
                                //onClick={() => handleRemoveHome(cell.row.original)}
                                className="bg-red-500 cursor-pointer text-white"
                            >
                                <MdDeleteSweep className="w-5 h-5 mr-2" /> {"Eliminar"}
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];

    return (
        <div className="container lg:w-[80%] flex flex-col justify-center items-center gap-12">
            <h1 className="self-start text-3xl ">{"Lista de solicitudes de citas "}</h1>
            <DataTable
                columns={columns}
                data={appointments}
                shearchValue="admin"
                searhValuePlaceholder="Buscar por usuario..."
                addValue={true}
                onAddValue={() => navigate("/admin/hogares/agregar")}
            />
        </div>
    );
}