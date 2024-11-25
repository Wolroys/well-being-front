import React from "react";
//@ts-ignore
import isEmpty from 'lodash.isempty';

import {Button as AntButton, ButtonProps} from "antd";
import "./Button.scss";
import Tooltip from "../Tooltip";

type TypeButtonMode =
    | "primary"
    | "secondary"
    | "iconPrimary"
    | "iconSecondary"
    | "clean"
    | "auth"
    | "icon";

type TypeButtonHeight = "big" | "small" | "medium";

type TypeButtonColor = "primary" | "red" | "green" | "blue" | "yellow" | "gray";

interface IButtonProps extends ButtonProps {
    mode?: TypeButtonMode | string;
    height?: TypeButtonHeight;
    color?: TypeButtonColor;
    extraClasses?: string;
    tooltip?: {
        hoverText: string;
        clickText?: string;
    };
    onClick?: any;
}

const Button: React.FC<IButtonProps> = ({
                                            mode = "primary",
                                            height = "big",
                                            color = "primary",
                                            extraClasses = "",
                                            tooltip,
                                            onClick,
                                            ...args
                                        }) => {
    const [tooltipText, setTooltipText] = React.useState<string>(
        tooltip?.hoverText || "",
    );

    const callbacks = {
        defineMode: () => {
            let result;
            switch (mode) {
                case "primary": {
                    result = "primaryButton";
                    break;
                }
                case "secondary": {
                    result = "secondaryButton";
                    break;
                }
                case "iconPrimary": {
                    result = "iconPrimaryButton";
                    break;
                }
                case "iconSecondary": {
                    result = "iconSecondaryButton";
                    break;
                }
                case "clean": {
                    result = "cleanButton";
                    break;
                }
                case "auth": {
                    result = "authButton";
                    break;
                }
                case "icon": {
                    result = "iconButton";
                    break;
                }
            }
            return result;
        },

        defineHeight: () => {
            let result;
            switch (height) {
                case "big": {
                    result = "big";
                    break;
                }
                case "small": {
                    result = "small";
                    break;
                }
                case "medium": {
                    result = "medium";
                    break;
                }
            }
            return result;
        },

        defineColor: () => {
            let result;
            switch (color) {
                case "primary": {
                    result = "colorPrimary";
                    break;
                }
                case "red": {
                    result = "colorRed";
                    break;
                }
                case "green": {
                    result = "colorGreen";
                    break;
                }
                case "blue": {
                    result = "colorBlue";
                    break;
                }
                case "yellow": {
                    result = "colorYellow";
                    break;
                }
                case "gray": {
                    result = "colorGray";
                    break;
                }
            }
            return result;
        },
    };

    return (
        <Tooltip title={tooltipText} show={!isEmpty(tooltip)} placement="bottomRight">
            <AntButton
                type="default"
                onClick={(e) => {
                    onClick && onClick(e);
                    if (tooltip?.clickText) {
                        setTooltipText(tooltip?.clickText);
                        setTimeout(() => {
                            setTooltipText(tooltip?.hoverText);
                        }, 1000);
                    }
                }}
                {...args}
                className={`${callbacks.defineMode()} ${callbacks.defineHeight()} ${callbacks.defineColor()} ${extraClasses}`}>
                {args.children}
            </AntButton>
        </Tooltip>
    );
};

export default Button;