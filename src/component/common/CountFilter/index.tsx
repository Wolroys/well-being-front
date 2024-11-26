import React from "react";
import {Select, Typography} from "antd";
import {useTranslation} from "react-i18next";

import "./CountFilter.scss";
import SelectComponent from "../SelectComponent";
import {useUpdateURLParams} from "../../../hooks/useUpdateURLParams";
import {useSearchParams} from "react-router-dom";
import Text from "../Text";

const {Option} = Select;

export interface ICountFilter {
    onChange: React.Dispatch<React.SetStateAction<number>>;
    setPageNumber?: React.Dispatch<React.SetStateAction<number>>;
    setCount?: React.Dispatch<React.SetStateAction<number>>;
    isUpdateURL: boolean;
}

// Варианты фильтрации
const resultArray = [10, 20, 30, 40, 50];

const CountFilter: React.FC<ICountFilter> = ({
                                                 onChange,
                                                 setPageNumber,
                                                 setCount,
                                                 isUpdateURL,
                                             }) => {
    const {t} = useTranslation();
    const updateURLParams = useUpdateURLParams();
    const [searchParams] = useSearchParams();

    const pageSizeFromParams = searchParams.get("pageSize");

    return (
        <div className="CountFilter">
            <Text variant="h3_r" className="CountFilter__label">
                {t("for_all.count_filter")}
            </Text>
            <SelectComponent
                className="CountFilter__select"
                defaultValue={pageSizeFromParams ? pageSizeFromParams : resultArray[0]}
                onChange={(_: any, record: any) => {
                    onChange(record.value);
                    setPageNumber && setPageNumber(0);
                    setCount && setCount(1);
                    if (isUpdateURL) {
                        updateURLParams({pageSize: String(record.value)});
                        updateURLParams({page: "1"});
                    }
                }}>
                {resultArray.map((num: number) => (
                    <Option key={num} value={num}>
                        {num}
                    </Option>
                ))}
            </SelectComponent>
        </div>
    );
};

export default CountFilter;