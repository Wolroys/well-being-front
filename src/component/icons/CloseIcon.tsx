import React from "react";

interface ICloseIcon {
    fill: string;
    width?: string;
    height?: string;
}

const CloseIcon: React.FC<ICloseIcon> = ({fill, width = '20', height = '20'}) => {
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_9233_4630)">
                <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M3.57733 3.57709C3.90277 3.25165 4.4304 3.25165 4.75584 3.57709L9.99992 8.82116L15.244 3.57709C15.5694 3.25165 16.0971 3.25165 16.4225 3.57709C16.7479 3.90252 16.7479 4.43016 16.4225 4.7556L11.1784 9.99967L16.4225 15.2438C16.7479 15.5692 16.7479 16.0968 16.4225 16.4223C16.0971 16.7477 15.5694 16.7477 15.244 16.4223L9.99992 11.1782L4.75584 16.4223C4.4304 16.7477 3.90277 16.7477 3.57733 16.4223C3.25189 16.0968 3.25189 15.5692 3.57733 15.2438L8.82141 9.99967L3.57733 4.7556C3.25189 4.43016 3.25189 3.90252 3.57733 3.57709Z"
                    fill={fill}
                />
            </g>
            <defs>
                <clipPath id="clip0_9233_4630">
                    <rect width="20" height="20" fill="white" />
                </clipPath>
            </defs>
        </svg>
    );
};

export default CloseIcon;