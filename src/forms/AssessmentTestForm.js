import React, {useRef, useState} from 'react';
import '../App.css';

import {AimOutlined} from '@ant-design/icons';
import {successNotification} from '../components/Notification';
import {Button, Input} from 'antd';
import ExamService from "../service/ExamService";

const {Search} = Input;

const formStyle = {display: 'flex', flexDirection: 'column', alignItems: 'center'};

export const AssessmentTestForm = (props) => {

    const [assessmentTestUrl, setAssessmentTestUrl] = useState(null);
    const textAreaRef = useRef(null);

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        successNotification("Assessment Test URL Copied");
    }

    return (
        <div style={formStyle}>
            <p style={{flex: 1, width: '70%', minWidth: '100px', fontSize: '1.15em'}}>Generating an assessment test link creates a unique test ID.<br />Please generate a new link for each test
                that you are administering to avoid errors</p>
                <div style={{flex:1}}>
                    <Button
                        ghost
                        onClick={() => {
                            ExamService.createAssessmentTest(props.username)
                                .then(response => {
                                    response.json().then(data => {
                                        setAssessmentTestUrl("my.jointheleague.org?atid=" + data);
                                        successNotification("Assessment Test Created!")
                                    })
                                })
                        }}
                        type='primary'
                        shape='round'
                        icon={<AimOutlined />}
                        size={'large'}
                    >
                        Generate Link
                    </Button>
                </div>
                <div style={{visibility: assessmentTestUrl === null ? "hidden" : "inherit",  flex: 1, width: '100%'}}>
                    <Search
                        placeholder="   Assessment Test URL"
                        value={assessmentTestUrl}
                        enterButton="Copy"
                        size="large"
                        prefix={<AimOutlined />}
                        readOnly={true}
                        onSearch={() => {
                            copyToClipboard();
                        }}
                        style={{width: '70%', marginTop: '4%'}}
                        ref={textAreaRef}
                    />
                </div>
        </div>
    );
}
