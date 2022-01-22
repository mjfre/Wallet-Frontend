import React from "react"


export const AnswerButton = (props) => {

    const buttonStyle = {
        backgroundColor: '#6b6151',
        padding: '3%',
        borderRadius: 20,
        marginTop: '3%',
        marginBottom: '5%',
        border: '1px solid black',
        filter: 'drop-shadow(5px 5px 5px #2e2d2c)',
        fontSize:  '1.25em',
        color:  'white'
    };

    return <div
        style={props.buttonSelected === props.buttonIndex ? {...buttonStyle, backgroundColor: '#424812'} : buttonStyle}
        onClick={() => props.setButtonSelected(props.buttonIndex)}
    >
        {props.content}
    </div>
}
