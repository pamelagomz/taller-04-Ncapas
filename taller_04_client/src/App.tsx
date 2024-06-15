import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {APPOINTMENTS, HISTORY, PRIVATE} from "@/routes/Paths.tsx";
import PrivateRoute from "@/routes/PrivateRoute.tsx";
import PublicRoute from "@/routes/PublicRoute.tsx";
import LoginView from "@/views/LoginView.tsx";
import RegisterView from "@/views/RegisterView.tsx";
import AppointmentView from "@/views/Appointments/AppointmentView.tsx";
import HistoryEntryView from "@/views/HistoryEntryView.tsx";
import AssistantsRoute from "@/routes/AssistantsRoute.tsx";
import AppointmentTableView from "@/views/Appointments/AppointmentTableView.tsx";
import UsersAdministration from "@/views/Users/UsersAdministration.tsx";
import AdminRoute from "@/routes/AdminRoute.tsx";

const router = createBrowserRouter([
    {
        path: PRIVATE,
        element: <PrivateRoute/>,
        children: [
            {
                index: true,
                element: <AppointmentView/>,
            },
        ],
    },
    {
        path: "/admin",
        element: <AdminRoute/>,
        children: [
            {
                index: true,
                element: <UsersAdministration/>,
            },
        ],
    },
    {
        path: "/assistant",
        element: <AssistantsRoute/>,
        children: [
            {
                index: true,
                element: <AppointmentTableView/>,
            },
            {
                path: "/assistant/history",
                element: <HistoryEntryView/>,
            },
        ],
    },
    {
        path: "/",
        element: <PublicRoute/>,
        children: [
            {
                index: true,
                element: <LoginView/>,
            },
            {
                path: "signup",
                element: <RegisterView/>,
            },
            {
                path: "appointments",
                element: <AppointmentView/>,
            },
        ],
    },
]);

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
