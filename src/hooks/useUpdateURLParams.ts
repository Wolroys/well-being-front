import {useEffect, useCallback} from "react";
import queryString from "query-string";

interface IUpdateURLParams {
    [paramName: string]: string | null;
}

/* Хук записывает параметры в URL
Пример использования:
const updateURLParams = useUpdateURLParams();
updateURLParams({page: "0"})
Что бы удалить параметр из URL, нужно передать его значение null, например, updateURLParams({page: null}) */

export const useUpdateURLParams = () => {
    const updateURLParams = useCallback((params: IUpdateURLParams) => {
        const currentURLParams = queryString.parse(window.location.search);

        // Удаляем параметры со значением null
        for (const paramName in params) {
            if (params[paramName] === null) {
                delete currentURLParams[paramName];
            } else {
                currentURLParams[paramName] = params[paramName];
            }
        }

        const newURL = `${window.location.pathname}?${queryString.stringify(
            currentURLParams,
        )}`;
        window.history.pushState({path: newURL}, "", newURL);
    }, []);

    useEffect(() => {
        const handlePopstate = () => {
            // Обновляем URL при изменении истории переходов
            const currentURLParams = queryString.parse(window.location.search);
            const newURL = `${window.location.pathname}?${queryString.stringify(
                currentURLParams,
            )}`;
            window.history.replaceState({path: newURL}, "", newURL);
        };

        window.addEventListener("popstate", handlePopstate);

        return () => {
            window.removeEventListener("popstate", handlePopstate);
        };
    }, []);

    return updateURLParams;
};