/* eslint-disable */
import React, {FC} from "react";
import {Pagination} from "antd";
import "./Pagination.scss";
import {useTranslation} from "react-i18next";
import {PAGE_SIZE} from "../../../constants";
import Text from "../Text";

export interface IPaginationCustom {
    total: number;
    onChange: (page: number, pageSize: number) => void;
    current: number;
    pageSize?: number;
    disabled?: boolean;
}

const PaginationCustom: FC<IPaginationCustom> = ({
                                                     total,
                                                     onChange,
                                                     current,
                                                     disabled,
                                                     pageSize,
                                                 }) => {
    const {t} = useTranslation();

    return (
        <div className="pagination">
            <Text variant="h3_r" className="pagination__pages">
                {t("pagination.pages")}
            </Text>
            <Pagination
                pageSize={pageSize ? pageSize : PAGE_SIZE}
                current={current}
                onChange={onChange}
                total={total}
                disabled={disabled}
                showLessItems
            />
        </div>
    );
};
export default PaginationCustom;