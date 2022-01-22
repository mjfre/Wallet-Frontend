

import React from 'react';

const containerStyle = {
    width: '95%',
    margin: '0 auto',
    textAlign: 'left',
    padding: '1em',
    background: '#f0f6fc',
    overflow: 'hidden',
    border: '3px solid #c9c9c9',
    borderTop: '0',
    borderRadius: '0 0 10px 10px',
    boxShadow: '10px 10px 2em #888888'
}

export const SwaggerContainer = props => (
    <div>
        <div style={containerStyle}>
            {props.children}
        </div>
    </div>
);

export default SwaggerContainer;