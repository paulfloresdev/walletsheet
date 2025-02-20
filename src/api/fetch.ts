import { getApiBaseUrl } from "../utils/apiConfig";

export const fetchIndexAccount = async (token: string, filter: number) => {
    const baseUrl = getApiBaseUrl();
    if (!baseUrl) throw new Error("Base URL is undefined");

    const url = `${baseUrl}/accounts/filter/${filter}`; // Construcción manual de la URL

    const response = await fetch(url, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
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
