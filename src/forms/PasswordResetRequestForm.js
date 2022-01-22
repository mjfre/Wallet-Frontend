import React, {useState} from "react"
import {LoginOutlined} from '@ant-design/icons';
import UserService from "../service/UserService";
import {successNotification, errorNotification} from '../components/Notification'
import {Input, Button} from 'antd';
import {useHistory} from "react-router-dom";

const inputFieldStyle = {marginBottom: '10px', width: '20em', borderRadius:' 1em', paddingLeft: '1em'};

export const PasswordResetRequestForm = () => {

    let [email, setEmail] = useState(() => '');
    let [hasLoginFailed] = useState(() => false);
    let [showSuccessMessage] = useState(() => false)

    let history = useHistory();

    const submitClicked = () => {

        if (email === '') {
            errorNotification("OOPS...", "Please enter an email address");
        }

        UserService.requestPasswordResetEmail(email)
            .then(response => {
                if (response.ok) {
                    successNotification(`Success`, `Password reset email sent to ${email}`);
                    history.push({
                        pathname: `/`,
                    });
                } else {
                    if (response.status === 400) {
                        errorNotification(`OOPS...`, `Email not found`);
                    } else {
                        errorNotification(`OOPS...`, `Something went wrong. Status: ` + response.body);
                    }

                }
            })
            .catch(err => {
                console.log(err);
            })
            .finally(() => {
            });
    }

    return (
        <div
             style={{
                 margin: '2.5em',
             }}>
            <p style={{fontWeight: 'bold'}}>Enter the email associated with your account</p>

            {hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
            {showSuccessMessage && <div>Login Successful</div>}

            <div style={{width: '100%'}}>
                <Input type="text"
                       autoFocus
                       name="email"
                       placeholder="email"
                       size="large"
                       value={email}
                       onChange={e => setEmail(e.target.value)}
                       style={inputFieldStyle}
                       onPressEnter={submitClicked}
                />
            </div>

            <br/>
            <Button
                className="btn btn-success"
                onClick={submitClicked}
                type="primary"
                shape="round"
                icon={<LoginOutlined/>}
                size={'large'}
                style={{
                    marginTop: '2.5em',
                    background: 'black',
                    borderColor: 'white'
                }}
            >
                Submit
            </Button>
        </div>
    );

}
