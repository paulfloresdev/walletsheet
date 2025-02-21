import { useQuery } from "react-query";
import { fetchIndexAccount, fetchIndexCategories } from "../api/fetch";

export const useFetchIndexAccount = (token: string, filter: number) => {
    return useQuery(
        [`fetch_index_accounts_${token}`], // Se genera dinámicamente el nombre de la query
        () => fetchIndexAccount(token, filter),
        {}
    );
}

export const useFetchIndexCategories = (token: string) => {
    return useQuery(
        [`fetch_index_categories_${token}`], // Se genera dinámicamente el nombre de la query
        () => fetchIndexCategories(token),
        {}
    );
}