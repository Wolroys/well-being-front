import { useEffect, useRef } from 'react';
import FullCalendar, { Calendar, EventInput, DateSelectArg, EventClickArg } from '@fullcalendar/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import timeGridPlugin from '@fullcalendar/timegrid';
import listPlugin from '@fullcalendar/list';

const CalendarApp: React.FC = () => {
    const calendarRef = useRef<HTMLDivElement>(null);
    const modalTriggerRef = useRef<HTMLButtonElement>(null);

    let selectedEvent: FullCalendar.EventApi | null = null;
    let selectedDateInfo: DateSelectArg | null = null;

    useEffect(() => {
        const today = new Date();

        const addDays = (date: Date, days: number): Date => {
            const result = new Date(date);
            result.setDate(result.getDate() + days);
            return result;
        };

        const formatDate = (date: Date): string =>
            date.toLocaleDateString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
            });

        const events: EventInput[] = [
            {
                title: 'Past Event',
                start: addDays(today, -2).toISOString().split('T')[0],
                classNames: ['fc-event-info'],
            },
            {
                title: 'All Day Event',
                start: addDays(today, 2).toISOString().split('T')[0],
                classNames: ['fc-event-info'],
            },
            {
                title: 'Long Event',
                start: addDays(today, 2).toISOString().split('T')[0],
                end: addDays(today, 5).toISOString().split('T')[0],
                classNames: ['fc-event-primary'],
            },
            // Add other events here
        ];

        const calendar = new Calendar(calendarRef.current as HTMLElement, {
            plugins: [dayGridPlugin, timeGridPlugin, listPlugin],
            initialView: 'dayGridMonth',
            initialDate: today.toISOString().split('T')[0],
            editable: true,
            selectable: true,
            events: events,
            select: (info: DateSelectArg) => {
                const blockedStart = addDays(today, 17).getTime();
                const blockedEnd = addDays(today, 20).getTime();
                const selectedStart = info.start.getTime();
                const selectedEnd = info.end ? info.end.getTime() : selectedStart;

                if (
                    (selectedStart < blockedEnd && selectedEnd > blockedStart) ||
                    (selectedEnd > blockedStart && selectedStart < blockedEnd)
                ) {
                    alert('Events cannot be added in the blocked date range.');
                    calendar.unselect();
                    return;
                }

                selectedEvent = null;
                selectedDateInfo = info;

                const modalTitle = document.getElementById('modalTitle') as HTMLHeadingElement;
                modalTitle.textContent = `${formatDate(info.start)}`;

                const eventForm = document.getElementById('eventForm') as HTMLFormElement;
                eventForm.reset();

                modalTriggerRef.current?.click();
            },
            eventClick: (info: EventClickArg) => {
                selectedEvent = info.event;

                const modalTitle = document.getElementById('modalTitle') as HTMLHeadingElement;
                modalTitle.textContent = `${formatDate(info.event.start!)}`;

                const eventTitleInput = document.getElementById('eventTitle') as HTMLInputElement;
                eventTitleInput.value = info.event.title || '';

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
                        start: selectedDateInfo.startStr,
                        end: selectedDateInfo.endStr,
                        allDay: true,
                    });
                }
            }

            // Close modal (replace this with your modal library's method)
            const modal = document.getElementById('calendar-event-modal');
            modal?.classList.add('hidden');
        });

        return () => {
            calendar.destroy();
        };
    }, []);

    return (
        <div>
            <div className="card flex not-prose p-4 w-full">
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
            <div id="calendar-event-modal" className="overlay modal overlay-open:opacity-100 hidden" role="dialog" tabIndex={-1}>
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
                        <form id="eventForm">
                            <div className="modal-body pt-0">
                                <label className="form-control mb-4">
                                    <div className="label">
                                        <span className="label-text">Add event title below</span>
                                    </div>
                                    <input type="text" id="eventTitle" className="input" placeholder="Event title" required />
                                </label>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-soft btn-secondary" data-overlay="#calendar-event-modal">
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
    );
};

export default CalendarApp;
