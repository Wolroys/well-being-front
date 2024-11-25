import React from "react";
import {useTranslation} from "react-i18next";
import {
    DragDropContext,
    Draggable,
    DropResult,
    Droppable,
} from "react-beautiful-dnd";

import "./ColumnSettings.scss";
import type {ColumnsType} from "antd/es/table";
import Input from "../../Input/Input";
import InputSearchIcon from "../../icons/InputSearchIcon";
import {COLOR_ERROR, COLOR_QUATERNARY60, COLOR_TEXT} from "../../../constants";
import CheckboxComponent from "../CheckboxComponent";
import DragAndDropIcon from "../../icons/DragAndDropIcon";
import NoData from "../NoData";

// Функция обработки перемещения колонок
export const swapColumns = (
    columns: ColumnsType<any>,
    fromIndex: number,
    toIndex: number,
) => {
    const newColumns = [...columns];
    const [movedColumn] = newColumns.splice(fromIndex, 1);
    newColumns.splice(toIndex, 0, movedColumn);
    return newColumns;
};

interface IColumnSettingsProps {
    table: "Remark" | "Inspection";
    columns: ColumnsType<any>;
    onColumnReorder: (startIndex: number, endIndex: number) => void;
    onColumnVisibilityChange: (columnName: string, checked: boolean) => void;
    checkboxState:
        | {
        [dataIndex: string]: boolean;
    }
        | undefined;
    setCheckboxState: React.Dispatch<
        React.SetStateAction<
            | {
            [dataIndex: string]: boolean;
        }
            | undefined
        >
    >;
    disabled: boolean;
}

