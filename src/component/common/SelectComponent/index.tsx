import React from "react";

import {Select, SelectProps} from "antd";

import "./SelectComponent.scss";
import ArrowIcon from "../../icons/ArrowIcon";
import {COLOR_TEXT} from "../../../constants";
import NoData from "../NoData";
import Skeleton from "../Skeleton/Skeleton";

interface ISelectComponentProps extends SelectProps<any, any> {
    className?: string;
    isLoading?: boolean;
    children?: React.ReactNode;
}

const SelectComponent: React.FC<ISelectComponentProps> = ({
                                                              children,
                                                              className,
                                                              isLoading,
                                                              ...other
                                                          }: ISelectComponentProps) => {
    const classes = ["SelectComponent"];
    className && classes.push(className);

    if (isLoading) {
        return <Skeleton variant="input" />;
    }

    return (
        <Select
            data-testid="SelectComponent"
            className={classes.join(" ")}
            suffixIcon={<ArrowIcon fill={COLOR_TEXT} />}
            showArrow={true}
            notFoundContent={<NoData />}
            {...other}>
            {children}
        </Select>
    );
};

export default SelectComponent;