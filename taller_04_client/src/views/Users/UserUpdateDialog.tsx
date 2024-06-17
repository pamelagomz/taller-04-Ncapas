import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {updateUserRoles} from "@/hooks/User.tsx";
import {Badge} from "@/components/ui/badge.tsx";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select.tsx";
import {mutate} from "swr";
const rolesList = [
    {
        code: "PATN",
        name: "Patient"
    },
    {
        code: "DOCT",
        name: "Doctor"
    },
    {
        code: "ASST",
        name: "Assistant"
    },
    {
        code: "ADMN",
        name: "Admin"
    },
    {
        code: "USER",
        name: "User"
    }
]

export const FormSchema = z.object({
    roles: z.string(),
})

type UserUpdateDialogProps = {
    identifier: string;
    roles: Role[];
}

const UserUpdateDialog = ({identifier, roles}: UserUpdateDialogProps) => {

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            roles: '',
        }
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        //toast("You submitted the following values: " + JSON.stringify(data))
        toast.promise(updateUserRoles(
            identifier,
            data.roles
        ), {
            loading: 'Actualizando roles...',
            success: () : string => {
                mutate('/user/all')
                return 'Roles actualizados correctamente'
            },
            error: 'Error al actualizar los roles',
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Update rol</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{'Actualizar roles del usuario'}</DialogTitle>
                    <DialogDescription>
                        {'Roles actuales del usuario: '}
                    </DialogDescription>
                    <div className={'space-x-2'}>
                        {roles.map((role: {
                            code: string;
                            name: string;
                        }, index: number) => (
                            <Badge key={index} className={'font-normal rounded-lg'}>{role.name}</Badge>
                        ))}
                    </div>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 gap-4 py-4">

                    <div className="grid gap-4">
                        <Label htmlFor="email">Selecciona el rol que asignar al usuario</Label>

                        <Select
                            onValueChange={(value) => {form.setValue("roles", value)}}
                        >
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Selecciona un rol" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {
                                        rolesList.map((role: {
                                            code: string;
                                            name: string;
                                        }, index: number) => (
                                            <SelectItem
                                                key={index}
                                                value={role.code}
                                            >
                                                {role.name}
                                            </SelectItem>
                                        ))
                                    }
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>

                    <DialogClose asChild>
                        <Button type="submit">{'Actualizar'}</Button>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UserUpdateDialog;
