import React, {useState} from "react";
import "./index.scss";
import {DatePicker} from "antd";
import {ItemType} from "antd/lib/menu/hooks/useItems";
import moment, {Moment} from "moment-timezone";
import Dropdown from "../common/Dropdown";
import {CalendarEventDateType} from "../../model/ICalendar";

interface Props {
    value: Date;
    from?: Date;
    onTimeChange: (date: Moment) => void;
    onDateChange: (date: Moment | null) => void;
}

const TimeDatePicker = (props: Props) => {
    const {onDateChange, from, onTimeChange, value} = props;

    function generateTimeObjects() {
        const timeObjects: ItemType[] = [];
        let time = new Date(value);
        time.setHours(12, 0, 0, 0);

        for (let i = 96; i > 0; i--) {
            const formattedTime = moment(time);

            const isLate =
                formattedTime.toDate().getTime() <= moment(from).toDate().getTime();

            if (!from || !isLate) {
                timeObjects.push({
                    key: i,
                    onTitleClick: () => {
                        onTimeChange(formattedTime);
                        setTimeDropdownOpen(false);
                    },
                    label: (
                        <div className="text-sm lowercase">
                            {formattedTime.format("HH:mm")}
                        </div>
                    ),
                    children: [],
                });
            }

            time.setMinutes(time.getMinutes() + 15);
            time.setDate(moment(value).toDate().getDate());
        }

        return timeObjects;
    }

    const [timeDropdownOpen, setTimeDropdownOpen] = useState(false);

    return (
        <div className="TimeDatePicker">
            <Dropdown
                open={timeDropdownOpen}
                onOpenChange={isOpen => setTimeDropdownOpen(isOpen)}
                trigger={["click"]}
                items={generateTimeObjects()}
                className="TimeDatePicker__time text-sm">
                <div>{moment(value).format("HH:mm")}</div>
            </Dropdown>
            <DatePicker
                disabledDate={current =>
                    current && from
                        ? new Date(current.toDate()).setHours(12, 0, 0, 0).valueOf() <
                        new Date(from).setHours(12, 0, 0, 0).valueOf()
                        : false
                }
                suffixIcon={null}
                value={moment(value)}
                className="TimeDatePicker__date"
                onChange={date => onDateChange(date)}
            />
        </div>
    );
};

export default TimeDatePicker;