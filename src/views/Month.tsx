// components/Month.tsx
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrency, formatDate, formatAccountType, fortmatMonth } from "../utils/Formtater";
import { useFetchMonthData } from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
import BottomNav from "../components/BottomNav";
import AccountCard from "../components/AccountCard";
import { Icon } from "@mui/material";
import { ElectricalServices } from "@mui/icons-material";
import CategoryIcon from "../components/CategoryIcon";

const Month: React.FC = () => {
    const { token } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

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

            <h1 className="text-base font-medium text-center">{`${fortmatMonth(month ?? 0)} ${year}`}</h1>

            <div className="w-full flex flex-col md:flex-row space-y-8 md:space-y-0 space-x-0 md:space-x-8 pb-20">
                <div className="w-full md:w-1/2 flex flex-col space-y-8">
                    <div className="w-full space-y-4">
                        <h1>Cuentas de débito ({data?.balances.filter((option: any) => option.type === 'debit').length})</h1>
                        {data?.balances.filter((option: any) => option.type === 'debit').map((account: any) => (
                            <AccountCard account={account}></AccountCard>
                        ))}
                    </div>
                    <div className="w-full space-y-4">
                        <h1>Cuentas de crédito ({data?.balances.filter((option: any) => option.type === 'credit').length})</h1>
                        {data?.balances.filter((option: any) => option.type === 'credit').map((account: any) => (
                            <AccountCard account={account}></AccountCard>
                        ))}
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <h1>Transacciones ({data?.transactions.length})</h1>
                    {data?.transactions.map((transaction: any) => (
                        <div key={transaction.id} className="w-full border-b-2 border-gray-100 py-8 hover:bg-gray-50"
                            onClick={() => {
                                navigate("/transaction", { state: { transaction } });
                            }}>
                            <div className="w-full flex flex-row justify-between">
                                <div className="flex flex-row space-x-2">
                                    <div className="w-12 h-12 bg-gray-100 rounded-full flex flex-col items-center justify-center">
                                        <CategoryIcon category={transaction.category.name} />
                                    </div>
                                    <div className="space-y-1">
                                        <h1 className="font-medium hover:underline cursor-pointer">{transaction.concept}</h1>
                                        <h1 className="text-sm">{formatDate(transaction.transaction_date)}</h1>
                                    </div>
                                </div>

                                <div className="flex flex-col items-end space-y-1">
                                    <h1 className="font-medium">{formatCurrency(parseFloat(transaction.amount))}</h1>
                                    <h1 className="text-sm">{transaction.account.bank_name}</h1>
                                </div>
                            </div>

                        </div>
                    ))}
                </div>
            </div>


            <BottomNav />
        </div>
    );
};

export default Month;
