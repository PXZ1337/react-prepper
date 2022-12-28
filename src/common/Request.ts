import { getToken, resetToken } from './AuthToken';

export const addRequest = async (url: string, params: object, execution: number = 1): Promise<any> => {
    const maxRetries = 2;
    const token = localStorage.getItem('token');
    const response = await fetch(`${url}?auth=${token}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        ...params,
    });

    if (response.status === 401) {
        await resetToken();
        while (execution < maxRetries) {
            return await addRequest(url, params, ++execution);
        }
    }

    if (!response.ok) {
        throw response;
    }

    return await response.json();
};

const fetchRequest = async (url: string, mapFunc?: (data: object, id: any) => {}, execution: number = 1): Promise<any> => {
    const maxRetries = 2;
    let token = await getToken();
    let response = await fetch(`${url}?auth=${token}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (response.status === 401) {
        await resetToken();
        while (execution < maxRetries) {
            return await fetchRequest(url, mapFunc, ++execution);
        }
    }

    if (!response.ok) {
        throw response;
    }

    const data = await response.json();

    if (mapFunc) {
        return data.map(mapFunc);
    }

    return data;
};

export default fetchRequest;
