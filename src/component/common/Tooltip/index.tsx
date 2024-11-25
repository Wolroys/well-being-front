import React from "react";
import {Tooltip as AntTooltip, TooltipProps} from "antd";

import "./Tooltip.scss";

interface ITooltipProps {
    show?: boolean;
}

const Tooltip: React.FC<TooltipProps & ITooltipProps> = ({
                                                             title,
                                                             children,
                                                             show,
                                                             ...other
                                                         }) => {
    return (
        <>
            {show ? (
                <AntTooltip
                    overlayClassName="Tooltip"
                    title={title}
                    mouseEnterDelay={0.00001}
                    mouseLeaveDelay={0.00001}
                    placement="topLeft"
                    {...other}>
                    {children}
                </AntTooltip>
            ) : (
                <>{children}</>
            )}
        </>
    );
};

export default Tooltip;