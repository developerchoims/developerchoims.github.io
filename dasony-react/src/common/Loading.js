import React from 'react';
import {ColorRing} from "react-loader-spinner";

// 지현 추가 (색상 변경 고민ing)
const Loading = () => {
    return(
        <ColorRing
            visible={true}
            height="80"
            width="80"
            ariaLabel="blocks-loading"
            wrapperStyle={{"position": "fixed", "top" : "45%", "left": "50%"}}
            wrapperClass="blocks-wrapper"
            colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
        />
    );
};

export default Loading;