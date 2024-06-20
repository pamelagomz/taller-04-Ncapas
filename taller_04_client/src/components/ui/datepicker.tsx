import {format} from "date-fns"
import {cn} from "@/lib/utils"
import {Button} from "@/components/ui/button"
import {Calendar} from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import {useController, UseControllerProps} from "react-hook-form";
import {MdOutlineCalendarMonth} from "react-icons/md";
import {es} from "date-fns/locale";


const DatePickerForm = (props: UseControllerProps) => {

    const {field } = useController(props);

    return(
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "justify-start pl-3 text-left font-normal",
                        !field.value && "text-muted-foreground"
                    )}
                >
                    <MdOutlineCalendarMonth className="mr-2 h-4 w-4" />
                    {field.value ? (
                        format(field.value, "PPP" , { locale: es} )
                    ) : (
                        <span>Selecciona una fecha</span>
                    )}
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="center">
                <Calendar
                    mode="single"
                    selected={typeof field.value === 'string' ? new Date(field.value) : field.value}
                    onSelect={(date) => {
                        field.onChange(date);
                    }}
                    initialFocus
                />
            </PopoverContent>
        </Popover>
    )
}

export default DatePickerForm;
