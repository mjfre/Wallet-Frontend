import React from 'react';

const containerStyle = {
width: '100%',
margin: '0 auto',
textAlign:'center',
padding:'0em',
background:'#dedede',
boxShadow: '10px 10px 2em #888888',
overflow: 'hidden',
border: '.5em black',
marginTop : '2.5em'
}

export const DatabaseTableContainer = props => (
    <div style={containerStyle}>
        {props.children}
    </div>
);

export default DatabaseTableContainer
