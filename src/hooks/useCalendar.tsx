import {t} from "i18next";
import {useSelector} from "react-redux";
import {TimeTypeKey} from "../model/ICalendar";
import {ICalendarState} from "../store/calendarSlice";
import moment from "moment-timezone";

const useCalendar = () => {
    const {selectedView, selectedEvent, events, eventToDelete, selectedDate} = useSelector(
        (state: {calendar: ICalendarState}) => state.calendar,
    );

    const getMonthShortName = (monthIndex: number) => {
        const shortNames: string[] = [
            "jan_short",
            "feb_short",
            "mar_short",
            "apr_short",
            "may_short",
            "jun_short",
            "jul_short",
            "aug_short",
            "sep_short",
            "oct_short",
            "nov_short",
            "dec_short",
        ];

        return t(`calendar.${shortNames[monthIndex]}`);
    };

    const findEventsByDate = (
        date: Date,
        events: {startDate: Date | string; endDate: Date | string}[],
    ): any[] => {
        const newDate = new Date(date)
        return events.filter(event => {
            if (
                moment(newDate.setHours(1, 0, 0, 0)).isBetween(
                    moment(event.startDate).set("h", 0),
                    moment(event.endDate).set("h", 2),
                )
            ) {
                return event;
            }
        });
    };

    const getTimeTypeByKey = (key: TimeTypeKey) => {
        switch (key) {
            case "m":
                return t("calendar.time_minute");
            case "h":
                return t("calendar.time_hour");
            case "d":
                return t("schedule.date_day");
            case "w":
                return t("schedule.date_week");
            default:
                return "";
        }
    };

    return {
        getMonthShortName,
        events,
        eventToDelete,
        getTimeTypeByKey,
        selectedDate,
        selectedView,
        findEventsByDate,
        selectedEvent
    };
};

export default useCalendar;