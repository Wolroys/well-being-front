import React, {ReactNode, useState} from "react";
import "./index.scss";
import CloseIcon from "../icons/CloseIcon";
import AddIcon from "../icons/AddIcon";
import CircleClose from "../icons/CircleClose";

interface Props {
    data: TagListItemData[];
    addTagIcon?: ReactNode;
    onAddTag?: () => void;
}

interface BadgeProps {
    className: string;
}

interface TagListItemData {
    text: string;
    icon: ReactNode;
    onItemIcon?: () => void;
    disabled?: boolean;
}

const TagListBadge = (props: BadgeProps & TagListItemData) => {
    const {className, disabled, icon, onItemIcon, text} = props;
    return (
        <div className={`TagListBadge ${className}`}>
            <div className="TagListBadge__text text-sm">{text}</div>
            <button disabled={disabled || !onItemIcon} className="TagListBadge__btn" onClick={onItemIcon}>
                {/* <CircleClose /> */}
                {icon}
            </button>
        </div>
    );
};

const TagList = (props: Props) => {
    const {data, addTagIcon, onAddTag} = props;
    return (
        <div className="TagList">
            {addTagIcon && (
                <button onClick={onAddTag} className="TagList__btn">
                    {/* <AddIcon fill="#172B4D" /> */}
                    {addTagIcon}
                </button>
            )}
            {data.map(item => {
                return (
                    <TagListBadge
                        {...item}
                        className="TagList__item"
                    />
                );
            })}
        </div>
    );
};

export default TagList;