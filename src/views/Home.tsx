import React from "react";
import BottomNav from "../components/BottomNav"; // Asegúrate de importar el componente correctamente
import { MenuItem, TextField } from "@mui/material";

const movements = [
  {
    value: 1,
    label: 'Ingreso',
  },
  {
    value: 2,
    label: 'Egreso',
  }
];

const cards = [
  {
    value: 1,
    label: 'Crédito - Nu México Virtual',
  },
  {
      value: 2,
      label: 'Banamex 7288 - Crédito',
  },
  {
      value: 3,
      label: 'BBVA 4530 - Crédito',
  },
];

const Home: React.FC = () => {
  return (
    <>
      <div className="w-full min-h-screen pb-16 px-10 flex flex-col justify-center items-center">
        {/* Contenido del Home */}
        <form action="">
            <TextField
            id="outlined"
            select
            label="Tipo de movimiento"
            defaultValue={1}
            helperText="Selecciona el tipo de movimiento"
            >
                {movements.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                    {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
            id="outlined"
            select
            label="Tarjeta"
            defaultValue={1}
            helperText="Selecciona la tarjeta"
            >
                {cards.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                     {option.label}
                    </MenuItem>
                ))}
            </TextField>
            <TextField id="outlined-basic" label="Outlined" variant="outlined" />
        </form>
      </div>

      <BottomNav />
    </>
  );
};

export default Home;
