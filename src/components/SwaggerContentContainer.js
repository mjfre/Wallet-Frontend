import React from 'react';

const containerStyle = {
width: '95%',
margin: '0 auto',
textAlign:'center',
padding:'5em',
paddingTop: '1.5em',
marginBottom: '2.5em',

marginTop : '2.5em',
//backgroundImage: "url('https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Keyboard_cat.jpg/220px-Keyboard_cat.jpg')",

}

export const ContentContainer = props => (
    <div style={containerStyle}>
        {props.children}
    </div>
);

export default ContentContainer
