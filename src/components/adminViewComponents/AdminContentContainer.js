import React from 'react';
import './subComponents/css/AdminContentContainer.css';

export const ContentContainer = props => (
    <div className="adminContentContainerStyle">
        {props.children}
    </div>
);

export default ContentContainer;