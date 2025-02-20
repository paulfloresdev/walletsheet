import { useQuery } from "react-query";
import { fetchIndexAccount } from "../api/fetch";

export const useFetchIndexAccount = (token: string, filter: number) => {
    return useQuery(
        [`fetch_index_${token}`], // Se genera dinámicamente el nombre de la query
        () => fetchIndexAccount(token, filter),
        {}
    );
}
