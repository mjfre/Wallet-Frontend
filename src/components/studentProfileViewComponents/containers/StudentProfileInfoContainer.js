import React from 'react';

const containerStyle = {
width: '100%',
margin: '0 auto',
textAlign:'center',
padding:'1em',
background:'#f7f7f7',
overflow: 'hidden',
border: '.5em black',
}

export const StudentProfileInfoContainer = props => (
    <div style={containerStyle}>
        {props.children}
    </div>
);

export default StudentProfileInfoContainer;
