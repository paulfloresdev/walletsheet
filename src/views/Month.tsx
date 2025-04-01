import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatAccountType, formatCurrency, formatDate, fortmatMonth } from "../utils/Formtater";
import { useFetchMonthData } from "../hooks/useFetch";
import { useAuth } from "../context/AuthContext";
import BottomNav from "../components/BottomNav";
import AccountCard from "../components/AccountCard";
import CategoryIcon from "../components/CategoryIcon";
import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';
import { UploadFile } from "@mui/icons-material";


interface Balance {
  id: number;
  name: string;
  type: 'debit' | 'credit'; // Asegúrate de que el tipo sea 'debit' o 'credit'
  initial_balance: number;
  incomes: number;
  expenses: number;
  final_balance: number;
  balance: number;
}

interface Transaction {
  id: number;
  account_id: number;
  accounting_date: string;
  amount: string;
  category_id: number;
  concept: string;
  created_at: string;
  updated_at: string;
  transaction_date: string;
  type: 'income' | 'expense' | 'payment';
  note: string | null;
  place: string | null;
  account: {
    id: number;
    user_id: number;
    type: 'debit' | 'credit';
    bank_name: string;
    created_at: string;
    updated_at: string;
  };
  category: {
    id: number;
    name: string;
    icon_name: string;
    created_at: string | null;
    updated_at: string | null;
  };
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
  );

  const [filterType, setFilterType] = useState<string>(''); // Estado para el filtro de tipo
  const [filterAccount, setFilterAccount] = useState<number | string>(''); // Estado para el filtro de cuenta
  const [searchConcept, setSearchConcept] = useState<string>(''); // Estado para el buscador de concepto

  useEffect(() => {
    if (year && month) {
      refetch();
    }
  }, [year, month, refetch]);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  const filteredTransactions = data?.transactions.filter((transaction: Transaction) => {
    const matchesConcept = transaction.concept.toLowerCase().includes(searchConcept.toLowerCase());

    return (
      (filterType ? transaction.type === filterType : true) &&
      (filterAccount ? transaction.account_id === filterAccount : true) &&
      matchesConcept
    );
  });

  const availableAccounts = data?.balances.filter((balance: Balance) => {
    if (filterType === 'payment') {
      return balance.type === 'debit';
    }
    return true; // Mostrar todas las cuentas para income y expense
  });

  const handleDownloadExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredTransactions);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Transactions');
    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    const data = new Blob([excelBuffer], { type: 'application/octet-stream' });
    saveAs(data, 'filtered_transactions.xlsx');
  };

  return (
    <div className="w-full min-h-screen pt-8 pb-16 px-5 md:px-72 flex flex-col justify-start items-center space-y-8">
      <h1 className="text-xl font-bold">WalletSheet</h1>
      <h1 className="text-base font-medium text-center">{`${fortmatMonth(month ?? 0)} ${year}`}</h1>

      <div className="w-full flex flex-col md:flex-row justify-between space-y-4 md:space-y-0 space-x-0 md:space-x-4">
        <div className="w-full md:w-2/5 flex flex-row space-x-4">
          <div className="w-full md:1/2 p-4 border-2 border-solid border-primary rounded-lg flex flex-col items-center space-y-1 text-center">
            <h1 className="font-semibold">
              {
                formatCurrency(Number(data?.balances?.filter((b: Balance) => b.type === 'debit').reduce((acc: number, balance: Balance) => acc + Number(balance.final_balance), 0)))
              }
            </h1>
            <h1 className="text-sm">Capital final antes de deudas</h1>
          </div>
          <div className="w-full p-4 border-2 border-solid border-primary rounded-lg flex flex-col items-center space-y-1 text-center">
            <h1 className="font-semibold">
              {
                formatCurrency(Number(data?.balances?.filter((b: Balance) => b.type === 'credit').reduce((acc: number, balance: Balance) => acc + Number(balance.final_balance), 0)))
              }
            </h1>
            <h1 className="text-sm">Deudas a pagar</h1>
          </div>
        </div>

        <div className="w-full md:w-2/5  flex flex-row space-x-4">
          <div className="w-full p-4 border-2 border-solid border-primary rounded-lg flex flex-col items-center space-y-1 text-center">
            <h1 className="font-semibold">
              {
                formatCurrency(Number(data?.balances?.filter((b: Balance) => b.type === 'debit').reduce((acc: number, balance: Balance) => acc + Number(balance.initial_balance), 0)))
              }
            </h1>
            <h1 className="text-sm">Capital inicial</h1>
          </div>
          <div className="w-full p-4 border-2 border-solid border-primary rounded-lg flex flex-col items-center space-y-1 text-center">
            <h1
              className={`font-semibold ${Number(data?.balances?.filter((b: Balance) => b.type === 'debit').reduce((acc: number, balance: Balance) => acc + Number(balance.final_balance), 0)) +
                Number(data?.balances?.filter((b: Balance) => b.type === 'credit').reduce((acc: number, balance: Balance) => acc + Number(balance.final_balance), 0)) < 0 ? 'text-rose-600' : ''}`}
              
            >
              {formatCurrency(
                Number(data?.balances?.filter((b: Balance) => b.type === 'debit').reduce((acc: number, balance: Balance) => acc + Number(balance.final_balance), 0)) +
                Number(data?.balances?.filter((b: Balance) => b.type === 'credit').reduce((acc: number, balance: Balance) => acc + Number(balance.final_balance), 0))
              )}
            </h1>
            <h1 className="text-sm">Capital final</h1>
          </div>
        </div>
        <div className="w-full md:w-1/5 p-4 border-2 border-solid border-primary rounded-lg flex flex-col items-center space-y-1 text-center">
            <h1
              className={`font-semibold ${(Number(data?.balances?.filter((b: Balance) => b.type === 'debit').reduce((acc: number, balance: Balance) => acc + Number(balance.final_balance), 0)) +
                Number(data?.balances?.filter((b: Balance) => b.type === 'credit').reduce((acc: number, balance: Balance) => acc + Number(balance.final_balance), 0)))-Number(data?.balances?.filter((b: Balance) => b.type === 'debit').reduce((acc: number, balance: Balance) => acc + Number(balance.initial_balance), 0)) ? 'text-red-500' : 'text-teal-600'}`}
              
            >
              {formatCurrency(
                (Number(data?.balances?.filter((b: Balance) => b.type === 'debit').reduce((acc: number, balance: Balance) => acc + Number(balance.final_balance), 0)) +
                Number(data?.balances?.filter((b: Balance) => b.type === 'credit').reduce((acc: number, balance: Balance) => acc + Number(balance.final_balance), 0)))-Number(data?.balances?.filter((b: Balance) => b.type === 'debit').reduce((acc: number, balance: Balance) => acc + Number(balance.initial_balance), 0))
              )}
            </h1>
            <h1 className="text-sm">Balance calculado</h1>
          </div>
  
        
      </div>



      <div className="w-full flex flex-col md:flex-row space-y-8 md:space-y-0 space-x-0 md:space-x-8 pb-20">
        <div className="w-full md:w-5/12 flex flex-col space-y-8">
          <div className="w-full space-y-4">
            <h1>Cuentas de débito ({data?.balances.filter((b: Balance) => b.type === 'debit').length})</h1>
            {data?.balances?.filter((b: Balance) => b.type === 'debit').length > 0 ? (
              <ul className="w-full flex flex-col space-y-4">
                {data.balances.filter((b: Balance) => b.type === 'debit').map((balance: Balance, index: number) => (
                  <AccountCard
                    key={index}
                    bank_name={balance.name}
                    type={balance.type as 'debit' | 'credit'} // Casting explícito
                    initial_balance={balance.initial_balance}
                    incomes={balance.incomes}
                    expenses={balance.expenses}
                    final_balance={balance.final_balance}
                    balance={balance.balance}
                  />
                ))}
              </ul>
            ) : (
              <p>No balances found</p>
            )}
          </div>
          <div className="w-full space-y-4">
            <h1>Cuentas de crédito ({data?.balances.filter((b: Balance) => b.type === 'credit').length})</h1>
            {data?.balances?.filter((b: Balance) => b.type === 'credit').length > 0 ? (
              <ul className="w-full flex flex-col space-y-4">
                {data.balances.filter((b: Balance) => b.type === 'credit').map((balance: Balance, index: number) => (
                  <AccountCard
                    key={index}
                    bank_name={balance.name}
                    type={balance.type as 'debit' | 'credit'} // Casting explícito
                    initial_balance={balance.initial_balance}
                    incomes={balance.incomes}
                    expenses={balance.expenses}
                    final_balance={balance.final_balance}
                    balance={balance.balance}
                  />
                ))}
              </ul>
            ) : (
              <p>No balances found</p>
            )}
          </div>
        </div>

        <div className="w-full md:-7/12 flex flex-col">
          <div className="flex flex-row justify-between">
          <h1>Transacciones ({filteredTransactions?.length})</h1>
          <button onClick={handleDownloadExcel} className="p-2 bg-blue-500 text-white rounded">
                <UploadFile/>
              </button>
          </div>
          
          <div className="w-full mb-4 mt-4 flex flex-col md:flex-row space-x-0 md:space-x-4 space-y-4 md:space-y-0">
                <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded"
                >
                  <option value="">Todos</option>
                  <option value="income">Ingresos</option>
                  <option value="expense">Gastos</option>
                  <option value="payment">Pagos</option>
                </select>
                <select
                  value={filterAccount}
                  onChange={(e) => setFilterAccount(Number(e.target.value))}
                  className="p-2 border border-gray-300 rounded"
                >
                  <option value="">Todas las cuentas</option>
                  {availableAccounts?.map((account: Balance) => (
                    <option key={account.id} value={account.id}>
                      {`${formatAccountType(account.type)} - ${account.name}`}
                    </option>
                  ))}
                </select>
                <input
                  type="text"
                  placeholder="Buscar concepto"
                  value={searchConcept}
                  onChange={(e) => setSearchConcept(e.target.value)}
                  className="p-2 border border-gray-300 rounded"
                />
                
                </div>
          {filteredTransactions?.map((transaction: Transaction) => (
            <div
              key={transaction.id}
              className="w-full border-b-2 border-gray-100 py-8 hover:bg-gray-50"
              onClick={() => navigate("/transaction", { state: { transaction } })}
            >
              <div className="w-full flex flex-row justify-between">
                <div className="w-2/3 flex flex-row space-x-2">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex flex-col items-center justify-center">
                    <CategoryIcon category={transaction.category.name} />
                  </div>
                  <div className="w-3/4 space-y-2">
                    <h1 className="font hover:underline cursor-pointer font-medium">{transaction.concept}</h1>
                    <h1 className="text-sm">{formatDate(transaction.transaction_date)}</h1>
                  </div>
                </div>

                <div className="flex flex-col items-end space-y-2">
                  <h1 className={`font-semibold ${transaction.type === 'income' ? 'text-teal-600' : 'text-rose-600'}`}>{formatCurrency(parseFloat(transaction.amount))}</h1>
                  
                  <div className="flex flex-col items-end">
                  <h1 className="text-sm ">{transaction.account.bank_name}</h1>
                    <h1 className="text-sm font-medium text-gray-500">{formatAccountType(transaction.account.type)}</h1>
                  </div>
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

