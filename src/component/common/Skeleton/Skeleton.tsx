import React from "react";
import {Skeleton as AntSkeleton} from "antd";

import "./Skeleton.scss";

interface ISkeletonProps extends Record<string, any> {
    variant: "paragraph" | "button" | "avatar" | "input" | "image" | "node";
}

const Skeleton: React.FC<ISkeletonProps> = ({variant, ...props}) => {
    switch (variant) {
        case "paragraph":
            return (
                <AntSkeleton
                    className="Skeleton Skeleton__paragraph"
                    active
                    {...props}
                />
            );
        case "button":
            return (
                <AntSkeleton.Button
                    className="Skeleton Skeleton__button"
                    active
                    {...props}
                />
            );
        case "avatar":
            return (
                <AntSkeleton.Avatar
                    className="Skeleton Skeleton__avatar"
                    active
                    {...props}
                />
            );
        case "input":
            return (
                <AntSkeleton.Input
                    className="Skeleton Skeleton__input"
                    active
                    {...props}
                />
            );
        case "image":
            return (
                <AntSkeleton.Image
                    className="Skeleton Skeleton__image"
                    active
                    {...props}
                />
            );
        case "node":
            return (
                <AntSkeleton.Node
                    className="Skeleton Skeleton__node"
                    active
                    {...props}
                />
            );
        default:
            return null;
    }
};

export default Skeleton;