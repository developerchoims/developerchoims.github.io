import React, { useState } from 'react';
import './Reply.css';

const Reply = () => {
    const [isFilled, setIsFilled] = useState(false);

    const handleReplyClick = () => {
        setIsFilled(!isFilled);
    };

    return (
        <i className={isFilled ? 'bi bi-chat-square-text-fill' : 'bi bi-chat-square-text'} onClick={handleReplyClick}/>
    );
};

export default Reply;