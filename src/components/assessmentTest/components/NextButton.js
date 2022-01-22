import React from "react"
import {
   RightCircleOutlined
} from '@ant-design/icons';
export const NextButton = (props) => {

    const buttonStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        border: '2px solid #4a545e',
        backgroundColor: '#6b6151',
        marginTop: 0,
        borderTop: '1px solid #606473',
        borderRadius: '3em',
        borderTopRightRadius: 0,
        borderTopLeftRadius: 0,
        width: '100%',
        padding: '1.5%'
    };


    return <div
        style={props.disabled === true ? {...buttonStyle, backgroundColor: '#4a4c54'} : buttonStyle}
        onClick={props.disabled === false ? props.onClick : null}
    >
        <div style={{
            display: 'flex',
            fontSize: '1.25em',
            fontWeight: 'bold',
            color: props.disabled === true ? '#5e616b' : 'white',
            marginRight: '.5em',
        }}>
            Next
        </div>
        <RightCircleOutlined  style={{fontSize: '1.25em', color: props.disabled === true ? '#5e616b' : 'white'}}/>
    </div>
}
