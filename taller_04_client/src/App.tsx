import './App.css'
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import {APPOINTMENTS, HISTORY, PRIVATE} from "@/routes/Paths.tsx";

import PrivateRoute from "@/routes/PrivateRoute.tsx";
import PublicRoute from "@/routes/PublicRoute.tsx";
import LoginView from "@/views/LoginView.tsx";
import RegisterView from "@/views/RegisterView.tsx";
import AppointmentView from "@/views/AppointmentView.tsx";
import HistoryEntryView from "@/views/HistoryEntryView.tsx";
import AppointmentTableView from "@/views/AppointmentTableView.tsx";

const router = createBrowserRouter([
    {
        path: PRIVATE,
        element: <PrivateRoute />,
        children: [
            {
                index: true,
                element: <AppointmentView/>,
            },
        ],
    },
    {
        path: "/",
        element: <PublicRoute />,
        children: [
            {
                index: true,
                element: <LoginView />,
            },
            {
                path: "signup",
                element: <RegisterView />,
            },
            {
                path: HISTORY,
                element: <HistoryEntryView/>,

            },
            {
                path: APPOINTMENTS,
                element: <AppointmentTableView/>,

            }
        ],
    },
]);

function App() {
    return (
        <RouterProvider router={router} />
    )
}

export default App
