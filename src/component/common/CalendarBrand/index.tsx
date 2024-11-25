import React, {useEffect, useState} from "react";
import TableComponent from "../TableComponent";
import Column from "antd/lib/table/Column";
import getMonthColumns from "./columns/monthColumns";
import "./index.scss";
import moment from "moment-timezone";
import getMonthByIndex from "../../../utils/getMonthByIndex";
import {ICalendarWeek} from "../../../model/ICalendar";
import {EventType} from "../../../api/calendar";
import useCalendar from "../../../hooks/useCalendar";

interface Props {
    date: Date;
    events?: EventType[];
}

const CalendarBrand = (props: Props) => {
    const {date, events} = props;
    const month = date.getMonth();
    const monthColumns = getMonthColumns();
    const {findEventsByDate} = useCalendar();

    const [tableData, setTableData] = useState<ICalendarWeek[]>([]);

    const daysWeek: (keyof ICalendarWeek)[] = [
        "sun",
        "mon",
        "tue",
        "wed",
        "thu",
        "fri",
        "sat",
    ];

    const getDaysInMonth = (monthIndex: number) => {
        return moment(date).month(monthIndex).daysInMonth();
    };

    const getFirstMonday = (monthIndex: number) => {
        // ф-ция получения первого понедельника(1 ячейка в таблице)
        const firstDateMoment = moment(date).month(monthIndex).date(1);
        const firstDate = firstDateMoment.toDate();
        if (firstDate.getDay() === 1) {
            return firstDate;
        } else {
            // если 1 число не понедельник, получаем последний понедельник прыдыдущего месяца
            const firstDayIndex = firstDate.getDay() === 0 ? 7 : firstDate.getDay();
            const daysToSubtract = firstDayIndex - 1;
            const newDate = new Date(
                firstDate.setDate(firstDate.getDate() - daysToSubtract),
            );

            return newDate;
        }
    };

    const getLastSunday = (monthIndex: number) => {
        // ф-ция получения последнего воскресенья(последняя ячейка в таблице)
        const lastDayIndex = getDaysInMonth(monthIndex);
        const lastDateMoment = moment(date).month(monthIndex).date(lastDayIndex);
        const lastDate = lastDateMoment.toDate();
        if (lastDate.getDay() === 0) {
            return lastDate;
        } else {
            // если последнее число месяца не воскресенье, то получаем первое воскресенье следующего месяца
            const daysToAdd = 7 - lastDate.getDay();
            const newDate = new Date(
                lastDate.setDate(lastDate.getDate() + daysToAdd),
            );

            return newDate;
        }
    };

    useEffect(() => {
        const newTableData: ICalendarWeek[] = [];

        const startDate = moment(getFirstMonday(month));
        const endDate = moment(getLastSunday(month));

        const dates = [];

        while (startDate.diff(endDate) <= 0) {
            dates.push(startDate.clone().toDate());
            startDate.add(1, "days");
        }

        let weekObjInit: ICalendarWeek = {
            mon: null,
            tue: null,
            wed: null,
            thu: null,
            fri: null,
            sat: null,
            sun: null,
        };

        let weekObj: ICalendarWeek = {...weekObjInit};

        dates.forEach(item => {
            const dayIndex = item.getDay();
            const obj = {
                date: item,
                events: findEventsByDate(item, events ?? []),
            };
            if (dayIndex !== 0) {
                weekObj[daysWeek[dayIndex]] = obj;
            } else {
                weekObj[daysWeek[dayIndex]] = obj;

                newTableData.push(weekObj);
                weekObj = {...weekObjInit};
            }
        });

        setTableData(newTableData);
    }, [date, events]);

    return (
        <div className="calendarBrand">
            <TableComponent
                isLoading={false}
                rowKey={"id"}
                pagination={false}
                dataSource={tableData}>
                {monthColumns?.map(column => {
                    return (
                        <Column
                            title={column.title}
                            dataIndex={column.dataIndex}
                            className="calendarBrand__cell"
                            key={column.key}
                            render={column.render}
                            width={column?.width}
                        />
                    );
                })}
            </TableComponent>
        </div>
    );
};

export default CalendarBrand;