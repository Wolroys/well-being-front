import React from "react";

interface IDragAndDropIconProps {
    fill: string;
}

const DragAndDropIcon: React.FC<IDragAndDropIconProps> = ({fill}) => {
    return (
        <svg
            width="18"
            height="18"
            viewBox="0 0 18 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_7711_11723)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3 7.125C3 6.71079 3.33579 6.375 3.75 6.375H14.25C14.6642 6.375 15 6.71079 15 7.125C15 7.53921 14.6642 7.875 14.25 7.875H3.75C3.33579 7.875 3 7.53921 3 7.125ZM3 10.875C3 10.4608 3.33579 10.125 3.75 10.125H14.25C14.6642 10.125 15 10.4608 15 10.875C15 11.2892 14.6642 11.625 14.25 11.625H3.75C3.33579 11.625 3 11.2892 3 10.875Z"
                    fill={fill}
                    fillOpacity="0.6"
                />
            </g>
            <defs>
                <clipPath id="clip0_7711_11723">
                    <rect width="18" height="18" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default DragAndDropIcon;