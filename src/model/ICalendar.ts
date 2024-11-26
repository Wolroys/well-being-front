import { EventType} from "../api/calendar";

export type CalendarEventType = {
    startDate: Date;
    endDate: Date;
    name: string;
    color: string;
};

export type ICalendarDay = {
    date: Date;
    events: EventType[];
} | null;

export type ColorItemData = {
    color: string;
    id: string;
};

export interface ICalendarWeek {
    mon: ICalendarDay;
    tue: ICalendarDay;
    wed: ICalendarDay;
    thu: ICalendarDay;
    fri: ICalendarDay;
    sat: ICalendarDay;
    sun: ICalendarDay;
}

export type CalendarEventDateType = {
    dateFrom: Date;
    dateTo: Date;
};

export type TimeTypeKey = "m" | "h" | "d" | "w";

export type CalendarViewType = "month" | "week" | "day";