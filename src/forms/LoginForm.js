import React, {useState, useEffect} from "react"
import {Input, Button} from 'antd';
import {LoginOutlined} from '@ant-design/icons';
import UserService from "../service/UserService";
import {errorNotification} from '../components/Notification'
import {
    useLocation,
    useHistory
} from "react-router-dom";
import './css/LoginForm.css';

const inputFieldStyle = {marginBottom: '10px', width: '20em', borderRadius:' 1em', paddingLeft: '1em'};

const LoginForm = () => {
    let [username, setUsername] = useState(() => '')
    let [password, setPassword] = useState(() => '')
    let [userRole, setUserRole] = useState(() => '')
    let [userTeacherId, setUserTeacherId] = useState(() => '')
    let [hasLoginFailed, setHasLoginFailed] = useState(() => false);
    let [showSuccessMessage, setShowSuccessMessage] = useState(() => false)
    let history = useHistory();

    let queryParams = new URLSearchParams(useLocation().search)

    useEffect(() => {
        let localUsername = localStorage.getItem('username');

        if (localUsername) {
            history.push({
                pathname: `/home`,
                state: {
                    userRole: userRole,
                    username: username,
                    userTeacherId: userTeacherId
                }
            });
        }

        let passwordResetToken = queryParams.get('prt');
        if(passwordResetToken !== null) {
            history.push({
                pathname: `/passwordReset/`+passwordResetToken
            });
        }

        let assessmentTestId = queryParams.get('atid');
        if(assessmentTestId !== null) {
            history.push({
                pathname: `/assessment/`+assessmentTestId
            });
        }

    })

    const loginClicked = () => {
        UserService.login(username, password)
            .then(response => {
                if (response.ok) {
                    localStorage.setItem('accessToken', response.headers.get('Authorization'));
                    console.log(localStorage.getItem('accessToken'));
                    UserService.getUserByUsername(username)
                        .then(response =>
                            response.json()
                        )
                        .then(data => {
                            setUserRole(data.applicationUserRole)
                            setUserTeacherId(data.teacherId);
                            setShowSuccessMessage(true);
                            localStorage.setItem('username', username);
                            localStorage.setItem('userRole', data.applicationUserRole);
                            localStorage.setItem('userTeacherId', data.teacherId);
                            history.push({
                                pathname: `/home`,
                                state: {
                                    username: username,
                                    userRole: userRole,
                                    userTeacherId: userTeacherId
                                }
                            });
                        });
                } else {
                    if (response.status === 403) {
                        errorNotification(`OOPS...`, `Invalid login credentials`);
                    } else {
                        errorNotification(`OOPS...`, `Something went wrong. Status: ` + response);
                    }

                }
            })

            .catch(err => {
                console.log(err);
                setShowSuccessMessage(false);
                setHasLoginFailed(true);
            });
    }

    return (
        <div
             style={{
                 margin: '2.5em',
             }}>
            {hasLoginFailed && <div className="alert alert-warning">Invalid Credentials</div>}
            {showSuccessMessage && <div>Login Successful</div>}
            <div style={{width: '100%'}}>
                <Input type="text"
                       autoFocus
                       name="username"
                       placeholder="username"
                       size="large"
                       value={username}
                       onChange={e => setUsername(e.target.value)}
                       style={inputFieldStyle}
                       onPressEnter={loginClicked}
                />
            </div>
            <div style={{width: '100%'}}>
                <Input type="password"
                       name="password"
                       placeholder="password"
                       size="large"
                       value={password}
                       onChange={e => setPassword(e.target.value)}
                       style={inputFieldStyle}
                       onPressEnter={loginClicked}
                />
            </div>

            <br/>
            <Button
                className="btn btn-success"
                onClick={loginClicked}
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
                Login
            </Button>
        </div>
    );
}

export default LoginForm;
