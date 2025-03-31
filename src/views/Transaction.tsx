import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { formatCurrency, formatDate, formatAccountType, formatTransactionType } from "../utils/Formtater";
import CategoryIcon from "../components/CategoryIcon";
import BottomNav from "../components/BottomNav";
import { Delete, Edit } from "@mui/icons-material";
import { getApiBaseUrl } from "../utils/apiConfig";
import { useAuth } from "../context/AuthContext";
import { Alert, Snackbar } from "@mui/material";


interface DetailItemProps {
    label: string;
    value: string | number | undefined;
}

const DetailItem: React.FC<DetailItemProps> = ({ label, value }) => {
    return (
        <div className="w-full flex flex-row justify-between">
            <h1>{label}</h1>
            <h1 className="font-medium">{value ?? 'Desconocido'}</h1>
        </div>
    );
}

const Transaction: React.FC = () => {
    const location = useLocation();
    const { token } = useAuth();
    const navigate = useNavigate();

    const { transaction } = location.state || { transaction: null };
    const [openSnackbar, setOpenSnackbar] = useState(false);

    if (!transaction) {
        return <div>No se encontró la transacción</div>;
    }

    const handleDelete = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            const response = await fetch(`${getApiBaseUrl()}/transactions/${transaction.id}`, {
                method: "DELETE",
                headers: {
                    "Accept": "application/json",
                    "Content-Type": "application/json",
                    'Authorization': `Bearer ${token}`,
                }
            });

            if (response.ok) {
                setOpenSnackbar(true);
                navigate("/month", {
                    state: {
                        month: parseFloat(transaction.accounting_date.slice(5, 7)),
                        year: transaction.accounting_date.slice(0, 4)
                    }
                });
            } else {
                const errorData = await response.json();
                console.error("Error al eliminar:", errorData);
            }
        } catch (error) {
            console.error("Error de conexión:", error);
        }
    };

    return (
        <div className="w-full min-h-screen pt-8 pb-16 px-5 md:px-72 flex flex-col justify-start items-center space-y-8">
            <h1 className="text-xl font-bold">WalletSheet</h1>
            <h1 className="text-sm">{formatDate(transaction.accounting_date)}</h1>

            <div className="w-12 h-12 bg-gray-100 rounded-full flex flex-col items-center justify-center">
                <CategoryIcon category={transaction.category.name} />
            </div>

            <h1 className="font-medium">{transaction.concept}</h1>
            <h1 className="font-medium text-lg">
                {formatCurrency(Number(transaction.amount))}
            </h1>

            <form className="w-full">
                <div className="w-full flex flex-row justify-center space-x-8 pb-8">
                    <div
                        onClick={() => navigate("/transaction/edit", { state: { transaction } })}
                        className="w-12 h-12 bg-gray-100 hover:bg-gray-200 rounded-full flex flex-col items-center justify-center cursor-pointer"
                    >
                        <Edit className="text-gray-700" />
                    </div>
                    <div
                        onClick={handleDelete}
                        className="w-12 h-12 bg-red-100 hover:bg-red-200 rounded-full flex flex-col items-center justify-center cursor-pointer"
                    >
                        <Delete className="text-red-700" />
                    </div>
                </div>

                <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
                    <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
                        ¡Transacción eliminada con éxito!
                    </Alert>
                </Snackbar>
            </form>

            <div className="w-full flex flex-col space-y-4 pb-20">
                <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
                    <DetailItem
                        label="Fecha de transacción"
                        value={formatDate(transaction.transaction_date)}
                    />
                    <DetailItem
                        label="Fecha de aplicación"
                        value={formatDate(transaction.accounting_date)}
                    />
                    <DetailItem
                        label="Cuenta de banco"
                        value={transaction.account.bank_name}
                    />
                    <DetailItem
                        label="Tipo de cuenta"
                        value={formatAccountType(transaction.account.type)}
                    />
                    <DetailItem
                        label="Tipo de movimiento"
                        value={formatTransactionType(transaction.type)}
                    />
                    <DetailItem
                        label="Lugar"
                        value={transaction.place}
                    />
                </div>
                <div className="w-full flex flex-col space-y-2">
                    <h1>Notas</h1>
                    <h1 className="font-medium">{transaction.note || 'Sin notas'}</h1>
                </div>
            </div>

            <BottomNav />
        </div>
    );
}

export default Transaction;