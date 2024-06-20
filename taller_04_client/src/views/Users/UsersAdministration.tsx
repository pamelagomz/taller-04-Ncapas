import {DataTable} from "@/components/ui/dataTable.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {
    MdKeyboardArrowDown,
} from "react-icons/md";
import {Button} from "@/components/ui/button.tsx";
import useSWR from "swr";
import {getAllUsers} from "@/hooks/User.tsx";
import UserUpdateDialog from "@/views/Users/UserUpdateDialog.tsx";

export default function UsersAdministration() {

    const {data, isLoading} = useSWR('/user/all', getAllUsers)

    const columns: ColumnDef<User>[] = [
        {
            accessorKey: "id",
            header: ({column}) => {
                return (
                    <Button
                        variant="ghost"
                        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
                    >
                        ID
                        <MdKeyboardArrowDown className="ml-2 h-4 w-4"/>
                    </Button>
                );
            },
        },
        {
            accessorKey: "roles",
            header: "Rol",
            cell: ({cell}) => {
                return (
                    <UserUpdateDialog
                        identifier={cell.row.original.email!}
                        roles={cell.row.original.roles!}
                    />
                );
            }
        },
        {
            accessorKey: "name",
            header: "Nombre",
        },
        {
            accessorKey: "email",
            header: "Correo electrónico",
        }
    ];

    return (
        <div className="container min-h-[100dvh] flex flex-col justify-center items-center gap-12">
            <h1 className="self-start text-3xl">{"Lista de usuarios registrados"}</h1>
            {isLoading && <p>Cargando...</p>}
            {data &&
            <DataTable
                columns={columns}
                data={data}
                shearchValue="name"
                searhValuePlaceholder="Buscar por nombre de usuario..."
            />}
        </div>
    );
}
