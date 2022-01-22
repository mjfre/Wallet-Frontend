import React, {useRef, useState} from 'react';
import {
    Descriptions,
    Input
} from 'antd';
import {
    KeyOutlined,
} from '@ant-design/icons';

import StudentProfileInfoContainer from "../containers/StudentProfileInfoContainer";
import {successNotification} from "../../Notification";

const {Search} = Input;


export const StudentAccountsInfo = (props) => {

    let [passwordResetToken, setPasswordResetToken] = useState(() => null)

    const textAreaRef = useRef(null);

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        successNotification("Workspace URL Copied");
    };

    const PasswordResetLinkField = () => {
        if (passwordResetToken !== null) {
            return <Search
                placeholder="   Workspace URL"
                value={"https://my.jointheleague.org/passwordReset/" + passwordResetToken}
                enterButton="Copy"
                size="large"
                prefix={<KeyOutlined />}
                readOnly={true}
                onSearch={() => {
                    copyToClipboard();
                }}
                style={{width: '70%', marginTop: '2em'}}
                ref={textAreaRef}
            />
        } else {
            return null;
        }
    }

    return (
        <StudentProfileInfoContainer>
            {/*<div>*/}
            {/*    <div style={{paddingTop: '1.5%'}}>*/}
            {/*        my.jointheleague.org*/}
            {/*    </div>*/}
            {/*    <div style={{padding: '3%', paddingBottom: '6%'}}>*/}
            {/*        <div style={{*/}
            {/*            flexDirection: 'row',*/}
            {/*            display: 'flex',*/}
            {/*            justifyContent: 'center',*/}
            {/*            alignContent: 'center'*/}
            {/*        }}>*/}
            {/*            <div style={{*/}
            {/*                paddingRight: '3%',*/}
            {/*                display: 'flex',*/}
            {/*                justifyContent: 'center',*/}
            {/*                alignContent: 'center'*/}
            {/*            }}>*/}
            {/*                <span style={{fontWeight: 'bold'}}>Username:&nbsp;</span> {props.username}*/}
            {/*            </div>*/}
            {/*            <div>*/}
            {/*                <Button*/}
            {/*                    ghost*/}
            {/*                    type='primary'*/}
            {/*                    shape='round'*/}
            {/*                    onClick={*/}
            {/*                        (e) => {*/}
            {/*                            UserService.requestStudentPasswordReset(props.studentId)*/}
            {/*                                .then(response => {*/}
            {/*                                    if (response.status === 200) {*/}
            {/*                                        response.json()*/}
            {/*                                            .then(data => {*/}
            {/*                                                setPasswordResetToken(data.passwordResetToken);*/}
            {/*                                                successNotification("Success", data.message);*/}
            {/*                                            });*/}
            {/*                                    } else {*/}
            {/*                                        errorNotification("OOPS", "Password reset request could not be completed.  Please try again later")*/}
            {/*                                    }*/}
            {/*                                });*/}
            {/*                        }*/}
            {/*                    }*/}
            {/*                    size={'small'}>*/}
            {/*                    Request Password Reset*/}
            {/*                </Button>*/}
            {/*            </div>*/}
            {/*        </div>*/}
            {/*        <PasswordResetLinkField/>*/}
            {/*    </div>*/}


            {/*</div>*/}

            <Descriptions
                // title={reactNodeLi}
                layout="vertical"
                labelStyle={{fontWeight: 'bold'}}
                bordered
            >
                <Descriptions.Item label="GitHub Account">
                    {props.githubAccount}
                </Descriptions.Item>
                <Descriptions.Item label="Pear ID" span={1}>
                    {props.pearId}
                </Descriptions.Item>
                <Descriptions.Item label="Pike13 ID" span={1}>
                    {props.pike13Id}
                </Descriptions.Item>
            </Descriptions>
        </StudentProfileInfoContainer>
    )
        ;
}

export default StudentAccountsInfo;

