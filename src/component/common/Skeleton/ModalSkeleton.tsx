import React from "react";
import ContentLoader from "react-content-loader";

const ModalSkeleton: React.FC<any> = props => {
    return (
        <ContentLoader viewBox="0 0 500 280" width="100%">
            <rect x="0" y="3" rx="10" ry="10" width="100%" height="180" />
            <rect x="0" y="190" rx="10" ry="10" width="100%" height="20" />
            <rect x="0" y="215" rx="10" ry="10" width="239" height="20" />
            <rect x="0" y="242" rx="10" ry="10" width="274" height="20" />
        </ContentLoader>
    );
};

export default ModalSkeleton;