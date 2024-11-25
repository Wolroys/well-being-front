import {EventType} from "../api/calendar";
import {PayloadAction, createSlice} from "@reduxjs/toolkit";
import {CalendarViewType} from "../model/ICalendar";

export interface ICalendarState {
    selectedView: CalendarViewType;
    selectedDate: Date;
    selectedEvent: EventType | null;
    eventToDelete: EventType | null;
    events: EventType[];
}

const initialState: ICalendarState = {
    selectedView: "month",
    selectedEvent: null,
    selectedDate: new Date(),
    eventToDelete: null,
    events: [],
};

const calendarSlice = createSlice({
    name: "calendarSlice",
    initialState,
    reducers: {
        setSelectedView(state, action: PayloadAction<CalendarViewType>) {
            state.selectedView = action.payload;
        },

        setSelectedDate(state, action: PayloadAction<Date>) {
            state.selectedDate = action.payload;
        },

        setEventToDelete(state, action: PayloadAction<EventType | null>) {
            state.eventToDelete = action.payload;
        },

        setEvents(state, action: PayloadAction<EventType[]>) {
            state.events = action.payload;
        },

        setSelectedEvent(state, action: PayloadAction<EventType | null>) {
            state.selectedEvent = action.payload;
        },
    },
});

export const {setSelectedView, setSelectedEvent, setEvents, setEventToDelete, setSelectedDate} =
    calendarSlice.actions;

export default calendarSlice;