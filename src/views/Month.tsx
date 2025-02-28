// components/Month.tsx
import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { formatCurrency, formatTransactionType, fortmatMonth } from "../utils/Formtater";
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
        <div className="w-full min-h-screen pt-8 pb-16 px-5 md:px-72 flex flex-col justify-start items-center space-y-8">
            <h1 className="text-xl font-bold">WalletSheet</h1>

            {/** SUMATORIAS */}
            {
                data?.period == '' 
            }
            
            <div className="w-full flex flex-col space-y-6">
                <h1 className="text-base font-medium text-center">{`${fortmatMonth(month ?? 0)} ${year}`}</h1>

                <div className="w-full flex flex-row justify-between">
                    <div className="w-full text-center">
                        <h1 className="font-semibold">{formatCurrency(data?.sum_by_type.income)}</h1>
                        <h1 className="text-sm">Ingresos</h1>
                    </div>
                    <div className="w-full text-center">
                        <h1 className="font-semibold">{formatCurrency(data?.sum_by_type.expense)}</h1>
                        <h1 className="text-sm">Egresos</h1>
                    </div>
                    <div className="w-full text-center">
                        <h1 className="font-semibold">{formatCurrency(data?.sum_by_type.payment)}</h1>
                        <h1 className="text-sm">Pagos de cuentas</h1>
                    </div>
                </div>
            </div>

            <div className="w-full space-y-4">
            {data?.balances.map((account: any) => (
                <div className="w-full p-4 border-2 border-solid border-primary rounded-lg" key={account.id}>
                    <div className="w-full flex flex-col items-start">
                        <h1 className="font-medium">{account.name}</h1>
                        <h1 className="text-sm text-gray-500 font-medium">{formatTransactionType(account.type)}</h1>
                        <div className="w-full flex flex-row mt-6">
                            <div className="w-full text-center">
                                <h1 className={`font-semibold ${(parseFloat(account.initial_balance) < 0) ? 'text-red-500' : ''}`}>{formatCurrency(parseFloat(account.initial_balance))}</h1>
                                <h1 className="text-sm">{account.type == 'debit' ? 'Saldo inicial' : 'Adeudo Inicial'}</h1>
                            </div>
                            <div className="w-full text-center">
                                <h1 className={`font-semibold ${(parseFloat(account.final_balance) < 0) ? 'text-red-500' : ''}`}>{formatCurrency(parseFloat(account.final_balance))}</h1>
                                <h1 className="text-sm">{account.type == 'debit' ? 'Saldo final' : 'Adeudo final'}</h1>
                            </div>
                        </div>
                    </div>
                    
                </div>
            ))}
            </div>

            <BottomNav />
        </div>
    );
};

export default Month;
