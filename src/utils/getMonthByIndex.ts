import { t } from "i18next";

type IndexType = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

const getMonthByIndex = (index: IndexType) => {
    const monthArray = [
        "jan",
        "feb",
        "mar",
        "apr",
        "may",
        "jun",
        "jul",
        "aug",
        "sep",
        "oct",
        "nov",
        "dec",
    ];

    const tName = monthArray[index]

    return `${t(`calendar.${tName}_short`)}`
};

export default getMonthByIndex;