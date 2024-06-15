import {DataTable} from "@/components/ui/dataTable.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {
    MdKeyboardArrowDown,
} from "react-icons/md";
import {Button} from "@/components/ui/button.tsx";
import {useState} from "react";

export default function PrescriptionPatientView() {
    // TODO: fetch only active users that are doctors, assistants, and patients
    // const navigate = useNavigate();
    const [prescriptionsState, setPrescriptions] = useState<Prescription[]>([]); // Initialize state with fetched prescriptions


    const columns: ColumnDef<Prescription>[] = [
        {
            accessorKey: "id",
            header: ({ column }) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        ID
                        <MdKeyboardArrowDown className="ml-2 h-4 w-4" />
                    </Button>
                );
            },
        },
        {
            accessorKey: "medicine",
            header: "Medicamento",
        },
        {
            accessorKey: "dosis",
            header: "Dosis",
        },
        {
            accessorKey: "finalDate",
            header: "Fecha de finalización",
        },
        {
            id: "actions",
            header: "Acciones",

        },
    ];

    return (
        <div className="container min-h-[100dvh] flex flex-col justify-center items-center gap-12">
            <h1 className="self-start text-3xl">{"Lista de prescripciones del paciente"}</h1>
            <DataTable
                columns={columns}
                data={prescriptionsState}
                shearchValue="medicine"
                searhValuePlaceholder="Buscar por medicamento..."
            />
        </div>
    );
}
