import React, { MouseEvent } from "react";

import "./CheckboxComponent.scss";
import CloseIcon from "../../icons/CloseIcon";
import {COLOR_QUATERNARY, COLOR_RED_ACTIVE} from "../../../constants";

type ModeCheckbox = "round" | "square" | "error";

interface ICheckboxComponent {
    defaultChecked: boolean | undefined;
    onChange?: (checked: boolean) => void;
    className?: string;
    mode: ModeCheckbox;
    disabled?: boolean;
}

const CheckboxComponent: React.FC<ICheckboxComponent> = ({
                                                             defaultChecked,
                                                             onChange,
                                                             className,
                                                             mode,
                                                             disabled = false,
                                                         }) => {
    const [checked, setChecked] = React.useState(defaultChecked || false);

    React.useEffect(() => {
        setChecked(defaultChecked || false);
    }, [defaultChecked]);

    const handleChange = (e:MouseEvent) => {
        if (onChange) {
            const newChecked = !checked;
            setChecked(newChecked);
            onChange(newChecked);
            e.stopPropagation()
        }
    };

    const classes = ["CheckboxComponent"];
    className && classes.push(className);

    const getCheckbox = (mode: ModeCheckbox) => {
        switch (mode) {
            case "round":
                return (
                    <div className={classes.join(" ")}>
                        <div
                            className="CheckboxComponent__round"
                            id="CheckboxComponent"
                            onClick={!disabled ? handleChange : undefined}
                            style={
                                disabled
                                    ? {cursor: "not-allowed", borderColor: COLOR_QUATERNARY}
                                    : undefined
                            }>
                            <div
                                className="CheckboxComponent__round-check"
                                id="CheckboxComponent-check"
                                style={checked ? {opacity: 1} : {opacity: 0}}></div>
                        </div>
                    </div>
                );
            case "square":
                return (
                    <div className={classes.join(" ")}>
                        <div
                            className="CheckboxComponent__square"
                            id="CheckboxComponent"
                            onClick={!disabled ? handleChange : undefined}
                            style={
                                disabled
                                    ? {cursor: "not-allowed", borderColor: COLOR_QUATERNARY}
                                    : undefined
                            }>
                            <div
                                className="CheckboxComponent__square-check"
                                id="CheckboxComponent-check"
                                style={checked ? {opacity: 1} : {opacity: 0}}></div>
                        </div>
                    </div>
                );
            case "error":
                return (
                    <div className={classes.join(" ")}>
                        <div
                            className="CheckboxComponent__square"
                            id="CheckboxComponent"
                            style={disabled ? {cursor: "not-allowed"} : undefined}>
                            <div
                                className="CheckboxComponent__square-error"
                                id="CheckboxComponent-check">
                                <CloseIcon fill={COLOR_RED_ACTIVE} width="15" height="15" />
                            </div>
                        </div>
                    </div>
                );
            default:
                return null;
        }
    };

    return <>{getCheckbox(mode)}</>;
};

export default CheckboxComponent;