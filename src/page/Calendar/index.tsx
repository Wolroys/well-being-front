import { useEffect, useRef, useState } from 'react';
import FullCalendar, { Calendar, EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import interactionPlugin from '@fullcalendar/interaction';
import listPlugin from '@fullcalendar/list';
import Sidebar from "../../component/common/Sidebar";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useGetAllEventsQuery } from "../../api/calendar"

interface CreateEventForm {
    id: number;
    title: string;
    description: string;
    startDate: Date;
    speakerId: number;
    url: string;
    status: string;
}

const CalendarApp: React.FC = () => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const modalTriggerRef = useRef<HTMLButtonElement>(null);

    let selectedEvent: FullCalendar.EventApi | null = null;
    let selectedDateInfo: DateSelectArg | null = null;

    const { data: eventsData, error, isLoading } = useGetAllEventsQuery({
        params: {},
    });

    const [startDate, setStartDate] = useState<Date | null>(null);

    useEffect(() => {
        const today = new Date();

        const addDays = (date: Date, days: number): Date => {
            const result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        };

        const formatDate = (date: Date): string =>
            date.toLocaleDateString('ru-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });

        const events = Array.isArray(eventsData?.data) ? eventsData.data : [];

        const calendar = new Calendar(calendarRef.current as HTMLElement, {
            plugins: [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin],
            initialView: 'dayGridMonth',
            initialDate: today.toISOString().split('T')[0],
            events: events.map((event: any) => {
                const start = event.startDate ? new Date(event.startDate).toISOString().split('T')[0] : today;

                return {
                    id: event.id,
                    title: event.title,
                    start: start,
                    classNames: ['fc-event-primary'],
                };
            }),
            editable: true,
            selectable: true,
            contentHeight: 600,
            aspectRatio: 2,
            select: (info: DateSelectArg) => {
                selectedEvent = null;
                selectedDateInfo = info;

                setStartDate(info.start);

                const modalTitle = document.getElementById('modalTitle') as HTMLHeadingElement;
                modalTitle.textContent = `${formatDate(info.start)}`;

                modalTriggerRef.current?.click();
            },
            eventClick: (info: EventClickArg) => {
                selectedEvent = info.event;

                const modalTitle = document.getElementById('modalTitle') as HTMLHeadingElement;
                modalTitle.textContent = `${formatDate(info.event.start!)}`;

                modalTriggerRef.current?.click();
            },
        });

        calendar.render();

        const eventForm = document.getElementById('eventForm') as HTMLFormElement;
        eventForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const eventTitleInput = document.getElementById('eventTitle') as HTMLInputElement;
            const title = eventTitleInput.value;

            if (title) {
                if (selectedEvent) {
                    selectedEvent.setProp('title', title);
                } else if (selectedDateInfo) {
                    calendar.addEvent({
                        title: title,
                        start: startDate?.toISOString().split('T')[0] + 'T00:00:00',
                        end: startDate?.toISOString().split('T')[0] + 'T23:59:59',
                    });
                }
            }

            const modal = document.getElementById('calendar-event-modal');
            modal?.classList.add('hidden');
        });

        return () => {
            calendar.destroy();
        };
    }, [startDate, eventsData, isLoading]);


    return (
        <div className="flex">
            {/* Навигационная панель */}
            <Sidebar />

            {/* Календарь */}
            <div className="flex-grow">
                <div className="card flex not-prose p-4 w-full bg-gray-200 text-black">
                    <div id="calendar-custom" ref={calendarRef}></div>
                </div>
                <button
                    type="button"
                    className="btn hidden"
                    ref={modalTriggerRef}
                    id="modalTrigger"
                    aria-haspopup="dialog"
                    aria-expanded="false"
                    aria-controls="calendar-event-modal"
                    data-overlay="#calendar-event-modal"
                ></button>
                <div id="calendar-event-modal" className="overlay modal overlay-open:opacity-100 hidden" role="dialog"
                     tabIndex={-1}>
                    <div className="modal-dialog overlay-open:opacity-100">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h3 className="modal-title" id="modalTitle">
                                    Event
                                </h3>
                                <button
                                    type="button"
                                    className="btn btn-text btn-circle btn-sm absolute end-3 top-3"
                                    aria-label="Close"
                                    data-overlay="#calendar-event-modal"
                                >
                                    <span className="icon-[tabler--x] size-4"></span>
                                </button>
                            </div>
                            <form id="eventForm" className="space-y-4">
                                <div>
                                    <label htmlFor="eventTitle" className="block text-sm font-medium text-gray-700">
                                        Название события
                                    </label>
                                    <input
                                        type="text"
                                        id="eventTitle"
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                        placeholder="Введите название события"
                                        required
                                    />
                                </div>
                                <div>
                                    <label htmlFor="startDate" className="block text-sm font-medium text-gray-700">
                                        Дата начала
                                    </label>
                                    <DatePicker
                                        selected={startDate}
                                        onChange={(date) => setStartDate(date as Date)}
                                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                                    />
                                </div>
                                <div className="modal-footer">
                                    <button type="button" className="btn btn-soft btn-secondary"
                                            data-overlay="#calendar-event-modal">
                                        Close
                                    </button>
                                    <button type="submit" className="btn btn-primary">
                                        Save changes
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default CalendarApp;
