import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fortmatMonth } from "../utils/Formtater";
import { useFetchMonthData } from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
import BottomNav from "../components/BottomNav";
import AccountCard from "../components/AccountCard";

// Definición de tipos
interface Account {
    id: string | number;
    type: 'debit' | 'credit';
    bank_name: string;
    name: string;
}

interface Balance extends Account {
    initial_balance: number;
    incomes: number;
    expenses: number;
    final_balance: number;
}

interface Transaction {
    id: string | number;
    concept: string;
    transaction_date: string;
    amount: string | number;
    account: Account;
    category: {
        name: string;
    };
}

interface MonthData {
    balances: Balance[];
    transactions: Transaction[];
}

const Month: React.FC = () => {
    const { token } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();

    const { month, year } = location.state || { month: null, year: null };

    const { data, isLoading, error, refetch } = useFetchMonthData(
        token ?? '',
        month?.toString() ?? '0',
        year ?? '0'
    ) as { data: MonthData | null; isLoading: boolean; error: string | null; refetch: () => void };

    useEffect(() => {
        if (year && month) {
            refetch();
        }
    }, [year, month, refetch]);

    if (isLoading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;

    return (
        <div className="w-full min-h-screen pt-8 pb-16 px-5 md:px-72 flex flex-col justify-start items-center space-y-8">
            <h1 className="text-xl font-bold">WalletSheet</h1>
            <h1 className="text-base font-medium text-center">{`${fortmatMonth(month ?? 0)} ${year}`}</h1>

            <div className="w-full flex flex-col md:flex-row space-y-8 md:space-y-0 space-x-0 md:space-x-8 pb-20">
                <div className="w-full md:w-1/2 flex flex-col space-y-8">
                    <div className="w-full space-y-4">
                        <h1>Cuentas de débito ({data?.balances.filter(b => b.type === 'debit').length})</h1>
                        {data?.balances
                            .filter(b => b.type === 'debit')
                            .map(account => (
                                <AccountCard
                                    key={account.id}
                                    account={{
                                        ...account,
                                        name: account.bank_name // Asegurar que tenemos la propiedad name
                                    }}
                                />
                            ))}
                    </div>
                    <div className="w-full space-y-4">
                        <h1>Cuentas de crédito ({data?.balances.filter(b => b.type === 'credit').length})</h1>
                        {data?.balances
                            .filter(b => b.type === 'credit')
                            .map(account => (
                                <AccountCard
                                    key={account.id}
                                    account={{
                                        ...account,
                                        name: account.bank_name
                                    }}
                                />
                            ))}
                    </div>
                </div>

                <div className="w-full flex flex-col">
                    <h1>Transacciones ({data?.transactions.length})</h1>
                    {data?.transactions.map(transaction => (
                        <div
                            key={transaction.id}
                            className="w-full border-b-2 border-gray-100 py-8 hover:bg-gray-50"
                            onClick={() => navigate("/transaction", { state: { transaction } })}
                        >
                            {/* ... resto del código de transacción ... */}
                        </div>
                    ))}
                </div>
            </div>

            <BottomNav />
        </div>
    );
};

export default Month;