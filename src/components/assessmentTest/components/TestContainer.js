import React from 'react';
import background from "../../../img/cool-background.png";

const containerStyle = {
    height: '100%',
    width: '100%',
    margin: '0 auto',
    textAlign: 'center',
    backgroundImage: `url(${background})`,
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    minHeight: '730px',
    minWidth: '500px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,

//
// backgroundImage: "url('https://upload.wikimedia.org/wikipedia/en/thumb/8/87/Keyboard_cat.jpg/220px-Keyboard_cat.jpg')",
// backgroundColor: 'rgba(255, 255, 255, 0.4)',
// backgroundBlendMode: 'lighten'
}

export const ContentContainer = props => (
    <div style={containerStyle}>
        {props.children}
    </div>
);

export default ContentContainer
