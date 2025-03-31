import React from "react";
import { formatAccountType, formatCurrency } from "../utils/Formtater";


interface AccountCardProps {
    bank_name?: string;  // Hacer opcional para compatibilidad
    type: 'debit' | 'credit';
    initial_balance?: string | number;
    incomes?: string | number;
    expenses?: string | number;
    final_balance?: string | number;
    balance?: string | number;
}

const AccountCard: React.FC<AccountCardProps> = ({ bank_name, type, initial_balance, incomes, expenses, final_balance, balance }) => {
    const parseNumber = (value: string | number | undefined): number => {
        if (value === undefined) return 0;
        return typeof value === 'string' ? parseFloat(value) : value;
    };

    return (
        <div className="w-full p-4 border-2 border-solid border-primary rounded-lg">
            <div className="w-full flex flex-col items-start">
                <h1 className="font-medium">{bank_name}</h1>
                <h1 className="text-sm text-gray-500 font-medium">
                    {formatAccountType(type)}
                </h1>

                {type === 'debit' ? (
                    <div className="w-full flex flex-col mt-8 space-y-4">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500">Saldo inicial</h1>
                            <h1 className="text-base font-semibold">
                                {formatCurrency(parseNumber(initial_balance))}
                            </h1>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500">Ingresos</h1>
                            <h1 className="text-sm">
                                {formatCurrency(parseNumber(incomes))}
                            </h1>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500">Egresos</h1>
                            <h1 className="text-sm">
                                {formatCurrency(parseNumber(expenses))}
                            </h1>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500">Saldo final</h1>
                            <h1 className="text-base font-semibold">
                                {formatCurrency(parseNumber(final_balance))}
                            </h1>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex flex-col mt-8 space-y-4">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500">Gastado</h1>
                            <h1 className="text-sm">
                                {formatCurrency(parseNumber(expenses))}
                            </h1>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500">Pagado</h1>
                            <h1 className="text-sm">
                                {formatCurrency(parseNumber(incomes))}
                            </h1>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500">Balance</h1>
                            <h1 className="text-base font-semibold">
                                {formatCurrency(parseNumber(balance))}
                            </h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountCard;