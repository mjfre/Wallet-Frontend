import React, {useState} from "react"
import {LoginOutlined} from '@ant-design/icons';
import UserService from "../service/UserService";
import {errorNotification, successNotification} from '../components/Notification'
import {Input, Button} from 'antd';
import {useHistory} from "react-router-dom";

const inputFieldStyle = {marginBottom: '10px', width: '20em'};

export const PasswordResetForm = (props) => {

    let [newPassword1, setNewPassword1] = useState(() => '');
    let [newPassword2, setNewPassword2] = useState(() => '');
    let [hasLoginFailed] = useState(() => false);
    let [showSuccessMessage] = useState(() => '');
    const {passwordResetToken} = props;

    let history = useHistory();

    const submitClicked = () => {

        if (newPassword1 !== newPassword2) {
            errorNotification("Try again...", "Your new password did not match");
            setNewPassword1('');
            setNewPassword2('');
        } else {
            UserService.resetPassword(passwordResetToken, newPassword1)
                .then((response) => response.json())
                .then(data => {
                    if (data.httpStatus === "BAD_REQUEST") {
                        throw new Error(data.message)
                    } else {
                        successNotification("Success", "Your password has been  updated")
                        history.push({
                            pathname: `/`,
                        });
                    }
                })
                .catch(err => {
                    console.log("error: " + err)
                    errorNotification("OOPS...", err.message);
                })
                .finally(() => {
                });
        }
    }

    return (
        <div
            style={{
                margin: '2.5em',
            }}>
            <p style={{fontWeight: 'bold'}}>Enter your new password</p>

            {hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
            {showSuccessMessage && <div>Login Successful</div>}

            <div style={{width: '100%'}}>
                <Input type="password"
                       autoFocus
                       name="newPassword1"
                       placeholder="new password"
                       size="large"
                       value={newPassword1}
                       onChange={e => setNewPassword1(e.target.value)}
                       style={inputFieldStyle}
                       onPressEnter={submitClicked}
                />
            </div>
            <div style={{width: '100%'}}>
                <Input type="password"
                       name="newPassword2"
                       placeholder="and again"
                       size="large"
                       value={newPassword2}
                       onChange={e => setNewPassword2(e.target.value)}
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
