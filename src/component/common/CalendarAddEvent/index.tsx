import React, {useEffect, useState} from "react";
import "./index.scss";
import {Modal} from "antd";
import DropdownButton from "../DropdownButton";
import TimeDatePicker from "../../TimeDatePicker";
import InputBrand from "../InputBrand";
import TagList from "../../TagList";
import AddIcon from "../../icons/AddIcon";
import useCalendar from "../../../hooks/useCalendar";
import {t} from "i18next";
import moment from "moment-timezone";
import {ItemType} from "antd/lib/menu/hooks/useItems";
import {CalendarEventDateType, ColorItemData} from "../../../model/ICalendar";
import {IUser} from "../../../model/IUser";
import UserListModal from "../UserListModal";
import {useSelector} from "react-redux";
import ButtonSimple from "../ButtonSimple";
import Button from "../Button/Button";
import CircleClose from "../../icons/CircleClose";
import ColoredBtnPicker, {ColoredBtnData} from "../ColoredBtnPicker";
import {getTypeOfControlColored} from "../../../utils/TypeOfControl";
import {calendarAPI, EventType} from "../../../api/calendar";
import {useParams} from "react-router-dom";
import {customMessageError} from "../../../utils/CustomMessage";
import DropdownAdvanced from "../DropdownAdvanced";
import CloseIcon from "../../icons/CloseIcon";

interface Props {
    visible: boolean;
    setVisible: React.Dispatch<React.SetStateAction<boolean>>;
}

type NotificationDataType = {
    id: number;
    inputValue: string;
    timeType: "m" | "h" | "d" | "w";
    method: "app" | "email";
};

