export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('es-ES', {month: 'long'});

  return `${day} de ${month}`;
};

export const formatDateYearMonthDay = (date?: Date) => {
  if (!date) {
    return;
  }
  const day = date.getDate().toString().padStart(2, '0');
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();

  return `${year}-${month}-${day}`;
};

export const formatFullDate = (dateString: string | Date) => {
  const date = new Date(dateString);
  const day = date.getDate();
  const month = date.toLocaleString('es-ES', {month: 'long'});
  const year = date.getFullYear();

  return `${day} de ${month} de ${year}`;
};

export const formatHour = (dateString: string | Date) => {
  const date = new Date(dateString);
  const hour = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hour}:${minutes}`;
};
