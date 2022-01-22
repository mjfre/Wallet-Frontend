import React from 'react';

const containerStyle = {
    width: '100%',
    margin: '0 auto',
    textAlign:'center',
    padding:'0em',
    overflow:'auto',
    display:'inline-block',
    border: '10em black',

}

export const StudentProfileDatabaseTableContainer = props => (
    <div style={containerStyle}>
        {props.children}
    </div>
);

export default StudentProfileDatabaseTableContainer
