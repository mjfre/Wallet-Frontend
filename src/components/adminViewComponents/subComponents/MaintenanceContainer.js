import React from 'react';

const containerStyle = {
    width: '95%',
    margin: '0 auto',
    textAlign: 'center',
    padding: '1em',
    background: '#f0f6fc',
    overflow: 'hidden',
    border: '3px solid #c9c9c9',
    borderTop: '0',
    borderRadius: '0 0 10px 10px',
    boxShadow: '10px 10px 2em #888888'
}

const titleStyle = {
    fontSize: '1.25em',
    width: '95%',
    margin: '0 auto',
    textAlign: 'left',
    padding: '.25em',
    paddingLeft: '1.5em',
    background: '#f0f6fc',
    overflow: 'hidden',
    border: '3px solid #c9c9c9',
    borderBottom: '0',
    borderRadius: '10px 10px 0 0',
    marginTop: 0,
    boxShadow: '10px 10px 2em #888888'
}

//more similar to table container:


export const MaintenanceContainer = props => (
    <div>
        <div style={titleStyle}>
            <h1 style={{color: '#373b61'}}>{props.title}</h1>
        </div>
        <div style={containerStyle}>
            {props.children}
        </div>
    </div>
);

export default MaintenanceContainer
