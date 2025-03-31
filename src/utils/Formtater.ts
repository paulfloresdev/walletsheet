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



export const formatAccountType = (script: string): string => {
  if (script === 'debit') {
    return 'Débito';
  } else if (script === 'credit') {
    return 'Crédito';
  }
  return 'Tipo desconocido'; // En caso de que el valor no sea 'debit' ni 'credit'
};

export const formatTransactionType = (script: string): string => {
  if (script === 'income') {
    return 'Ingreso';
  } else if (script === 'expense') {
    return 'Egreso';
  }
  return 'Pago de tarjeta de crédito'; // En caso de que el valor no sea 'debit' ni 'credit'
};

export const formatDate = (dateString: string) => {
  const options: Intl.DateTimeFormatOptions = {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  };

  // Crear la fecha y ajustar la zona horaria
  const date = new Date(dateString);
  const adjustedDate = new Date(date.getTime() + date.getTimezoneOffset() * 60000);

  return adjustedDate.toLocaleDateString('es-ES', options).replace('.', '');
};

