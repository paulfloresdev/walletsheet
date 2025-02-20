import React, { useState, useEffect } from "react";
import BottomNav from "../components/BottomNav";
import { MenuItem, TextField } from "@mui/material";
import { useAuth } from "../context/AuthContext";
import { useFetchIndexAccount } from "../hooks/useFetch";

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
  const [movementType, setMovementType] = useState<number>(1);
  const [selectedCard, setSelectedCard] = useState<number>(1);
  const { data, isLoading, error, refetch } = useFetchIndexAccount(token ?? '', movementType);

  // Sincronizar selectedCard con los datos recibidos de las cuentas
  useEffect(() => {
    if (data?.length && !selectedCard) {
      // Si no hay una tarjeta seleccionada, seleccionamos la primera cuenta
      setSelectedCard(data[0].id);
    }
  }, [data, selectedCard]);

  // useEffect para detectar el cambio en movementType y hacer refetch
  useEffect(() => {
    if (movementType) {
      refetch(); // Hacer refetch cuando movementType cambie
    }
  }, [movementType, refetch]); // Dependencia en movementType

  const getTransactionType = (script: string): string => {
    if (script === 'debit') {
      return 'Débito';
    } else if (script === 'credit') {
      return 'Crédito';
    }
    return 'Tipo desconocido'; // En caso de que el valor no sea 'debit' ni 'credit'
  };

  return (
    <>
      <div className="w-full min-h-screen pt-10 pb-16 px-10 flex flex-col justify-start items-center space-y-16">
        <h1 className="text-xl font-bold">WalletSheet</h1>
        <form action="" className="w-full flex flex-col space-y-8">
          <TextField
            className="w-full"
            id="movement-type"
            select
            label="Tipo de movimiento"
            value={movementType}
            helperText="Selecciona el tipo de movimiento"
            onChange={(e) => {
              const value = Number(e.target.value);
              setMovementType(value);  // Actualiza el tipo de movimiento
              console.log(`Filtro enviado: ${value}`);
            }}
          >
            {movements.map((option) => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            className="w-full"
            id="account-select"
            select
            label="Selecciona una cuenta"
            value={selectedCard}
            helperText="Selecciona una cuenta"
            onChange={(e) => {
              const value = Number(e.target.value);  // Convertir a número
              setSelectedCard(value);  // Actualiza la tarjeta seleccionada
            }}
          >
            {isLoading ? (
              <MenuItem disabled>Cargando...</MenuItem>
            ) : (
              data?.data.map((option: any) => (
                <MenuItem key={option.id} value={option.id}>
                  {`${getTransactionType(option.type)} - ${option.bank_name}`}
                </MenuItem>
              ))
            )}
          </TextField>

          <TextField id="amount" label="Monto" variant="outlined" />
        </form>
      </div>

      <BottomNav />
    </>
  );
};

export default Home;
