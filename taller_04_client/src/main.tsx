import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {Toaster} from "@/components/ui/sonner"

import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_APIENDPOINT || "http://localhost:8080/neighSecure";

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <Toaster richColors/>
        <App/>
    </React.StrictMode>,
)
