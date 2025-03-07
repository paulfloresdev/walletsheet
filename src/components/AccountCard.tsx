import React from "react";
import { formatCurrency, formatTransactionType } from "../utils/Formtater";

interface AccountCardProps {
    account: any;
}

const AccountCard: React.FC<AccountCardProps> = ({ account }) => {
    return <div className="w-full p-4 border-2 border-solid border-primary rounded-lg" key={account.id}>
        <div className="w-full flex flex-col items-start">
            <h1 className="font-medium">{account.name}</h1>
            <h1 className="text-sm text-gray-500 font-medium">{formatTransactionType(account.type)}</h1>

            {
                account.type === 'debit' ?
                    <div className="w-full flex flex-col mt-8 space-y-4">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500 ">Saldo inicial</h1>
                            <h1 className="text-base font-semibold">{formatCurrency(parseFloat(account.initial_balance))}</h1>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500 ">Ingresos</h1>
                            <h1 className="text-sm">{formatCurrency(parseFloat(account.incomes))}</h1>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500 ">Egresos</h1>
                            <h1 className="text-sm">{formatCurrency(parseFloat(account.expenses))}</h1>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500 ">Saldo final</h1>
                            <h1 className="text-base font-semibold">{formatCurrency(parseFloat(account.final_balance))}</h1>
                        </div>
                    </div> :
                    <div className="w-full flex flex-col mt-8 space-y-4">
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500 ">Gastado</h1>
                            <h1 className="text-sm">{formatCurrency(parseFloat(account.expenses))}</h1>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500 ">Pagado</h1>
                            <h1 className="text-sm">{formatCurrency(parseFloat(account.incomes))}</h1>
                        </div>
                        <div className="w-full flex flex-row justify-between">
                            <h1 className="text-sm text-gray-500 ">Balance</h1>
                            <h1 className="text-base font-semibold">{formatCurrency(parseFloat(account.balance))}</h1>
                        </div>
                    </div>
            }
        </div>
    </div>
}

export default AccountCard;