import React from "react";
import { useAuth } from "../context/AuthContext";
import { useFetchIndexAccount } from "../hooks/useFetch";
import BottomNav from "../components/BottomNav";
import { formatAccountType } from "../utils/Formtater";

// Definición de tipos para la cuenta
interface Account {
    id: string | number;
    bank_name: string;
    type: string; // O usa un tipo específico como 'checking' | 'savings' | 'credit' si hay valores fijos
    // Añade aquí otras propiedades que tenga el objeto account
}

const Accounts: React.FC = () => {
    const { token } = useAuth();
    const { data, isLoading, error } = useFetchIndexAccount(token ?? '');

    // Si los datos están cargando o hay un error
    if (isLoading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error loading data</div>;
    }

    return (
        <div className="w-full min-h-screen pt-8 pb-16 px-8 md:px-72 flex flex-col justify-start items-center space-y-12">
            <h1 className="text-xl font-bold">WalletSheet</h1>
            <h1 className="text-base font-medium text-center">Cuentas de banco</h1>
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {data?.map((account: Account) => (
                    <div
                        className="w-full h-32 p-4 border-2 border-solid border-primary rounded-lg hover:cursor-pointer"
                        key={account.id}
                    >
                        <div className="w-full flex flex-col items-start">
                            <h1 className="font-medium hover:underline">{account.bank_name}</h1>
                            <h1 className="text-sm text-gray-500 font-medium">
                                {formatAccountType(account.type)}
                            </h1>
                        </div>
                    </div>
                ))}
            </div>
            <BottomNav />
        </div>
    );
}

export default Accounts;