import React from "react";

import {Input as AntInput, InputRef} from "antd";
import "./Input.scss";
import Skeleton from "../common/Skeleton/Skeleton";

const Input = ({
                   mode = "primary",
                   extraClasses = "",
                   subComponent = null,
                   focus, // focus = true, автофокус
                   isLoading,
                   defaultValue,
                   onChange,
                   ...args
               }: any) => {
    const inputRef = React.useRef<InputRef>(null);

    // Стейт показывает введено ли что-нибудь в инпут или нет
    const [entered, setEntered] = React.useState(false);

    React.useEffect(() => {
        !isLoading &&
        focus &&
        inputRef.current!.focus({
            cursor: "end",
        });
    }, [isLoading, focus]);

    if (isLoading) {
        return <Skeleton variant="input" />;
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        // Введенное значение
        const value = e.target.value;

        if (value) {
            setEntered(true);
        } else {
            setEntered(false);
        }

        if (onChange) {
            onChange(e);
        }
    };

    let Component = AntInput;

    if (subComponent) {
        // @ts-ignore
        Component = AntInput[subComponent];
    }

    return (
        <Component
            {...args}
            defaultValue={defaultValue}
            onChange={handleInputChange}
            ref={inputRef}
            className={`${mode}${"Input"} ${extraClasses} ${
                entered ? "entered" : "not-entered"
            }`}
        />
    );
};

export default Input;