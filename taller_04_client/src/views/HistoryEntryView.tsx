import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {Label} from "@/components/ui/label"
import {Button} from "@/components/ui/button.tsx";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "sonner";
import {Textarea} from "@/components/ui/textarea.tsx";
import {Input} from "@/components/ui/input.tsx";

export const FormSchema = z.object({
    patient: z.string({
        required_error: "A patient name is required.",
    }),
    reason: z.string({
        required_error: "A reason is required.",
    }),
    date: z.date({
        required_error: "A date of birth is required.",
    }),
})

export default function HistoryEntryView() {
    

    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
    })

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast("You submitted the following values: " + JSON.stringify(data))
    }

    return (
        <section
            className={"flex flex-row container h-dvh justify-center items-center"}
        >
            <Card className="sticky mx-auto shadow-lg w-[30rem] p-4">
                <CardHeader>
                    <CardTitle className="text-2xl">Añade una entrada al historial médico</CardTitle>
                </CardHeader>
                <CardContent>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-8">

                        <div className="grid gap-4">
                            <label htmlFor="patient">Nombre del paciente </label>
                            <Input {...form.register("patient")}
                                   name={"patient"}
                                   id={"patient"}
                                   required placeholder={"Identificador del paciente"}
                            />

                        </div>

                        <div className="grid gap-4">
                            <Label htmlFor="reason">Razon de la entrada</Label>
                            <Textarea
                                {...form.register("reason")}
                                name={"reason"}
                                required
                                placeholder="Escribe tu razon aqui."
                                id="reason"
                            />
                        </div>

                        <Button type="submit" className="w-full">
                            Añadir entrada
                        </Button>

                    </form>
                </CardContent>
            </Card>


        </section>
    );
}

