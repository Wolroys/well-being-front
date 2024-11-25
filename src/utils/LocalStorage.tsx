// Функция для извлечения и анализа данных о порядке столбцов из localStorage
// Передаем название
export const getColumnOrderFromLocalStorage = (name: string) => {
    const storageColumnData = localStorage.getItem(name);
    if (storageColumnData) {
        try {
            return JSON.parse(storageColumnData);
        } catch (error) {
            console.error("Error parsing column order data from localStorage", error);
        }
    }
    return null;
};