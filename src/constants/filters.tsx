const getDate = (days = 0) => {
  const date = new Date();
  date.setDate(date.getDate() - days);
  return date;
};

export const periods = [
  {id: 1, label: 'Hoy', dateTo: getDate(), dateFrom: getDate()},
  {id: 2, label: 'Ayer', dateTo: getDate(1), dateFrom: getDate(1)},
  {id: 3, label: 'Última semana', dateTo: getDate(7), dateFrom: getDate()},
  {id: 4, label: 'Últimos 15 días', dateTo: getDate(15), dateFrom: getDate()},
  {id: 5, label: 'Últimos 30 días', dateTo: getDate(30), dateFrom: getDate()},
];
