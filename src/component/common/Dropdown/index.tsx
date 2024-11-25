import React from "react";
import type {DropdownProps, MenuProps} from "antd";
import {Dropdown as AntDropdown} from "antd";

import "./Dropdown.scss";

interface IDropdown extends DropdownProps {
    items?: MenuProps["items"];
    trigger: ("contextMenu" | "click" | "hover")[];
    className?: string;
    containerClassName?: string;
    placement?:
        | "top"
        | "bottom"
        | "topLeft"
        | "topRight"
        | "bottomLeft"
        | "bottomRight"
        | "topCenter"
        | "bottomCenter"
        | undefined;
}

const Dropdown: React.FC<React.PropsWithChildren<IDropdown>> = ({
                                                                    items,
                                                                    trigger,
                                                                    children,
                                                                    className,
                                                                    containerClassName,
                                                                    placement,
                                                                    ...other
                                                                }) => {
    const defaultPlacement = placement ? placement : "bottomLeft";

    return (
        <AntDropdown
            className={containerClassName}
            menu={{items}}
            trigger={trigger}
            overlayClassName={`Dropdown ${className}`}
            placement={defaultPlacement}
            {...other}>
            {children}
        </AntDropdown>
    );
};

export default Dropdown;