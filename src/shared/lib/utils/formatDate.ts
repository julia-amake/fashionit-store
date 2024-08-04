export const formatDate = (date: string) => {
  const dateObj = new Date(date);

  return dateObj.toLocaleDateString('ru-RU', {
    day: 'numeric',
    month: 'numeric',
    year: 'numeric',
  });
};
