import React from "react";

import "./DropdownButton.scss";
import ArrowIcon from "../../icons/ArrowIcon";
import {COLOR_TEXT} from "../../../constants";
import Dropdown from "../Dropdown";
import {ItemType} from "antd/lib/menu/hooks/useItems";
import {Skeleton} from "antd";

interface IDropdownButtonProps {
    text: string;
    visible: boolean;
    onVisible: (open: boolean) => void;
    items: ItemType[] | undefined;
    icon?: React.ReactElement;
    placement?:
        | "bottomLeft"
        | "topLeft"
        | "topCenter"
        | "topRight"
        | "bottomCenter"
        | "bottomRight"
        | "top"
        | "bottom"
        | undefined;
    trigger: ("contextMenu" | "click" | "hover")[];
    className?: string;
    containerClassName?: string;
    style?: any;
    loading?: boolean;
    disabled?: boolean;
}

const DropdownButton: React.FC<IDropdownButtonProps> = ({
                                                            text,
                                                            visible,
                                                            onVisible,
                                                            style,
                                                            items,
                                                            icon,
                                                            disabled,
                                                            loading,
                                                            placement,
                                                            containerClassName,
                                                            trigger,
                                                            className,
                                                        }) => {
    return loading ? (
        <Skeleton.Input style={{width: "200px", borderRadius: 10}} active />
    ) : (
        <Dropdown
            open={visible}
            onOpenChange={onVisible}
            disabled={disabled}
            items={items}
            placement={placement}
            containerClassName={containerClassName}
            className={className}
            overlayStyle={style}
            trigger={trigger}>
            <div className="DropdownButton">
        <span className="DropdownButton__text">
          {icon}
            <div>{text}</div>
        </span>
                <span className={`DropdownButton__arrowIcon ${visible ? "open" : ""}`}>
          <ArrowIcon fill={COLOR_TEXT} />
        </span>
            </div>
        </Dropdown>
    );
};

export default DropdownButton;