import axios from "axios";

export const requestAppointment = async (reason: string, date: Date) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.post('/appointment/request', {
            reason: reason,
            date: date,
        })

        return res.status === 200
    } catch (error) {
        throw error
    }
}

export const getAppointments = async (url: string) => {
    // eslint-disable-next-line no-useless-catch
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
        throw error
    }
}

export const getDoctorSchedule = async (date: Date) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.get(`/clinic/schedule?date=${date.toISOString()}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('neigh_secure_token')}`
            }
        })
        return res.data.data
    } catch (error) {
        throw error
    }
}

export const getAppointmentByDoctor = async (doctorId: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.get(`/appointment/${doctorId}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('neigh_secure_token')}`
                },
            }
        )
        return res.data.data
    } catch (error) {
        throw error
    }
}

export const getOwnAppointments = async ([url, status] : [string, string]) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.get(url,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('neigh_secure_token')}`
                },
                params: {
                    status: status
                }
            }
        )
        return res.data.data
    } catch (error) {
        throw error
    }
}

export const getDoctors = async (url: string) => {
    // eslint-disable-next-line no-useless-catch
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
        throw error
    }
}

export const approveAppointment = async (
    medicalAppointmentId: string,
    date: Date,
    estimated_minutes: number,
    doctorsIds: string[],
    specialityCode: string
) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.post('/appointment/approve', {
                medicalAppointmentId: medicalAppointmentId,
                F_realizacion: date,
                estimated_minutes: estimated_minutes,
                doctorsIds: doctorsIds,
                specialityCode: specialityCode
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('neigh_secure_token')}`
                }
            }
        )

        return res.status == 200
    } catch (error) {
        throw error
    }
}

export const rejectAppointment = async (medicalAppointmentId: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.get(`/appointment/${medicalAppointmentId}/Rejected`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('neigh_secure_token')}`
                }
            }
        )

        return res.status == 200
    } catch (error) {
        throw error
    }
}

export const finishAppointment = async (medicalAppointmentId: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.post(`/appointment/finish`,
            {
                medicalAppointmentId: medicalAppointmentId
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('neigh_secure_token')}`
                }
            }
        )

        return res.status == 200
    } catch (error) {
        throw error
    }
}

export const cancelAppointment = async (medicalAppointmentId: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.get(`/appointment/${medicalAppointmentId}/Canceled`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('neigh_secure_token')}`
                }
            }
        )

        return res.status == 200
    } catch (error) {
        throw error
    }
}
