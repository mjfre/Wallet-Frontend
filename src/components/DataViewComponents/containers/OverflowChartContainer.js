import React from 'react';

const containerStyle = {
    width: '90%',
    margin: '2.5em auto',
    textAlign: 'center',
    padding: '2.5em',
    paddingBottom: '.7em',
    background: '#f7f7f7',
    boxShadow: 'inset 5px 5px 1em #888888',
    border: '.5em black',
    marginTop: 0,
}

export const OverflowChartContainer = props => (
    <div style={containerStyle}>
        {props.children}
    </div>
);

export default OverflowChartContainer
