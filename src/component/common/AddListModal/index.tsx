import React, {useState} from "react";
import {Modal} from "../Modal/Modal";
import TableComponent, {ITableComponentProps} from "../TableComponent";
import Column from "antd/lib/table/Column";
import {Input, InputProps, MenuProps} from "antd";
import InputSearchIcon from "../../icons/InputSearchIcon";
import InputBrand from "../InputBrand";
import PaginationCustom, {IPaginationCustom} from "../pagination/Pagination";
import CountFilter, {ICountFilter} from "../CountFilter";
import {COLOR_TEXT, PAGE_SIZE} from "../../../constants";
import "./index.scss";
import ButtonSimple from "../ButtonSimple";
import Button from "../Button/Button";
import {ColumnProps} from "antd/es/table";
import {ColumnType, TableProps} from "antd/lib/table";
import DropdownButton from "../DropdownButton";
import Text from "../Text";
import {t} from "i18next";
import ArrowIcon from "../../icons/ArrowIcon";

interface IFilter {
    employments: {
        data: string[];
        selected: string | null;
        setSelected: React.Dispatch<React.SetStateAction<string>>;
        disabled?: boolean;
        // setSearch: React.Dispatch<React.SetStateAction<string>>;
        // search: string;
    };
}

interface Props {
    isOpen?: boolean;
    paginationSettings?: IPaginationCustom;
    countSettings?: ICountFilter;
    searchSettings?: InputProps;
    tableSettings?: ITableComponentProps;
    titleModal?: React.ReactNode;
    columns?: ColumnType<any>[];
    onSubmit?: Function;
    onCancel?: Function;
    filterSettings?: IFilter;
    tableProps?: TableProps<any>;
}

const AddListModal = (props: Props) => {
    const {
        isOpen = true,
        paginationSettings,
        searchSettings,
        columns,
        tableProps,
        tableSettings,
        countSettings,
        filterSettings,
        onCancel,
        onSubmit,
        titleModal,
    } = props;

    const [isFilterVisible, setIsFilterVisible] = useState(false);

    const handleCLickClearFilters = () => {
        filterSettings?.employments.setSelected("");
    };

    // Список items организаций
    const criteriaOrganizationItems: MenuProps["items"] = [
        ...(filterSettings?.employments.data
            ? [
                {
                    key: "all",
                    className: "AddListModal__clear",
                    label: (
                        <Text style={{color: "red"}} variant="p_r">{`${t(
                            "inspections.clear",
                        )}`}</Text>
                    ),
                    onClick: (info: MenuInfo) => {
                        filterSettings?.employments.setSelected("");
                        setIsFilterVisible(false);
                    },
                },
                ...filterSettings?.employments.data.map(item => ({
                    key: item,
                    label: <Text variant="p_r">{item}</Text>,
                    onClick: (info: MenuInfo) => {
                        filterSettings?.employments.setSelected(item);
                        setIsFilterVisible(false);
                    },
                })),
            ]
            : []),
    ];

    return (
        <Modal
            onCancel={() => onCancel && onCancel()}
            className="AddListModal"
            open={isOpen}>
            {titleModal && <div className="AddListModal__title">{titleModal}</div>}

            <div className="AddListModal__header">
                {searchSettings && (
                    <InputBrand
                        size="large"
                        className="AddListModal__search"
                        placeholder="large size"
                        {...searchSettings}
                        prefix={<InputSearchIcon fill="#7B8395" />}
                    />
                )}
                {filterSettings && (
                    <DropdownButton
                        className="AddListModal__filter"
                        text={
                            filterSettings?.employments.selected
                                ? filterSettings?.employments.selected
                                : t("table.organization")
                        }
                        visible={isFilterVisible}
                        disabled={filterSettings.employments?.disabled}
                        onVisible={(open: boolean) => setIsFilterVisible(open)}
                        items={criteriaOrganizationItems}
                        placement="bottomLeft"
                        trigger={["click"]}
                    />
                )}
            </div>

            {tableSettings && (
                <TableComponent
                    className="AddListModal__list"
                    isLoading={tableSettings.isLoading}
                    rowKey={tableSettings?.rowKey ?? "id"}
                    pagination={false}
                    dataSource={tableSettings?.dataSource}
                    {...tableProps}>
                    {columns?.map(column => {
                        return (
                            <Column
                                title={column.title}
                                dataIndex={column.dataIndex}
                                className="AddListModal__cell"
                                key={column.key}
                                render={column.render}
                            />
                        );
                    })}
                </TableComponent>
            )}
            {paginationSettings && (
                <div className="AddListModal__pagination">
                    <PaginationCustom {...paginationSettings} />
                    {countSettings && <CountFilter {...countSettings} />}
                </div>
            )}
            {onCancel && onSubmit && (
                <div className="AddListModal__btns">
                    <ButtonSimple
                        className="AddListModal__cancel"
                        onClick={val => onCancel(val)}>{`${t(
                        "for_all.cancel",
                    )}`}</ButtonSimple>
                    <Button onClick={onSubmit}>{`${t("for_all.add")}`}</Button>
                </div>
            )}
        </Modal>
    );
};

export default AddListModal;