import {Table} from "antd";
import React from "react";

import "./TableComponent.scss";
import Loader from "../Loader";
import NoData from "../NoData";
import RepeatableTableRows from "../Skeleton/TableSkeleton";
import {ColumnsType} from "antd/lib/table";
import Dropdown from "../Dropdown";
import ColumnSettings, {swapColumns} from "../ColumnSettings";
import SettingsIcon from "../../icons/SettingsIcon";
import {getColumnOrderFromLocalStorage} from "../../../utils/LocalStorage";
import Button from "../Button/Button";
import {COLOR_TEXT} from "../../../constants";
import {TableProps} from "antd/es/table";
import TableComponentSkeleton from "./TableComponentSkeleton";

/* 
Чтобы активировать настройки таблицы, требуется в массив columns передать следующие ключи:
title: string,
dataIndex: "string",
key: string,
filtered: true, !!!Обязательно

settingsButton: {{
  visible: true,
  table: "Название таблицы для хранения в localStorage"
}}
*/

// Функция проверяет сколько чек-боксов в конструкторе таблиц отключено
const checkCheckboxTableStatus = (checkboxTable: {
    [dataIndex: string]: boolean;
}) => {
    const trueCount = Object.values(checkboxTable).filter(
        value => value === true,
    ).length;

    if (trueCount <= 1) {
        return true;
    } else {
        return false;
    }
};

export interface ITableComponentProps extends TableProps<any> {
    className?: string;
    children?: React.ReactNode;
    // loading?: boolean;
    isLoading?: boolean;
    columns?: ColumnsType<any>;
    settingsButton?: {
        visible: boolean;
        table: "Remark" | "Inspection";
    };
}

const TableComponent: React.FC<ITableComponentProps> = ({
                                                            children,
                                                            className,
                                                            loading = false,
                                                            isLoading,
                                                            columns,
                                                            settingsButton,
                                                            ...other
                                                        }) => {
    // Состояние показа настроек таблицы
    const [isColumnSettingsVisible, setIsColumnSettingsVisible] =
        React.useState(false);
    // Стейт для хранения колонок таблицы
    const [columnsTable, setColumnsTable] = React.useState<ColumnsType<any>>();
    // Стейт для хранения состояния чек-боксов колонок таблицы
    const [checkboxTable, setCheckboxTable] = React.useState<{
        [dataIndex: string]: boolean;
    }>();
    // Стейт для хранения состояния конструктора таблицы
    // Если остается 1 активный столбец, то убираем возможность редактирования, иначе включаем
    const [isConstructorDisabled, setIsConstructorDisabled] =
        React.useState(false);

    // React.useEffect(() => {
    //   checkboxTable &&
    //     setIsConstructorDisabled(checkCheckboxTableStatus(checkboxTable));
    // }, [checkboxTable]);

    React.useEffect(() => {
        // Если в localStorage есть данные о порядке столбцов, то обновляем их в таблице
        const columnOrder = getColumnOrderFromLocalStorage(
            `${settingsButton?.table}_column_order`,
        );
        if (columns) {
            if (columnOrder) {
                // Переупорядочьте столбцы на основе данных из localStorage
                const reorderedColumns = columnOrder.map(
                    (item: {dataIndex: any; visible: boolean}) => {
                        const matchingColumn = columns.find(
                            //@ts-ignore
                            column => column.dataIndex === item.dataIndex,
                        );
                        if (matchingColumn) {
                            matchingColumn.filtered = item.visible;
                        }
                        return matchingColumn;
                    },
                );

                setColumnsTable(reorderedColumns);

                // Обновим состояние чек-боксов на основе visible из columnOrder
                const updatedCheckboxState = columnOrder.reduce(
                    (
                        acc: {[x: string]: any},
                        item: {dataIndex: string | number; visible: any},
                    ) => {
                        acc[item.dataIndex] = item.visible;
                        return acc;
                    },
                    {} as {[dataIndex: string]: boolean},
                );

                setCheckboxTable(updatedCheckboxState);
            } else {
                // Дефолтное состояние колонок
                setColumnsTable(columns);

                // Дефолтное состояние чек-боксов колонок
                const checkboxState = columns.reduce((acc, column) => {
                    //@ts-ignore
                    acc[column.dataIndex] = true;
                    return acc;
                }, {} as {[dataIndex: string]: boolean});
                setCheckboxTable(checkboxState);
            }
        }
    }, []);

    // Функция обработчик клика на чек-бокс конструктора
    const handleColumnVisibilityChange = (
        dataIndex: string,
        checked: boolean,
    ) => {
        if (checkboxTable) {
            // Создайте новый объект состояния чек-боксов на основе текущего состояния
            const updatedCheckboxState = {...checkboxTable};
            // Обновите значение видимости столбца
            updatedCheckboxState[dataIndex] = checked;
            // Установите новое состояние чек-боксов
            setCheckboxTable(updatedCheckboxState);

            if (columnsTable) {
                // Создайте массив с обновленными значениями filtered
                const updatedColumns = columnsTable.map(column => ({
                    ...column,
                    //@ts-ignore
                    filtered: updatedCheckboxState[column.dataIndex],
                }));

                // Обновите setColumnsTable с обновленными значениями filtered
                setColumnsTable(updatedColumns);
            }
        }
    };

    const classes = ["TableComponent"];
    className && classes.push(className);

    // if (isLoading) {
    //   return <RepeatableTableRows />;
    // }

    if (settingsButton?.visible && !columnsTable) {
        return <RepeatableTableRows />;
    }

    return isLoading || !other.dataSource ? (
        <div className="TableComponent__wrapper">
            {/* <RepeatableTableRows className="TableComponent__skeleton" /> */}
            <TableComponentSkeleton />
        </div>
    ) : (
        <div className="TableComponent__wrapper">
            {settingsButton?.visible && (
                <div className="TableComponent__settingsIcon">
                    <Dropdown
                        open={isColumnSettingsVisible}
                        onOpenChange={(open: boolean) => setIsColumnSettingsVisible(open)}
                        dropdownRender={() => (
                            <ColumnSettings
                                table={`${settingsButton?.table}`}
                                columns={columnsTable ? columnsTable : []}
                                onColumnReorder={(fromIndex: number, toIndex: number) => {
                                    setColumnsTable(
                                        swapColumns(
                                            columnsTable ? columnsTable : [],
                                            fromIndex,
                                            toIndex,
                                        ),
                                    );
                                }}
                                onColumnVisibilityChange={handleColumnVisibilityChange}
                                checkboxState={checkboxTable}
                                setCheckboxState={setCheckboxTable}
                                disabled={isConstructorDisabled}
                            />
                        )}
                        trigger={["click"]}>
                        <Button mode="icon" height="small">
                            <SettingsIcon fill={COLOR_TEXT} width="20" height="20" />
                        </Button>
                    </Dropdown>
                </div>
            )}
            <Table
                data-testid="TableComponent"
                loading={{
                    spinning: loading ? true : false,
                    indicator: <Loader width="60" height="60" />,
                    wrapperClassName: "TableComponent__loading",
                }}
                locale={{
                    emptyText: <NoData />,
                }}
                className={classes.join(" ")}
                showSorterTooltip={false}
                columns={
                    settingsButton?.visible && columnsTable
                        ? columnsTable.filter((column: any) => column?.filtered)
                        : columns
                }
                {...other}>
                {children}
            </Table>
        </div>
    );
};

export default TableComponent;