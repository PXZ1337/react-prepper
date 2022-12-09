import Authenticate from "../api/authenticate";

export const sleep = () => {
    return new Promise((resolve) => setTimeout(resolve, 2000));
}

export const addRequest = async (url: string, params: object) => {
    const token = localStorage.getItem('token')
    const response = await fetch(`${url}?auth=${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        ...params
    })

    if (!response.ok) {
        throw response
    }

    return await response.json()
}

const getToken = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        await Authenticate()
    }
    return localStorage.getItem('token')
}

const fetchRequest = async (url: string, mapFunc?: (data: object, id: number) => {}) => {
    const token = await getToken()
    const response = await fetch(`${url}?auth=${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })

    if (!response.ok) {
        throw response
    }

    const data = await response.json()

    if (mapFunc) {
        return data.map(mapFunc)
    }

    return data
}

export default fetchRequest