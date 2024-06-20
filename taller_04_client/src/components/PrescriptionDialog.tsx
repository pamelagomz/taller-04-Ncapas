import {Button} from "@/components/ui/button.tsx";
import {
    Dialog, DialogClose,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import {getPrescriptions} from "@/hooks/User.tsx";
import useSWR from "swr";

type PrescriptionDialogProps = {
    identifier: string;
}

const PrescriptionDialog = ({ identifier }: PrescriptionDialogProps) => {

    const { data, isLoading } = useSWR(identifier, getPrescriptions)

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="outline">Ver prescripciones</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{'Prescripcion del usuario'}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">

                    {isLoading && <p>{'Cargando...'}</p>}
                    {!data && <p>{'No hay prescripciones'}</p>}
                    {data && data.map((prescription: Prescription, index: number) => (
                        prescription.medicine && (
                            <div
                                key={index}
                                className="grid grid-cols-[25px_1fr] items-start last:mb-0 last:pb-0"
                            >
                                <span className="flex h-2 w-2 translate-y-1 rounded-full bg-emerald-950"/>
                                <div className="space-y-1">
                                    <p className="text-sm font-medium leading-none">
                                        {prescription.medicine}
                                    </p>
                                    <p className="text-sm text-muted-foreground">
                                        {prescription.dosis}
                                    </p>
                                </div>
                            </div>
                        )
                    ))}

                </div>
                <DialogClose asChild>
                    <Button type="button">{'Cerrar'}</Button>
                </DialogClose>
            </DialogContent>
        </Dialog>
    )
}

export default PrescriptionDialog;
