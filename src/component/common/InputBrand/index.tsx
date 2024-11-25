import {Input, InputProps} from "antd";
import React from "react";
import "./index.scss";

interface Props extends InputProps {}

const InputBrand = (props: Props) => {
    return (
        <div className={`InputBrand ${props.className}`}>
            <Input {...{...props, className: ""}} />
        </div>
    );
};

export default InputBrand;