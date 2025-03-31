import React, { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import { Alert, MenuItem, Snackbar, TextField } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useFetchIndexAccount, useFetchIndexCategories } from "../hooks/useFetch";
import { NumericFormat } from "react-number-format";
import { getApiBaseUrl } from "../utils/apiConfig";
import { useNavigate } from "react-router-dom";
import { formatAccountType } from "../utils/Formtater";

// Definición de tipos
interface MovementOption {
  value: number;
  label: string;
}

interface Category {
  id: number;
  name: string;
}

interface Account {
  id: number;
  bank_name: string;
  type: string;
}

const movements: MovementOption[] = [
  { value: 1, label: 'Ingreso' },
  { value: 2, label: 'Egreso' },
  { value: 3, label: 'Pago de tarjeta de crédito' }
];

const Home: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [movementType, setMovementType] = useState<number>();
  const [selectedCard, setSelectedCard] = useState<number>();
  const [selectedCardA, setSelectedCardA] = useState<number>();
  const [selectedCardB, setSelectedCardB] = useState<number>();
  const [selectedCardType, setSelectedCardType] = useState<string>("");
  const [amount, setAmount] = useState<number>();
  const [transactionDate, setTransactionDate] = useState<string>("");
  const [accountingDate, setAccountingDate] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [concept, setConcept] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const { data: accountsData, isLoading: isLoadingAccounts, refetch: refetchAccounts } = useFetchIndexAccount(token ?? '');
  const { data: categoriesData } = useFetchIndexCategories(token ?? '');

  useEffect(() => {
    if (accountsData?.length && !selectedCard) {
      setSelectedCard(accountsData[0].id);
    }
  }, [accountsData, selectedCard]);

  useEffect(() => {
    if (movementType) {
      refetchAccounts();
    }
  }, [movementType, refetchAccounts]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    if (movementType === 3) {
      if (movementType && selectedCategory && selectedCardA && selectedCardB && concept && amount && transactionDate) {
        try {
          // Primera transacción (pago)
          const paymentResponse = await fetch(`${getApiBaseUrl()}/transactions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              type: 'payment',
              amount: Number(amount),
              concept: concept,
              transaction_date: new Date(transactionDate).toISOString().split("T")[0],
              accounting_date: new Date(accountingDate).toISOString().split("T")[0],
              category_id: selectedCategory,
              place: place,
              note: note,
              account_id: selectedCardA,
            })
          });

          if (!paymentResponse.ok) {
            const errorData = await paymentResponse.json();
            throw new Error(errorData || "Hubo un error en el pago");
          }

          // Segunda transacción (ingreso)
          const incomeResponse = await fetch(`${getApiBaseUrl()}/transactions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              type: 'income',
              amount: Number(amount),
              concept: concept,
              transaction_date: new Date(transactionDate).toISOString().split("T")[0],
              accounting_date: new Date(accountingDate).toISOString().split("T")[0],
              category_id: selectedCategory,
              place: place,
              note: note,
              account_id: selectedCardB,
            })
          });

          if (!incomeResponse.ok) {
            const errorData = await incomeResponse.json();
            throw new Error(errorData || "Hubo un error en el ingreso");
          }

          setError(null);
          setOpenSnackbar(true);
          navigate("/home");
        } catch (error) {
          setError(error instanceof Error ? error.message : "Hubo un problema con la conexión al servidor");
          console.error("Error:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setError("Debes capturar correctamente los campos requeridos.");
        setLoading(false);
      }
    } else {
      if (movementType && selectedCategory && selectedCard && concept && amount && transactionDate) {
        try {
          const response = await fetch(`${getApiBaseUrl()}/transactions`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
              type: movementType === 1 ? 'income' : 'expense',
              amount: Number(amount),
              concept: concept,
              transaction_date: new Date(transactionDate).toISOString().split("T")[0],
              accounting_date: new Date(accountingDate).toISOString().split("T")[0],
              category_id: selectedCategory,
              place: place,
              note: note,
              account_id: selectedCard,
            })
          });

          if (response.ok) {
            setError(null);
            setOpenSnackbar(true);
            navigate("/home");
          } else {
            const errorData = await response.json();
            setError(errorData || "Hubo un error");
          }
        } catch (error) {
          setError("Hubo un problema con la conexión al servidor");
          console.error("Error de conexión:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setError("Debes capturar correctamente los campos requeridos.");
        setLoading(false);
      }
    }
  };

  return (
    <>
      <div className="w-full min-h-screen pt-8 pb-16 px-8 md:px-72 flex flex-col justify-start items-center space-y-12">
        <h1 className="text-xl font-bold">WalletSheet</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-8 pb-12">
          <h1 className="text-base font-medium text-center">Información general</h1>

          <div className="w-full flex flex-row space-x-6">
            <TextField
              required
              className="w-full"
              id="movement-type"
              select
              label="Tipo de movimiento"
              value={movementType ?? ''}
              helperText="Selecciona el tipo de movimiento*"
              onChange={(e) => {
                const value = Number(e.target.value);
                setMovementType(value);
                if (value !== 2) setSelectedCategory(8);
              }}
            >
              {movements.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              disabled={movementType !== 2}
              required
              className="w-full"
              id="category-select"
              select
              label="Categoría"
              value={movementType !== 2 ? 8 : selectedCategory ?? ''}
              helperText="Selecciona la categoría*"
              onChange={(e) => setSelectedCategory(Number(e.target.value))}
            >
              {categoriesData?.map((option: Category) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </div>

          {movementType === 3 ? (
            <div className="w-full flex flex-col space-y-8">
              <TextField
                disabled={!movementType}
                required
                className="w-full"
                id="debit-account-select"
                select
                label="Cuenta de débito"
                value={selectedCardA ?? ''}
                helperText="Selecciona la cuenta de banco remitente*"
                onChange={(e) => {
                  setSelectedCardA(Number(e.target.value));
                  setSelectedCardType("debit");
                }}
              >
                {isLoadingAccounts ? (
                  <MenuItem disabled>Cargando...</MenuItem>
                ) : (
                  accountsData?.filter((option: Account) => option.type === "debit").map((option: Account) => (
                    <MenuItem key={option.id} value={option.id}>
                      {`${formatAccountType(option.type)} - ${option.bank_name}`}
                    </MenuItem>
                  ))
                )}
              </TextField>

              <TextField
                disabled={!movementType}
                required
                className="w-full"
                id="credit-account-select"
                select
                label="Cuenta de crédito"
                value={selectedCardB ?? ''}
                helperText="Selecciona la cuenta de banco destinataria*"
                onChange={(e) => {
                  setSelectedCardB(Number(e.target.value));
                  setSelectedCardType("debit");
                }}
              >
                {isLoadingAccounts ? (
                  <MenuItem disabled>Cargando...</MenuItem>
                ) : (
                  accountsData?.filter((option: Account) => option.type === "credit").map((option: Account) => (
                    <MenuItem key={option.id} value={option.id}>
                      {`${formatAccountType(option.type)} - ${option.bank_name}`}
                    </MenuItem>
                  ))
                )}
              </TextField>
            </div>
          ) : (
            <TextField
              disabled={!movementType}
              required
              className="w-full"
              id="account-select"
              select
              label="Cuenta de banco"
              value={selectedCard ?? ''}
              helperText="Selecciona una cuenta de banco*"
              onChange={(e) => {
                const value = Number(e.target.value);
                setSelectedCard(value);
                const selectedOption = accountsData?.find((option: Account) => option.id === value);
                if (selectedOption) setSelectedCardType(selectedOption.type);
              }}
            >
              {isLoadingAccounts ? (
                <MenuItem disabled>Cargando...</MenuItem>
              ) : movementType === 1 ? (
                accountsData?.filter((option: Account) => option.type === "debit").map((option: Account) => (
                  <MenuItem key={option.id} value={option.id}>
                    {`${formatAccountType(option.type)} - ${option.bank_name}`}
                  </MenuItem>
                ))
              ) : (
                accountsData?.map((option: Account) => (
                  <MenuItem key={option.id} value={option.id}>
                    {`${formatAccountType(option.type)} - ${option.bank_name}`}
                  </MenuItem>
                ))
              )}
            </TextField>
          )}

          <h1 className="text-base font-medium text-center">Detalles de la transacción</h1>

          <TextField
            required
            label="Concepto"
            helperText="Ingrese el concepto de la transacción*"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
          />

          <NumericFormat
            required
            value={amount}
            onValueChange={(values) => setAmount(parseFloat(values.value))}
            thousandSeparator=","
            decimalSeparator="."
            decimalScale={2}
            fixedDecimalScale
            allowNegative={false}
            prefix="$"
            customInput={TextField}
            label="Monto"
            helperText="Ingresa el monto de la transacción"
            variant="outlined"
            fullWidth
          />

          <div className="w-full flex flex-row space-x-6">
            <TextField
              required
              label="Fecha de transacción"
              helperText="Ingrese la fecha en que se realizó*"
              type="date"
              value={transactionDate}
              onChange={(e) => {
                setTransactionDate(e.target.value);
                if (selectedCardType === 'debit') {
                  setAccountingDate(e.target.value);
                }
              }}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />

            <TextField
              required
              label="Fecha de aplicación"
              helperText="Ingresa la fecha en que se aplicará"
              type="date"
              value={accountingDate}
              onChange={(e) => setAccountingDate(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
              disabled={selectedCardType === 'debit'}
            />
          </div>

          <TextField
            label="Lugar"
            helperText="Ingrese el lugar de la transacción"
            value={place}
            onChange={(e) => setPlace(e.target.value)}
          />

          <TextField
            label="Notas"
            multiline
            helperText="Ingrese una nota de la transacción"
            value={note}
            onChange={(e) => setNote(e.target.value)}
            minRows={3}
            maxRows={3}
            variant="outlined"
            fullWidth
          />

          {error && <div className="text-red-500 text-center mt-4">{error}</div>}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading}
          >
            {loading ? "Cargando..." : "Registrar"}
          </button>

          <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={() => setOpenSnackbar(false)}>
            <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: "100%" }}>
              ¡Transacción creada con éxito!
            </Alert>
          </Snackbar>
        </form>
      </div>

      <BottomNav />
    </>
  );
};

export default Home;