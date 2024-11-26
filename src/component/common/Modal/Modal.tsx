import {useTranslation} from "react-i18next";
import React, {useState} from "react";
import {Modal as AntModal, ModalProps} from "antd";
import "./Modal.scss";
import ModalSkeleton from "../Skeleton/ModalSkeleton";

const basicModalConfig = {
    centered: true,
    footer: null,
    closable: false,
};

interface IModalProps extends ModalProps {
    mode?: "primary" | "secondary";
    className?: string;
    isLoading?: boolean;
    getContainer?: any;
}

export const Modal: React.FC<IModalProps> = ({
                                                 mode = "secondary",
                                                 isLoading = false,
                                                 className,
                                                 getContainer,
                                                 ...props
                                             }) => {
    const classes = [`${mode}Modal`];
    className && classes.push(className);

    return (
        <AntModal
            className={classes.join(" ")}
            getContainer={getContainer}
            {...basicModalConfig}
            {...props}>
            {isLoading ? <ModalSkeleton /> : props.children}
        </AntModal>
    );
};