import { useQuery } from "react-query";
import { fetchIndexAccount, fetchIndexCategories, fetchIndexMonths, fetchMonthData } from "../api/fetch";

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

export const useFetchIndexMonths = (token: string) => {
    return useQuery(
        [`fetch_index_months_${token}`], // Se genera dinámicamente el nombre de la query
        () => fetchIndexMonths(token),
        {}
    );
}

export const useFetchMonthData = (token: string, month: string, year: string) => {
    return useQuery(
        [`fetch_month_data_${token}`], // Se genera dinámicamente el nombre de la query
        () => fetchMonthData(token, month, year),
        {}
    );
}