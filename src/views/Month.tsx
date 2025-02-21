// components/Month.tsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { formatCurrency, fortmatMonth } from "../utils/Formtater";
import { useFetchMonthData } from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
import BottomNav from "../components/BottomNav";

const Month: React.FC = () => {
    const { token } = useAuth();
    const location = useLocation();

    // Obtenemos el mes y el año desde el state pasado por navigate
    const { month, year } = location.state || { month: null, year: null };

    const { data, isLoading, error, refetch } = useFetchMonthData(
        token ?? '',
        month?.toString() ?? '0',
        year ?? '0'
    );

    // Refrescar los datos cuando el año o mes cambian
    useEffect(() => {
        if (year && month) {
            refetch(); // Refresca los datos cuando cambian los parámetros
        }
    }, [year, month, refetch]);

    // Si los datos están cargando o hay un error
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data</div>;
    }

    return (
        <div className="w-full min-h-screen pt-8 pb-16 px-8 md:px-72 flex flex-col justify-start items-center space-y-8">
            <h1 className="text-xl font-bold">WalletSheet</h1>

            {/** LISTADO DE MESES CON MOVIMIENTOS */}
            <div className="w-full flex flex-col space-y-6">
                <h1 className="text-base font-medium text-center">{`${fortmatMonth(month ?? 0)} ${year}`}</h1>

                <div className="w-full flex flex-row justify-between">
                    <div className="">
                        <h1 className="text-lg font-medium">{formatCurrency(data?.sum_by_type.income)}</h1>
                        <h1>Ingresos</h1>
                    </div>
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default Month;
