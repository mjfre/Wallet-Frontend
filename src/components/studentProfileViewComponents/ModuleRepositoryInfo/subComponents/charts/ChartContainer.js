import React from 'react';

const containerStyle = {
width: '90%',
margin: '2.5em auto',
textAlign:'center',
padding:'2.5em',
background:'#f7f7f7',
boxShadow: 'inset 5px 5px 1em #888888',
overflow: 'hidden',
border: '.5em black',
marginTop : '2.5em',
}

export const ChartContainer = props => (
    <div style={containerStyle}>
        {props.children}
    </div>
);

export default ChartContainer
