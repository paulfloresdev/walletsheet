export const fortmatMonth = (numeroMes: number): string => {
  const meses = [
    "Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
    "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"
  ];

  return meses[numeroMes - 1] || "Mes inválido";
};

export const formatCurrency = (amount: number): string => {
  if (typeof amount !== 'number' || isNaN(amount)) {
    return "Invalid amount";
  }

  return amount.toLocaleString('es-MX', { style: 'currency', currency: 'MXN' });
};



export const formatTransactionType = (script: string): string => {
  if (script === 'debit') {
    return 'Débito';
  } else if (script === 'credit') {
    return 'Crédito';
  }
  return 'Tipo desconocido'; // En caso de que el valor no sea 'debit' ni 'credit'
};

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };

  const date = new Date(dateString);
  return date.toLocaleDateString('es-ES', options).replace('.', '');
};
