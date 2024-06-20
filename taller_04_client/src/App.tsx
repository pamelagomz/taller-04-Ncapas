import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {PRIVATE} from "@/routes/Paths.tsx";
import PrivateRoute from "@/routes/PrivateRoute.tsx";
import PublicRoute from "@/routes/PublicRoute.tsx";
import LoginView from "@/views/Auth/LoginView.tsx";
import RegisterView from "@/views/Auth/RegisterView.tsx";
import AppointmentView from "@/views/Appointments/AppointmentView.tsx";
import HistoryEntryView from "@/views/Users/HistoryEntryView.tsx";
import AssistantsRoute from "@/routes/AssistantsRoute.tsx";
import AppointmentTableView from "@/views/Appointments/AppointmentTableView.tsx";
import UsersAdministration from "@/views/Users/UsersAdministration.tsx";
import AdminRoute from "@/routes/AdminRoute.tsx";
import DoctorRoute from "@/routes/DoctorRoute.tsx";
import AppointmentTableViewDoctor from "@/views/Appointments/AppointmentTableViewDoctor.tsx";
import DoctorSchedule from "@/views/Doctor/DoctorSchedule.tsx";
import UserRecord from "@/views/Users/UserRecord.tsx";
import UserRoute from "@/routes/UserRoute.tsx";
import UsersTableView from "@/views/Doctor/UsersTableView.tsx";

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
        path: "/doctor",
        element: <DoctorRoute/>,
        children: [
            {
                index: true,
                element: <AppointmentTableViewDoctor/>,
            },
            {
                path: '/doctor/schedule',
                element: <DoctorSchedule/>
            },
            {
                path: '/doctor/prescriptions',
                element: <UsersTableView/>
            }
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
        ],
    },
    {
        path: "/user",
        element: <UserRoute/>,
        children: [
            {
                index: true,
                element: <AppointmentView/>,
            },
            {
                path: '/user/record',
                element: <UserRecord/>
            }
        ],
    }
]);

function App() {
    return (
        <RouterProvider router={router}/>
    )
}

export default App