const CalendarAddEvent = (props: Props) => {
    const {setVisible, visible} = props;
    const [typeOfWorkVisible, setTypeOfWorkVisible] = useState(false);
    const [notificationsList, setNotificationsList] = useState<
        NotificationDataType[]
    >([
        {
            id: 1,
            inputValue: "1",
            method: "email",
            timeType: "h",
        },
    ]);

    const params = useParams();

    const [createEvent, createEventResult] = calendarAPI.useCreateEventMutation();

    const onSubmit = () => {
        const result: EventType = {
            title: eventName,
            address: place,
            description,
            endDate: moment
                .tz(`${eventDate?.dateTo}+00:00`, account?.data?.timezone)
                .toISOString(),
            startDate: moment
                .tz(`${eventDate?.dateFrom}+00:00`, account?.data?.timezone)
                .toISOString(),
            memberIds: participantsList.map(item => item.id),
            projectId: Number(params["projectID"]),
            typeOfWorkId: selectedTypeOfWork?.id ?? 1,
        };

        createEvent({
            data: result,
        }).then((resp: any) => {
            if (resp?.error) {
                customMessageError({
                    content: resp?.error?.data?.violation?.error,
                    duration: 5,
                });
            } else {
                setVisible(false);
                resetStates();
            }
        });
    };

    const CalendarAddEventFooter = () => {
        return (
            <div className="CalendarAddEvent__footer">
                <ButtonSimple onClick={() => setVisible(false)}>{`${t(
                    "for_all.cancel",
                )}`}</ButtonSimple>
                <Button onClick={onSubmit}>{`${t("for_all.create")}`}</Button>
            </div>
        );
    };

    const editNotificationsList = (
        notificationId: number,
        fieldToEdit: keyof NotificationDataType extends "id"
            ? never
            : keyof NotificationDataType,
        value: string,
    ) => {
        const newList = notificationsList.map(item => {
            if (item.id === notificationId) {
                return {
                    ...item,
                    [fieldToEdit]: value,
                };
            }
            return item;
        });

        setNotificationsList(newList);
    };

    const getMenuItemsA = (notificationId: number): ItemType[] => {
        return [
            {
                key: "minA",
                onTitleClick: () => {
                    editNotificationsList(notificationId, "timeType", "m");
                },
                label: (
                    <div className="text-sm lowercase">
                        {`${t("calendar.time_minute")}`}
                    </div>
                ),
                children: [],
            },
            {
                key: "hourA",
                onTitleClick: () => {
                    editNotificationsList(notificationId, "timeType", "h");
                },
                label: (
                    <div className="text-sm lowercase">
                        {`${t("calendar.time_hour")}`}
                    </div>
                ),
                children: [],
            },
            {
                key: "dayA",
                onTitleClick: () => {
                    editNotificationsList(notificationId, "timeType", "d");
                },
                label: (
                    <div className="text-sm lowercase">{`${t("schedule.date_day")}`}</div>
                ),
                children: [],
            },
            {
                key: "weekA",
                onTitleClick: () => {
                    editNotificationsList(notificationId, "timeType", "w");
                },
                label: (
                    <div className="text-sm lowercase">
                        {`${t("schedule.date_week")}`}
                    </div>
                ),
                children: [],
            },
        ];
    };

    const getMenuItemsB = (notificationId: number): ItemType[] => {
        return [
            {
                key: "appB",
                onTitleClick: () => {
                    editNotificationsList(notificationId, "method", "email");
                },
                label: (
                    <div className="text-sm lowercase">
                        {`${t("notifications.method_email")}`}
                    </div>
                ),

                children: [],
            },
            {
                key: "emailB",
                onTitleClick: () => {
                    editNotificationsList(notificationId, "method", "app");
                },
                label: (
                    <div className="text-sm lowercase">
                        {`${t("notifications.method_app")}`}
                    </div>
                ),
                children: [],
            },
        ];
    };

    const getNotificationTypeByKey = (key: "app" | "email") => {
        switch (key) {
            case "app":
                return t("notifications.method_app");
            case "email":
                return t("notifications.method_email");

            default:
                return "";
        }
    };

    const {getTimeTypeByKey, selectedDate} = useCalendar();

    const addNotification = () => {
        const newList = [...notificationsList];
        newList.push({
            id: new Date().getTime(),
            inputValue: "1",
            method: "email",
            timeType: "h",
        });
        setNotificationsList(newList);
    };

    const deleteNotification = (notificationId: number) => {
        const newList = notificationsList.filter(
            item => item.id !== notificationId,
        );
        setNotificationsList(newList);
    };

    const [eventDate, setEventDate] = useState<CalendarEventDateType>({
        dateFrom: moment(selectedDate).set("h", 12).set("m", 0).toDate(),
        dateTo: moment(selectedDate).add(1, "d").set("h", 13).set("m", 0).toDate(),
    });

    const [selectedTypeOfControl, setSelectedTypeOfControl] =
        useState<ColoredBtnData | null>(null);

    useEffect(() => {
        setEventDate({
            dateFrom: moment(selectedDate).set("h", 12).set("m", 0).toDate(),
            dateTo: moment(selectedDate)
                .add(1, "d")
                .set("h", 13)
                .set("m", 0)
                .toDate(),
        });
    }, [selectedDate]);

    const account = useSelector((state: any) => state.account);

    // Запрос на виды работ
    const {
        data: typeOfWorkData,
        refetch: typeOfWorkRefetch,
        isFetching: isFetchingTypeOfWork,
    } = typeOfWorkAPI.useGetAllTypeOfWorksQuery({
        contextOrganizationId: account?.data?.organizationId,
        page: 0,
        size: 999,
    });

    const [typesOfWorkItems, setTypesOfWorkItems] = useState<ItemType[]>([]);
    const [selectedTypeOfWork, setSelectedTypeOfWork] =
        useState<ITypeOfWork | null>(null);

    const resetStates = () => {
        setEventDate({
            dateFrom: moment(selectedDate).set("h", 12).set("m", 0).toDate(),
            dateTo: moment(selectedDate)
                .add(1, "d")
                .set("h", 13)
                .set("m", 0)
                .toDate(),
        });

        setParticipantsList([
            // account?.data
        ]);

        setSelectedTypeOfControl(null);

        setEventName("");
        setDescription("");
        setPlace("");
        setSelectedTypeOfWork(null);
    };

    const updateTypesOfWork = (): ItemType[] => {
        return (
            typeOfWorkData?.domain?.map(item => {
                return {
                    key: item.id,
                    onTitleClick: () => {
                        setSelectedTypeOfWork(item);
                        setTypeOfWorkVisible(false);
                    },
                    label: <div className="text-sm lowercase">{item.name}</div>,
                    children: [],
                };
            }) ?? []
        );
    };

    useEffect(() => {
        const newTypeOfWorkItems = updateTypesOfWork();
        setTypesOfWorkItems(newTypeOfWorkItems);
    }, [typeOfWorkData]);

    const editEventDate = (key: keyof CalendarEventDateType, value: Date) => {
        let newEventDate = {
            ...eventDate,
        };
        newEventDate[key] = value;
        setEventDate(newEventDate);
    };

    useEffect(() => {
        const nextDate = moment(eventDate.dateFrom).add(15, "minutes");
        if (eventDate?.dateFrom?.getTime() > eventDate?.dateTo?.getTime()) {
            setEventDate((prev: any) => {
                return {
                    ...eventDate,
                    dateTo: nextDate.toDate(),
                };
            });
        }
    }, [eventDate]);

    const [participantsList, setParticipantsList] = useState<IUser[]>([]);

    useEffect(() => {
        if (account?.data) {
            setParticipantsList([...participantsList,
                // account?.data
            ]);
        }
    }, [account]);

    const deleteParticipant = (userId: number) => {
        const newList = participantsList.filter(item => item.id !== userId);
        setParticipantsList(newList);
    };

    const [participantsModal, setParticipantsModal] = useState(false);

    const [eventColorList, setEventColorList] = useState<ColorItemData[]>([
        {color: "#2EC09D", id: "green"},
        {color: "#AC2EC0", id: "purple"},
    ]);
    const [eventColor, setEventColor] = useState<ColorItemData>(
        eventColorList[0],
    );

    const addParticipantToList = (newParticipant: IUser) => {
        const isIncludes = participantsList.find(
            item => item.id === newParticipant.id,
        );
        const newParticipantList = isIncludes
            ? participantsList
            : [...participantsList, newParticipant];
        setParticipantsList(newParticipantList);
    };

    const onSubmitParticipantModal = (newParticipant: IUser) => {
        if(newParticipant?.id !== account?.data?.id) {
            addParticipantToList(newParticipant);
        }
    };

    const [description, setDescription] = useState("");
    const [eventName, setEventName] = useState("");
    const [place, setPlace] = useState("");

    return (
        <Modal
            footer={<CalendarAddEventFooter />}
            className="CalendarAddEvent"
            onCancel={() => {
                setVisible(false);
                resetStates();
            }}
            open={visible}>
            <div className="CalendarAddEvent__wrapper">
                <div className="CalendarAddEvent__row align-center">
                    <div className="text-sm CalendarAddEvent__label">{`${t(
                        "tasks.name",
                    )}`}</div>
                    <InputBrand
                        value={eventName}
                        onChange={e => setEventName(e.target.value)}
                        size="large"
                    />
                </div>
                <div className="CalendarAddEvent__row align-center">
                    <div className="text-sm CalendarAddEvent__label">{`${t(
                        "remarks.type_of_work",
                    )}`}</div>
                    <DropdownButton
                        items={typesOfWorkItems}
                        className="CalendarAddEvent__dropdown"
                        text={`${
                            selectedTypeOfWork ? selectedTypeOfWork.name : t("remarks.select")
                        }`}
                        trigger={["click"]}
                        visible={typeOfWorkVisible}
                        onVisible={visible => setTypeOfWorkVisible(visible)}
                    />
                </div>

                <div className="CalendarAddEvent__row align-center">
                    <div className="text-sm CalendarAddEvent__label">{`${t(
                        "calendar.date_and_time",
                    )}`}</div>
                    <div className="CalendarAddEvent__timedate">
                        <TimeDatePicker
                            onTimeChange={date => editEventDate("dateFrom", date.toDate())}
                            value={eventDate?.dateFrom ?? new Date()}
                            onDateChange={date =>
                                date && editEventDate("dateFrom", date.toDate())
                            }
                        />
                        <span>-</span>
                        <TimeDatePicker
                            from={eventDate?.dateFrom}
                            onTimeChange={date => editEventDate("dateTo", date.toDate())}
                            value={eventDate?.dateTo ?? new Date()}
                            onDateChange={date =>
                                date && editEventDate("dateTo", date.toDate())
                            }
                        />
                    </div>
                </div>

                <div className="CalendarAddEvent__row align-center">
                    <div className="text-sm CalendarAddEvent__label">{`${t(
                        "table.description",
                    )}`}</div>
                    <InputBrand
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                        size="large"
                    />
                </div>

                <div className="CalendarAddEvent__row align-center">
                    <div className="text-sm CalendarAddEvent__label">{`${t(
                        "calendar.place",
                    )}`}</div>
                    <InputBrand
                        value={place}
                        onChange={e => setPlace(e.target.value)}
                        size="large"
                    />
                </div>

                <div className="CalendarAddEvent__row align-center">
                    <div className="text-sm CalendarAddEvent__label">{`${t(
                        "calendar.participants",
                    )}`}</div>
                    <TagList
                        addTagIcon={<AddIcon fill="#172B4D" />}
                        onAddTag={() => setParticipantsModal(true)}
                        data={participantsList.map(item => {
                            return {
                                text: `${item.name} ${item.lastName}`,
                                onItemIcon: () => deleteParticipant(item.id),
                                icon: <CircleClose />,
                                disabled: item?.id === account?.data?.id,
                            };
                        })}
                    />
                </div>

                <div className="CalendarAddEvent__row align-center">
                    <div className="text-sm CalendarAddEvent__label">{`${t(
                        "remarks.type_of_control",
                    )}`}</div>
                    <ColoredBtnPicker
                        onChange={data => setSelectedTypeOfControl(data)}
                        active={selectedTypeOfControl}
                        data={Object.values(getTypeOfControlColored())}
                    />
                </div>

                {/* <div className="CalendarAddEvent__row align-center">
          <div className="text-sm CalendarAddEvent__label">{`${t(
            "calendar.event_color",
          )}`}</div>
          <ColorList
            selectedColorId={eventColor.id}
            data={eventColorList}
            onColorClick={colorItem => setEventColor(colorItem)}
          />
        </div> */}

                <div className="CalendarAddEvent__row">
                    <div className="text-sm CalendarAddEvent__label">{`${t(
                        "notifications.notifications",
                    )}`}</div>
                    <div className="CalendarAddEvent__col CalendarAddEvent__notifications">
                        {notificationsList.map(item => {
                            return (
                                <DropdownAdvanced
                                    menuItemsA={getMenuItemsA(item.id)}
                                    menuItemsB={getMenuItemsB(item.id)}
                                    menuValueA={getTimeTypeByKey(item.timeType)}
                                    menuValueB={getNotificationTypeByKey(item.method)}
                                    inputValue={item.inputValue}
                                    inputOnChange={val => {
                                        const newList = notificationsList.map(notify => {
                                            if (item.id === notify.id) {
                                                return {
                                                    ...item,
                                                    inputValue: val,
                                                };
                                            }
                                            return notify;
                                        });
                                        setNotificationsList(newList);
                                    }}
                                    label={`${t("calendar.in")}`}
                                    onPrefixIcon={() => deleteNotification(item.id)}
                                    prefixIcon={<CloseIcon fill="#172B4D" />}
                                />
                            );
                        })}
                        <button onClick={addNotification} className="CalendarAddEvent__add">
                            <div className="CalendarAddEvent__add-icon">
                                <AddIcon fill="#172B4D" />
                            </div>
                            <span className="text-sm">{`${t(
                                "calendar.add_more_notification",
                            )}`}</span>
                        </button>
                    </div>
                </div>
            </div>
            <UserListModal
                onSubmit={onSubmitParticipantModal}
                visible={participantsModal}
                setVisible={setParticipantsModal}
            />
        </Modal>
    );
};

export default CalendarAddEvent;