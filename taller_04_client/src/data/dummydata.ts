export let users: User[] = [
    {
        id: "1",
        name: "John Doe",
        email: "john.doe@example.com",
        active: true,
        roles: ["Admin", "Doctor"]
    },
    {
        id: "2",
        name: "Jane Smith",
        email: "jane.smith@example.com",
        active: false,
        roles: ["Patient"]
    },
    {
        id: "3",
        name: "Bob Johnson",
        email: "bob.johnson@example.com",
        active: true,
        roles: ["Doctor"]
    }
]

export const appointments : AppointmentRequest[] = [
    {
        id: "1",
        patient: "Paciente 1",
        date: "2023-05-24",
        reason: "Dolor de cabeza",
        status: "Completada"
    },
    {
        id: "2",
        patient: "Paciente 2",
        date: "2023-06-15",
        reason: "Chequeo rutinario",
        status: "Pendiente"
    },
    {
        id: "3",
        patient: "Paciente 3",
        date: "2023-07-01",
        reason: "Dolor de estómago",
        status: "Cancelada"
    },
    // Agrega más citas según sea necesario
]

export const roles: string[] = ["Admin", "Doctor", "Assistant", "Patient"]
