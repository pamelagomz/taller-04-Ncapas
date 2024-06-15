import {DataTable} from "@/components/ui/dataTable.tsx";
import {ColumnDef} from "@tanstack/react-table";
import {
    MdKeyboardArrowDown,
    MdDeleteSweep,
} from "react-icons/md";
import {Button} from "@/components/ui/button.tsx";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {roles, users} from "@/data/dummydata.ts";
import {toast} from "sonner";
import {useState} from "react";

export default function UsersAdministration() {
    // TODO: fetch only active users that are doctors, assistants, and patients
    // const navigate = useNavigate();

    const [usersState, setUsers] = useState<User[]>(users); // Initialize state with imported homes

    const handleRemoveUser = (user: User) => {
        const updatedUsers = users.filter((u) => u.id !== user.id);
        setUsers(updatedUsers); // Update state with the new homes array
        toast.success(`Haz eliminado al usuario ${user.name} con exito.`);
    };

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
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button
                                size={'lg'}
                                variant={'ghost'}
                            >
                                {cell.row.original.roles[0]}
                                <MdKeyboardArrowDown className="ml-2 h-4 w-4"/>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="w-36">
                            <DropdownMenuLabel className={'font-semibold'}>
                                Seleccione un rol
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator/>
                            {roles.map((role, index) => (
                                <DropdownMenuItem
                                    key={index}
                                    onClick={() => {
                                        console.log(role); // TODO: Implement role update
                                        cell.row.original.roles[0] = role;
                                    }}
                                    className={'cursor-pointer'}
                                >
                                    {role}
                                </DropdownMenuItem>
                            ))}
                        </DropdownMenuContent>
                    </DropdownMenu>
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
        },
        {
            accessorKey: "active",
            header: "Activo",
            cell: ({cell}) => {
                return (
                    <Badge
                        variant="default"
                        className="font-normal w-24 py-2 justify-center rounded-xl bg-sky-950"
                    >
                        {cell.row.original.active ? "Activo" : "Inactivo"}
                    </Badge>
                )
            }
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({cell}) => {
                return (
                    <Button
                        variant={'ghost'}
                        className={'text-red-700'}
                        onClick={() => handleRemoveUser(cell.row.original)}
                        size={'icon'}>
                        <MdDeleteSweep className="h-4 w-4"/>
                    </Button>
                );
            },
        },
    ];

    return (
        <div className="container min-h-[100dvh] flex flex-col justify-center items-center gap-12">
            <h1 className="self-start text-3xl">{"Lista de usuarios registrados"}</h1>
            <DataTable
                columns={columns}
                data={usersState}
                shearchValue="name"
                searhValuePlaceholder="Buscar por nombre de usuario..."
            />
        </div>
    );
}
