import { getApiBaseUrl } from "../utils/apiConfig";

export const fetchIndexAccount = async (token: string) => {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) throw new Error("Base URL is undefined");

    const url = `${baseUrl}/accounts`; // Construcción manual de la URL

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 404) {
        const data = await response.json();
        console.log(data.message);
        return data;
    } else if (!response.ok) {
        throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    console.log(data);
    return await data;
};

export const fetchIndexCategories = async (token: string) => {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) throw new Error("Base URL is undefined");

    const url = `${baseUrl}/categories`; // Construcción manual de la URL

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 404) {
        const data = await response.json();
        console.log(data.message);
        return data;
    } else if (!response.ok) {
        throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    console.log(data);
    return await data;
};

export const fetchIndexMonths = async (token: string) => {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) throw new Error("Base URL is undefined");

    const url = `${baseUrl}/transaction-months`; // Construcción manual de la URL

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 404) {
        const data = await response.json();
        console.log(data.message);
        return data;
    } else if (!response.ok) {
        throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    console.log(data);
    return await data;
};

export const fetchMonthData = async (token: string, month: string, year: string) => {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) throw new Error("Base URL is undefined");

    const url = `${baseUrl}/month-data/${month}/${year}`; // Construcción manual de la URL

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (response.status === 404) {
        const data = await response.json();
        console.log(data.message);
        return data;
    } else if (!response.ok) {
        throw new Error("Error en la solicitud");
    }
    const data = await response.json();
    console.log(data);
    return await data;
};
