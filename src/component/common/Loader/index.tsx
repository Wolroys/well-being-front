import React from "react";
import LoaderIMG from "../../../assets/LoaderIMG.png";

import "./Loader.scss";

interface ILoaderProps {
    width: string;
    height: string;
}

const Loader: React.FC<ILoaderProps> = ({width, height}) => {
    return (
        <img className="Loader" width={width} height={height} src={LoaderIMG} />
    );
};

export default Loader;