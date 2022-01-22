import React from 'react';

const containerStyle = {
width: '100%',
margin: '0 auto',
textAlign:'center',
padding:'0em',
background:'#fffef5',
boxShadow: '10px 10px 2em #888888',
overflow: 'hidden',
border: '.5em black',
marginTop : '2.5em',
paddingTop: '1em',
paddingBottom: '1em'

// backgroundImage: "url('https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Keyboard_cat.jpg/220px-Keyboard_cat.jpg')",
// backgroundColor: 'rgba(255, 255, 255, 0.4)',
// backgroundBlendMode: 'lighten'
//border: '10em double #32a1ce'
}

export const DatabaseTableContainer = props => (
    <div style={containerStyle}>
        {props.children}
    </div>
);

export default DatabaseTableContainer