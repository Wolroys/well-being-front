import React from "react";

interface Props extends React.ComponentProps<"svg"> {
    fill?: string;
}

const ClockIcon = (props: Props) => {
    const {fill = "#172B4D", width = "14", height = "14"} = props;
    return (
        <svg
            width={width}
            height={height}
            viewBox="0 0 14 14"
            fill="none"
            xmlns="http://www.w3.org/2000/svg">
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.00008 2.33366C4.42275 2.33366 2.33341 4.423 2.33341 7.00033C2.33341 9.57765 4.42275 11.667 7.00008 11.667C9.57741 11.667 11.6667 9.57765 11.6667 7.00033C11.6667 4.423 9.57741 2.33366 7.00008 2.33366ZM1.16675 7.00033C1.16675 3.77866 3.77842 1.16699 7.00008 1.16699C10.2217 1.16699 12.8334 3.77866 12.8334 7.00033C12.8334 10.222 10.2217 12.8337 7.00008 12.8337C3.77842 12.8337 1.16675 10.222 1.16675 7.00033Z"
                fill={fill}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.41675 7C6.41675 6.67783 6.67792 6.41667 7.00008 6.41667H9.33342C9.65558 6.41667 9.91675 6.67783 9.91675 7C9.91675 7.32217 9.65558 7.58333 9.33342 7.58333H7.00008C6.67792 7.58333 6.41675 7.32217 6.41675 7Z"
                fill={fill}
            />
            <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M7.00008 7.58333C6.67792 7.58333 6.41675 7.32217 6.41675 7V4.08333C6.41675 3.76117 6.67792 3.5 7.00008 3.5C7.32225 3.5 7.58341 3.76117 7.58341 4.08333V7C7.58341 7.32217 7.32225 7.58333 7.00008 7.58333Z"
                fill={fill}
            />
        </svg>
    );
};

export default ClockIcon;