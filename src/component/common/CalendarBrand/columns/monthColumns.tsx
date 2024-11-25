import {t} from 'i18next';
import React from "react";
import { ColumnType } from "antd/lib/table";
import {ICalendarWeek} from "../../../../model/ICalendar";
import useCalendar from "../../../../hooks/useCalendar";
import BadgetBrand from "../../BadgetBrand";
import moment from "moment-timezone";
import { EventType} from "../../../../api/calendar";
import {useDispatch} from "react-redux";
import {setSelectedEvent} from "../../../../store/calendarSlice";

interface CalendarMonthCellProps {
    date?: Date;
    events: EventType[];
}

const getMonthName = (date?: Date) => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const {getMonthShortName} = useCalendar();
    if (date) {
        const isFirstDate = date.getDate() === 1;
        const monthName = isFirstDate ? getMonthShortName(date.getMonth()) : "";
        return " " + monthName.toLowerCase();
    }
    return "";
};

const CalendarMonthCell = (props: CalendarMonthCellProps) => {
    const {date, events} = props;
    const {selectedDate} = useCalendar();
    const dispatch = useDispatch();
    return (
        <div
            className={` calendarBrand__month ${
                selectedDate.getTime() === date?.getTime()
                    ? "calendarBrand__cell_selected"
                    : ""
            }`}>
            {date?.getDate() + getMonthName(date)}
            <div className="calendarBrand__month-list">
                {events.map(event => {
                    return (
                        <BadgetBrand
                            onClick={() => dispatch(setSelectedEvent(event))}
                            title={event.title ?? "-"}
                            time={
                                moment(event.startDate).format("HH:mm") +
                                " - " +
                                moment(event.endDate).format("HH:mm")
                            }
                        />
                    );
                })}
            </div>
        </div>
    );
};

const getColumns = (): ColumnType<any>[] => {
    return [
        {
            title: `${t("calendar.monday_short")}`,
            dataIndex: "name",
            key: "name_day",
            width: "14.28%",
            filtered: true,
            render: (text, record: ICalendarWeek) => {
                const date = record?.mon?.date;
                return (
                    <CalendarMonthCell events={record?.mon?.events ?? []} date={date} />
                );
            },
        },
        {
            title: `${t("calendar.tuesday_short")}`,
            dataIndex: "name",
            key: "name_day",
            width: "14.28%",
            filtered: true,
            render: (text, record: ICalendarWeek) => {
                const date = record?.tue?.date;
                return (
                    <CalendarMonthCell events={record?.tue?.events ?? []} date={date} />
                );
            },
        },
        {
            title: `${t("calendar.wednesday_short")}`,
            dataIndex: "name",
            key: "name_day",
            width: "14.28%",
            filtered: true,
            render: (text, record: ICalendarWeek) => {
                const date = record?.wed?.date;
                return (
                    <CalendarMonthCell events={record?.wed?.events ?? []} date={date} />
                );
            },
        },
        {
            title: `${t("calendar.thursday_short")}`,
            dataIndex: "name",
            key: "name_day",
            width: "14.28%",
            filtered: true,
            render: (text, record: ICalendarWeek) => {
                const date = record?.thu?.date;
                return (
                    <CalendarMonthCell events={record?.thu?.events ?? []} date={date} />
                );
            },
        },
        {
            title: `${t("calendar.friday_short")}`,
            dataIndex: "name",
            key: "name_day",
            width: "14.28%",
            filtered: true,
            render: (text, record: ICalendarWeek) => {
                const date = record?.fri?.date;
                return (
                    <CalendarMonthCell events={record?.fri?.events ?? []} date={date} />
                );
            },
        },
        {
            title: `${t("calendar.saturday_short")}`,
            dataIndex: "name",
            key: "name_day",
            width: "14.28%",
            filtered: true,
            render: (text, record: ICalendarWeek) => {
                const date = record?.sat?.date;
                return (
                    <CalendarMonthCell events={record?.sat?.events ?? []} date={date} />
                );
            },
        },
        {
            title: `${t("calendar.sunday_short")}`,
            dataIndex: "name",
            key: "name_day",
            width: "14.28%",
            filtered: true,
            render: (text, record: ICalendarWeek) => {
                const date = record?.sun?.date;
                return (
                    <CalendarMonthCell events={record?.sun?.events ?? []} date={date} />
                );
            },
        },
    ];
};

export default getColumns;