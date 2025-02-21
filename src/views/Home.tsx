import React, { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import { Alert, MenuItem, Snackbar, TextField } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useFetchIndexAccount, useFetchIndexCategories } from "../hooks/useFetch";
import { NumericFormat } from "react-number-format";
import { getApiBaseUrl } from "../utils/apiConfig";
import { useNavigate } from "react-router-dom";

const movements = [
  {
    value: 1,
    label: 'Ingreso',
  },
  {
    value: 2,
    label: 'Egreso',
  },
  {
    value: 3,
    label: 'Pago',
  }
];

const Home: React.FC = () => {
  const { token } = useAuth();
  const navigate = useNavigate();

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [movementType, setMovementType] = useState<number>();
  const [selectedCard, setSelectedCard] = useState<number>();
  const [selectedCardType, setSelectedCardType] = useState<String>("");
  const [amount, setAmount] = useState<number>();
  const [transacctionDate, setTransactionDate] = useState<string>("");
  const [accountingDate, setAccountingDate] = useState<string>("");
  const [selectedCategory, setSelectedCategory] = useState<number>();
  const [concept, setConcept] = useState<string>("");
  const [place, setPlace] = useState<string>("");
  const [note, setNote] = useState<string>("");

  const { data: accountsData, isLoading: isLoadingAccounts, error: errorAccounts, refetch: refetchAccounts } = useFetchIndexAccount(token ?? '', movementType ?? 4);
  const { data: categoriesData, isLoading: isLoadingCategories, error: errorCategories, refetch: refetchCategories } = useFetchIndexCategories(token ?? '');
  // Sincronizar selectedCard con los datos recibidos de las cuentas
  useEffect(() => {
    if (accountsData?.length && !selectedCard) {
      // Si no hay una tarjeta seleccionada, seleccionamos la primera cuenta
      setSelectedCard(accountsData[0].id);
    }
  }, [accountsData, selectedCard]);

  // useEffect para detectar el cambio en movementType y hacer refetch
  useEffect(() => {
    if (movementType) {
      refetchAccounts(); // Hacer refetch cuando movementType cambie
    }
  }, [movementType, refetchAccounts]); // Dependencia en movementType

  const getTransactionType = (script: string): string => {
    if (script === 'debit') {
      return 'Débito';
    } else if (script === 'credit') {
      return 'Crédito';
    }
    return 'Tipo desconocido'; // En caso de que el valor no sea 'debit' ni 'credit'
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true); // Activar el loading

    // Verificar si todos los campos están completos
    if (movementType !== null && selectedCategory !== null && selectedCard !== null && concept !== "" && amount !== null && transacctionDate !== "") {
      console.log("Datos enviados:", JSON.stringify({
        type: movementType === 1 ? 'income' : movementType === 2 ? 'expense' : 'payment',
        amount: amount,
        concept: concept,
        transaction_date: transacctionDate,
        accounting_date: accountingDate,
        category_id: selectedCategory,
        place: place,
        note: note,
        account_id: selectedCard,
      }));

      try {
        // Usar la URL base desde el archivo apiConfig
        const response = await fetch(`${getApiBaseUrl()}/transactions`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            type: movementType === 1 ? 'income' : movementType === 2 ? 'expense' : 'payment',
            amount: Number(amount),
            concept: concept,
            transaction_date: new Date(transacctionDate).toISOString().split("T")[0],
            accounting_date: new Date(accountingDate).toISOString().split("T")[0],
            category_id: selectedCategory,
            place: place,
            note: note,
            account_id: selectedCard,
          })
        });

        // Verificar si la respuesta fue exitosa
        if (response.ok) {
          const data = await response.json();
          console.log(data);
          setError(null); // Limpiar el error
          setOpenSnackbar(true); // Abrir Snackbar de éxito
          setTimeout(() => {
            navigate("/home"); // Redirigir al dashboard o página principal
          }, 3000); // Esperar 3 segundos antes de redirigir
        } else {
          const errorData = await response.json();
          setError(errorData || "Hubo un error");
        }
      } catch (error) {
        setError("Hubo un problema con la conexión al servidor");
        console.error("Error de conexión:", error);
      } finally {
        setLoading(false); // Desactivar el loading
      }
    } else {
      setError("Debes capturar correctamente los campos requeridos.");
      setLoading(false); // Desactivar el loading en caso de error
    }
  };

  return (
    <>
      <div className="w-full min-h-screen pt-8 pb-16 px-8 flex flex-col justify-start items-center space-y-12">
        <h1 className="text-xl font-bold">WalletSheet</h1>

        <form onSubmit={handleSubmit} className="w-full flex flex-col space-y-8 pb-12">
          {/* INFORMACIÓN GENERAL */}
          <h1 className="text-base font-medium text-center">Información general</h1>
          <div className="w-full flex flex-row space-x-6">
            <TextField
              required
              className="w-full"
              id="movement-type"
              select
              label="Tipo de movimiento"
              value={movementType}
              helperText="Selecciona el tipo de movimiento*"
              onChange={(e) => {
                const value = Number(e.target.value);
                setMovementType(value);  // Actualiza el tipo de movimiento
              }}
            >
              {movements.map((option) => (
                <MenuItem key={option.value} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </TextField>
            <TextField
              required
              className="w-full"
              id="movement-type"
              select
              label="Categoría"
              value={selectedCategory}
              helperText="Selecciona la categoría*"
              onChange={(e) => {
                const value = Number(e.target.value);
                setSelectedCategory(value);  // Actualiza el tipo de movimiento
              }}
            >
              {categoriesData?.map((option: any) => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>
          </div>
          <TextField
            required
            className="w-full"
            id="account-select"
            select
            label="Cuenta de banco"
            value={selectedCard}
            helperText="Selecciona una cuenta de banco*"
            onChange={(e) => {
              const value = Number(e.target.value);  // Convertir a número
              setSelectedCard(value);  // Actualiza la tarjeta seleccionada

              const selectedOption = accountsData?.data.find((option: any) => option.id === value);
              setSelectedCardType(selectedOption.type);
            }}
          >
            {isLoadingAccounts ? (
              <MenuItem disabled>Cargando...</MenuItem>
            ) : (
              accountsData?.data.map((option: any) => (
                <MenuItem key={option.id} value={option.id}>
                  {`${getTransactionType(option.type)} - ${option.bank_name}`}
                </MenuItem>
              ))
            )}
          </TextField>

          {/* DETALLES DE LA TRANSACCIÓN */}
          <h1 className="text-base font-medium text-center">Detalles de la transacción</h1>

          <TextField
            required
            label="Concepto"
            helperText="Ingrese el concepto de la transacción*"
            value={concept}
            onChange={(e) => {
              const value = String(e.target.value);
              setConcept(value);
            }} // Guarda el valor en el estado
          />
          <NumericFormat
            required
            value={amount}
            onValueChange={(values) => setAmount(parseFloat(values.value))} // Guardamos solo el valor numérico sin formato
            thousandSeparator="," // Agrega separador de miles
            decimalSeparator="." // Usa punto como separador decimal
            decimalScale={2} // Permite hasta 2 decimales
            fixedDecimalScale // Siempre mostrar 2 decimales
            allowNegative={false} // No permite números negativos
            prefix="$" // Prefijo de moneda
            customInput={TextField} // Usa el TextField de MUI
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
              value={transacctionDate}
              onChange={(e) => {
                const value = String(e.target.value);
                setTransactionDate(value);
                if (selectedCardType === 'debit') {
                  setAccountingDate(value);
                }
              }} // Guarda el valor en el estado
              InputLabelProps={{ shrink: true }} // Hace que el label no se superponga
              fullWidth
            />
            <TextField
              label="Fecha de aplicación"
              helperText="Ingresa la fecha en que se aplicará"
              type="date"
              value={accountingDate}
              onChange={(e) => setAccountingDate(e.target.value)} // Guarda el valor en el estado
              InputLabelProps={{ shrink: true }} // Hace que el label no se superponga
              fullWidth
              disabled={selectedCardType === 'debit'}
            />
          </div>
          <TextField
            label="Lugar"
            helperText="Ingrese el lugar de la transacción"
            value={place}
            onChange={(e) => {
              const value = String(e.target.value);
              setPlace(value);
            }} // Guarda el valor en el estado
          />
          <TextField
            label="Notas"
            multiline
            helperText="Ingrese una nota de la transacción"
            value={note}
            onChange={(e) => {
              const value = String(e.target.value);
              setNote(value);
            }}
            minRows={3} // Mínimo 3 líneas visibles
            maxRows={3} // Máximo 6 líneas antes de mostrar scroll
            variant="outlined"
            fullWidth
          />

          {error && <div className="text-red-500 text-center mt-4">{error}</div>}

          <button
            type="submit"
            className="w-full py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            disabled={loading} // Deshabilitar el botón mientras se carga
          >
            {loading ? "Cargando..." : "Registrar"}
          </button>

          {/* Snackbar con Alert */}
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
