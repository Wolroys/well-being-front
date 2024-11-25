import React from "react";

interface IInputSearchIconProps {
    fill: string;
}

const InputSearchIcon: React.FC<IInputSearchIconProps> = ({fill}) => {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_5601_7404)">
                <circle
                    cx="7.03125"
                    cy="7.03125"
                    r="4.78125"
                    stroke={fill}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
                <path
                    d="M10.75 10.7501L15 15.0001"
                    stroke={fill}
                    strokeWidth="1.5"
                    strokeLinecap="round"
                />
            </g>
            <defs>
                <clipPath id="clip0_5601_7404">
                    <rect width="18" height="18" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default InputSearchIcon;