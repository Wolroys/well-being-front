import React from "react";
import ClockIcon from "../../icons/ClockIcon";
import './index.scss';

interface Props {
    title: string;
    time: string;
    onClick?: () => void;
}

const BadgetBrand = (props: Props) => {
    const {time, onClick, title} = props;
    return (
        <div onClick={onClick} className={`BadgetBrand ${onClick ? 'BadgetBrand_hover' : ''}`}>
            <div className="BadgetBrand__title">{title}</div>
            <div className="BadgetBrand__time">
                <ClockIcon />
                <div className="BadgetBrand__time-text">{time}</div>
            </div>
        </div>
    );
};

export default BadgetBrand;