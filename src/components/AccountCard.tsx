import React from "react";
import { formatAccountType, formatCurrency } from "../utils/Formtater";

// Definición de tipos flexibles
type AccountType = 'debit' | 'credit';

interface AccountBase {
    id: number | string;
    type: AccountType;
    bank_name?: string;  // Hacer opcional para compatibilidad
    name?: string;      // Hacer opcional para compatibilidad
}

interface DebitAccount extends AccountBase {
    type: 'debit';
    initial_balance?: string | number;
    incomes?: string | number;
    expenses?: string | number;
    final_balance?: string | number;
}

interface CreditAccount extends AccountBase {
    type: 'credit';
    expenses?: string | number;
    incomes?: string | number;
    balance?: string | number;
}

type Account = DebitAccount | CreditAccount;

interface AccountCardProps {
    account: Account;
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
    const parseNumber = (value: string | number | undefined): number => {
        if (value === undefined) return 0;
        return typeof value === 'string' ? parseFloat(value) : value;
    };

    // Determinar el nombre a mostrar (prioriza name, luego bank_name)
    const displayName = account.name || account.bank_name || 'Cuenta sin nombre';

    return (
        <div className="w-full p-4 border-2 border-solid border-primary rounded-lg">
            <div className="w-full flex flex-col items-start">
                <h1 className="font-medium">{displayName}</h1>
                <h1 className="text-sm text-gray-500 font-medium">
                    {formatAccountType(account.type)}
                </h1>

                {account.type === 'debit' ? (
                    <div className="w-full flex flex-col mt-8 space-y-4">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500">Saldo inicial</h1>
                            <h1 className="text-base font-semibold">
                                {formatCurrency(parseNumber(account.initial_balance))}
                            </h1>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500">Ingresos</h1>
                            <h1 className="text-sm">
                                {formatCurrency(parseNumber(account.incomes))}
                            </h1>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500">Egresos</h1>
                            <h1 className="text-sm">
                                {formatCurrency(parseNumber(account.expenses))}
                            </h1>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500">Saldo final</h1>
                            <h1 className="text-base font-semibold">
                                {formatCurrency(parseNumber(account.final_balance))}
                            </h1>
                        </div>
                    </div>
                ) : (
                    <div className="w-full flex flex-col mt-8 space-y-4">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500">Gastado</h1>
                            <h1 className="text-sm">
                                {formatCurrency(parseNumber(account.expenses))}
                            </h1>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500">Pagado</h1>
                            <h1 className="text-sm">
                                {formatCurrency(parseNumber(account.incomes))}
                            </h1>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500">Balance</h1>
                            <h1 className="text-base font-semibold">
                                {formatCurrency(parseNumber(account.balance))}
                            </h1>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AccountCard;