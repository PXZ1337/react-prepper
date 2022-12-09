import Authenticate from "../api/authenticate"

export const resetToken = async () => {
    await Authenticate()

    return localStorage.getItem('token')
}

export const getToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        await Authenticate()
    }
    return localStorage.getItem('token')
}
