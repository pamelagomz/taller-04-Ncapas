import {z} from "zod";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Label} from "@/components/ui/label.tsx";
import {Button} from "@/components/ui/button.tsx";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {addPrescription} from "@/hooks/User.tsx";
import {mutate} from "swr";
import {useAuthContext} from "@/providers/AuthContext.tsx";
import {Textarea} from "@/components/ui/textarea.tsx";
import DatePickerForm from "@/components/ui/datepicker.tsx";

export const FormSchema = z.object({
    medicine: z.string(),
    dosis: z.string(),
    finalDate: z.date(),
})

type UserUpdateDialogProps = {
    medicalAppointmentId: string;
}

const UserUpdateDialog = ({ medicalAppointmentId }: UserUpdateDialogProps) => {

    const { user } = useAuthContext();

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            medicine: "",
            dosis: "",
            finalDate: new Date(),
        }
    })

    const onSubmit = async (data: z.infer<typeof FormSchema>) => {
        //toast("You submitted the following values: " + JSON.stringify(data))
        const prescription : Prescription = {
            medicine: data.medicine,
            dosis: data.dosis,
            finalDate: data.finalDate,
        }

        toast.promise(addPrescription(
            medicalAppointmentId,
            prescription
        ), {
            loading: 'Agregando receta...',
            success: () : string => {
                mutate(`/appointment/${user?.id}`)
                form.reset()
                return 'Receta agregada correctamente'
            },
            error: 'Error al agregar la receta',
        })
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Agregar prescripcion</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{'Agregar una receta la cita medica'}</DialogTitle>
                </DialogHeader>
                <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8 gap-4 py-4">

                    <div className="grid gap-4">
                        <Label htmlFor="reason">Medicina</Label>
                        <Textarea
                            {...form.register("medicine")}
                            name={"medicine"}
                            required
                            placeholder="Paracetalamol, Ibuprofeno, etc."
                            id="medicine"
                        />
                    </div>

                    <div className="grid gap-4">
                        <Label htmlFor="reason">Dosis de la medicina</Label>
                        <Textarea
                            {...form.register("dosis")}
                            name={"dosis"}
                            required
                            placeholder="1 pastilla cada 8 horas, etc."
                            id="dosis"
                        />
                    </div>

                    <div className="grid gap-4">
                        <Label htmlFor="date">Fecha de expiracion</Label>
                        <DatePickerForm
                            control={form.control}
                            id={"finalDate"}
                            name={"finalDate"}
                        />
                    </div>

                    <DialogClose asChild>
                        <Button type="submit">{'Agregar'}</Button>
                    </DialogClose>
                </form>
            </DialogContent>
        </Dialog>
    )
}

export default UserUpdateDialog;
