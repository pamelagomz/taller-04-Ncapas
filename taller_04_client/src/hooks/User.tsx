import axios from "axios";

export const addRecordToUser = async (
    identifier: string,
    reason: string
) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.post('/user/record',
            {
                identifier: identifier,
                reason: reason
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('neigh_secure_token')}`
                }
            }
        )

        if (res.status === 404) {
            throw new Error("User not found");
        }

        return true;
    } catch (error) {
        throw error
    }
}

export const getUserRecord = async ([start, end]: [Date, Date]) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.get('/user/record',
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('neigh_secure_token')}`
                },
                params: {
                    startDate: start,
                    endDate: end
                }
            }
        )

        if (res.status === 404) {
            return [];
        }

        return res.data.data;
    } catch (error) {
        throw error
    }
}

export const getAllUsers = async (url : string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.get(url,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('neigh_secure_token')}`
                }
            }
        )

        if (res.status === 404) {
            return [];
        }

        return res.data.data;
    } catch (error) {
        throw error
    }
}

export const updateUserRoles = async (identifier: string, roles: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.post(`/config/user-role`,
            {
                roleCode: roles,
                identifier: identifier
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('neigh_secure_token')}`
                }
            }
        )

        if (res.status === 404) {
            throw new Error("User not found");
        }

        return true;
    } catch (error) {
        throw error
    }
}

export const getPrescriptions = async (identifier: string) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.get(`/clinic/prescriptions/${identifier}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('neigh_secure_token')}`
                }
            }
        )

        if (res.status === 404) {
            return [];
        }

        return res.data.data;
    } catch (error) {
        throw error
    }
}

export const addPrescription = async (
    medicalAppointmentId: string,
    prescription: Prescription
) => {
    // eslint-disable-next-line no-useless-catch
    try {
        const res = await axios.post(`/clinic/prescriptions`,
            {
                medicalAppointmentId: medicalAppointmentId,
                prescriptions: [prescription]
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('neigh_secure_token')}`
                }
            }
        )

        if (res.status === 404) {
            throw new Error("User not found");
        }

        return true;
    } catch (error) {
        throw error
    }
}
