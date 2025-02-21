import React, { useState } from "react";
import { TextField } from "@mui/material";
import { NumericFormat } from "react-number-format";

const MoneyInput: React.FC = () => {
    const [amount, setAmount] = useState<string>("");

    return (
        <NumericFormat
            value={amount}
            onValueChange={(values) => setAmount(values.value)} // Guardamos solo el valor numérico sin formato
            thousandSeparator="," // Agrega separador de miles
            decimalSeparator="." // Usa punto como separador decimal
            decimalScale={2} // Permite hasta 2 decimales
            fixedDecimalScale // Siempre mostrar 2 decimales
            allowNegative={false} // No permite números negativos
            prefix="$" // Prefijo de moneda
            customInput={TextField} // Usa el TextField de MUI
            label="Monto"
            variant="outlined"
            fullWidth
        />
    );
};

export default MoneyInput;
