import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Label} from "@/components/ui/label.tsx";
import DatePickerForm from "@/components/ui/datepicker.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import {Input} from "@/components/ui/input"
import useSWR, { mutate } from "swr";
import {approveAppointment, getDoctors} from "@/hooks/Appointments.tsx";
import {Key} from "react";
import {
    DropdownMenu, DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger
} from "@/components/ui/dropdown-menu.tsx";
import {ChevronDown} from "lucide-react";

export const FormSchema = z.object({
    estimateTime: z.string({
        required_error: "A reason is required.",
    }),
    date: z.date({
        required_error: "A date of birth is required.",
    }),
    doctorId: z.array(z.string()),
    specialityCode: z.string(),
})

interface AppointmentDetailProps {
    appointment: AppointmentRequest
}

export function AppointmentDetail({appointment}: AppointmentDetailProps) {

    const {data: doctors} = useSWR('/clinic/doctors', getDoctors)
    const {data: specializations} = useSWR('/clinic/specializations', getDoctors)

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            estimateTime: "",
            date: new Date(),
            doctorId: [],
            specialityCode: "",
        }
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        //toast("You submitted the following values: " + JSON.stringify(data))
        toast.promise(approveAppointment(
            appointment.id,
            data.date,
            parseInt(data.estimateTime),
            data.doctorId,
            data.specialityCode
        ), {
            loading: 'Guardando cita',
            success: 'Cita guardada',
            error: 'Error al guardar la cita',
        })

        toast.promise(mutate('/appointment/'), {
            loading: 'Cargando citas',
            success: 'Citas cargadas',
            error: 'Error al cargar las citas',
        })
    }

    const doctorIds = form.watch("doctorId");

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Aceptar cita</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{'Aceptar cida medica'}</DialogTitle>
                    <DialogDescription>
                        {'Por favor selecciona la fecha y hora de la cita, asi como el doctor que atendera la cita medica.'}
                    </DialogDescription>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 gap-4 py-4">

                    <div className="grid gap-4">
                        <Label htmlFor="hour">
                            Tiempo estiamdo (Minutos)
                        </Label>
                        <Input id="hour" placeholder={"10m"} {...form.register("estimateTime")} className="col-span-3"/>
                    </div>

                    <div className="grid gap-4">
                        <Label htmlFor="email">Fecha de la cita</Label>
                        <DatePickerForm
                            control={form.control}
                            name={"date"}
                        />
                    </div>

                    <div className="grid gap-4">
                        <Label htmlFor="email">Selecciona un doctor</Label>

                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    className={'py-2 justify-between px-3'}
                                    variant="outline"
                                >
                                    Selecciona la lista de doctores
                                    <ChevronDown className="ml-4 h-4 w-4 opacity-50"/>
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent className="w-[375px]">
                                {
                                    doctors?.map((doctor: {
                                        id: string;
                                        name: string;
                                    }, index: number) => (
                                        <DropdownMenuCheckboxItem
                                            key={index}
                                            checked={doctorIds.includes(doctor.id)}
                                            onCheckedChange={(checked) => {
                                                if (checked) {
                                                    form.setValue("doctorId", [...doctorIds, doctor.id])
                                                } else {
                                                    form.setValue("doctorId", doctorIds.filter((id: string) => id !== doctor.id))
                                                }
                                            }}
                                        >
                                            {doctor.name}
                                        </DropdownMenuCheckboxItem>
                                    ))
                                }
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>

                    <div className="grid gap-4">
                        <Label htmlFor="email">{'Selecciona una especializacion'}</Label>
                        <Select
                            onValueChange={(value) => form.setValue("specialityCode", value)}
                        >
                            <SelectTrigger className={'py-6'}>
                                <SelectValue placeholder="Selecciona una especializacion"/>
                            </SelectTrigger>
                            <SelectContent>
                                {specializations?.map((speciality: {
                                    code: string;
                                    name: string;
                                }, index: Key | null | undefined) => (
                                    <SelectItem
                                        key={index}
                                        value={speciality.code}
                                    >{speciality.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>
                    <DialogClose asChild>
                        <Button type="submit">{'Aceptar cita'}</Button>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default AppointmentDetail;