const ColumnSettings: React.FC<IColumnSettingsProps> = ({
                                                            table,
                                                            columns,
                                                            onColumnReorder,
                                                            onColumnVisibilityChange,
                                                            checkboxState,
                                                            setCheckboxState,
                                                            disabled,
                                                        }) => {
    const {t} = useTranslation();

    // Стейт поиска
    const [searchQuery, setSearchQuery] = React.useState<string>("");

    React.useEffect(() => {
        // Проверяем, есть ли данные о видимости колонок в localStorage
        const localStorageColumn = localStorage.getItem(`${table}_column_order`);

        if (localStorageColumn) {
            // Если данные есть, преобразуем их из строки JSON
            const columnsData = JSON.parse(localStorageColumn);

            // Создаем объект, чтобы обновить состояние чекбоксов
            const updatedCheckboxState = {...checkboxState};

            // Обновляем состояние для каждой колонки
            columnsData.forEach((column: {dataIndex: string; visible: boolean}) => {
                updatedCheckboxState[column.dataIndex] = column.visible;
            });

            // Устанавливаем новое состояние чекбоксов
            setCheckboxState(updatedCheckboxState);
        }
    }, [table]);

    // Функция обновления данных в localStorage
    const saveColumnOrderToLocalStorage = (
        columns: ColumnsType<any>,
        fromIndex: number,
        toIndex: number,
    ) => {
        const newTable = swapColumns(columns, fromIndex, toIndex);

        const column = newTable?.map(column => ({
            //@ts-ignore
            dataIndex: column.dataIndex,
            //@ts-ignore
            visible: checkboxState[column.dataIndex],
        }));

        // Сохраняем колонку в localStorage
        localStorage.setItem(`${table}_column_order`, JSON.stringify(column));
    };

    // Обработчик drad and drop
    const handleDragEnd = (result: DropResult) => {
        if (!result.destination) {
            return;
        }
        const startIndex = result.source.index;
        const endIndex = result.destination.index;
        // Вызываем функцию родительского компонента, чтобы обновить порядок столбцов
        onColumnReorder(startIndex, endIndex);

        // Сохраняем колонку в localStorage
        saveColumnOrderToLocalStorage(columns, startIndex, endIndex);
    };

    // Фильтрация на основе поиска
    const filteredColumns = columns.filter(column =>
        {
            return String(column?.title).toLowerCase().includes(searchQuery.toLowerCase())
        }
    );

    // Обработчик изменения состояния чекбокса
    const handleCheckboxChange = (dataIndex: string, checked: boolean) => {
        setCheckboxState(prevState => ({
            ...prevState,
            [dataIndex]: checked,
        }));

        // Передаваемая функция из родительсокго компонента
        onColumnVisibilityChange(dataIndex, checked);

        // Обновляем состояние видимости в localStorage
        const localStorageColumn = localStorage.getItem(`${table}_column_order`);
        if (localStorageColumn) {
            const columns = JSON.parse(localStorageColumn);
            const updatedColumns = columns?.map((column: any) => {
                if (column.dataIndex === dataIndex) {
                    column.visible = checked;
                }
                return column;
            });
            localStorage.setItem(
                `${table}_column_order`,
                JSON.stringify(updatedColumns),
            );
        } else {
            const column = columns?.map(column => ({
                //@ts-ignore
                dataIndex: column.dataIndex,
                //@ts-ignore
                visible: checkboxState[column.dataIndex],
            }));

            // Сохраняем колонку в localStorage
            localStorage.setItem(`${table}_column_order`, JSON.stringify(column));
        }
    };

    const getDisabled = (column: any): boolean => {
        if (column?.filtered) {
            const activeColumns = columns.filter(item => item.filtered);
            if (activeColumns?.length < 2) {
                return true;
            }
        }
        return false;
    };

    return (
        <div className="ColumnSettings">
            <div className="ColumnSettings__wrapper">
                <div className="ColumnSettings__search">
                    <Input
                        mode="searchDropdown"
                        prefix={<InputSearchIcon fill={COLOR_TEXT} />}
                        placeholder={t("inspections.search_dropdown")}
                        value={searchQuery}
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                            setSearchQuery(e.target.value)
                        }
                    />
                </div>
                <DragDropContext onDragEnd={handleDragEnd}>
                    <Droppable
                        droppableId="columns"
                        // Если работает поиск, то отключаем drag and drop
                        isDropDisabled={searchQuery.length > 0 || disabled}>
                        {provided => (
                            <>
                                <ul
                                    className="ColumnSettings__list"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}>
                                    {filteredColumns &&
                                        filteredColumns?.length > 0 &&
                                        filteredColumns?.map((column, index) => {
                                            if (!column?.key) {
                                                // console.log("columns data", {
                                                //   filteredColumns,
                                                //   columns,
                                                //   column,
                                                // });
                                            }
                                            return (
                                                <Draggable
                                                    key={column?.key}
                                                    draggableId={String(column?.key)}
                                                    index={index}>
                                                    {(provided, snapshot) => (
                                                        <li
                                                            ref={provided.innerRef}
                                                            {...provided.draggableProps}
                                                            {...provided.dragHandleProps}
                                                            className={`ColumnSettings__item ${
                                                                snapshot.isDragging ? "dragging" : ""
                                                            }`}>
                                                            <div className="ColumnSettings__item-title">
                                                                <CheckboxComponent
                                                                    mode="square"
                                                                    defaultChecked={
                                                                        //@ts-ignore
                                                                        checkboxState[column.dataIndex]
                                                                    }
                                                                    onChange={checked =>
                                                                        handleCheckboxChange(
                                                                            //@ts-ignore
                                                                            column.dataIndex,
                                                                            checked,
                                                                        )
                                                                    }
                                                                    disabled={getDisabled(column)}
                                                                />
                                                                {
                                                                    //@ts-ignore
                                                                    typeof column?.title === "string"
                                                                        ? String(column?.title)
                                                                        : //@ts-ignore
                                                                        t(`table.${String(column.dataIndex)}`)
                                                                }
                                                            </div>
                                                            <div className="ColumnSettings__item-icon">
                                                                <DragAndDropIcon
                                                                    fill={
                                                                        searchQuery.length > 0
                                                                            ? COLOR_ERROR
                                                                            : COLOR_QUATERNARY60
                                                                    }
                                                                />
                                                            </div>
                                                        </li>
                                                    )}
                                                </Draggable>
                                            );
                                        })}
                                    {provided.placeholder}
                                </ul>
                                {filteredColumns && filteredColumns.length === 0 && (
                                    <div className="ColumnSettings__item-noData">
                                        <NoData />
                                    </div>
                                )}
                            </>
                        )}
                    </Droppable>
                </DragDropContext>
            </div>
        </div>
    );
};

export default ColumnSettings;