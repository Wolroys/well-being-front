import React from "react";

interface IAddIconProps {
    fill: string;
}

const AddIcon: React.FC<IAddIconProps> = ({fill}) => {
    return (
        <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M10 2.50143C10.4602 2.50143 10.8333 2.87452 10.8333 3.33476L10.8333 9.16811L16.6667 9.16811C17.1269 9.16811 17.5 9.54121 17.5 10.0014C17.5 10.4617 17.1269 10.8348 16.6667 10.8348L10.8333 10.8348L10.8333 16.6681C10.8333 17.1284 10.4602 17.5015 10 17.5015C9.53976 17.5015 9.16667 17.1284 9.16667 16.6681L9.16667 10.8348L3.33332 10.8348C2.87308 10.8348 2.49998 10.4617 2.49998 10.0014C2.49998 9.54121 2.87308 9.16811 3.33332 9.16811L9.16667 9.16811L9.16667 3.33476C9.16667 2.87452 9.53976 2.50143 10 2.50143Z"
                fill={fill}
            />
        </svg>
    );
};

export default AddIcon;