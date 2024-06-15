import axios from "axios";

export const requestAppointment = async (reason: string, date: Date) => {
    try {
        const res = await axios.post('/appointment/request', {
            reason: reason,
            date: date,
        })

        return res.status === 200
    } catch (error) {
        return error
    }
}

export const getAppointments = async (url:string) => {
    try {
        const res = await axios.get(url,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('neigh_secure_token')}`
                }
            }
        )
        return res.data.data
    } catch (error) {
        return error
    }
}

export const getDoctors = async (url : string) =>{
    try {
        const res = await axios.get(url,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('neigh_secure_token')}`
                }
            }
        )
        return res.data.data
    } catch (error) {
        return error
    }
}
