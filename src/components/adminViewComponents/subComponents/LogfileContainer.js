import React from 'react';

const containerStyle = {

    width: '100%',
    margin: '0 auto',
    textAlign:'left',
    padding:'1em',
    background:'#fafafa',
    overflow: 'hidden',
    border: '.5em black',
    height: '70vh',
    overflowY: 'auto'
}


const headerStyle = {

    width: '100%',
    margin: '0 auto',
    textAlign:'center',
    padding:'1em',
    background:'#fafafa',
    boxShadow: '10px 10px 2em #888888',
    overflow: 'hidden',
    border: '.5em black',
    marginTop : '2.5em',

}


//more similar to table container:



export const LogfileContainer = props => (
    <div style={{boxShadow: '10px 10px 2em #888888'}}>
    <div style={headerStyle}>
        <p>Log File</p>
    </div>
    <div style={containerStyle}>
        {props.children}
    </div>
    </div>
);

export default LogfileContainer