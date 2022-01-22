import React, {useRef, useState} from 'react';
import {
    Button,
    TimePicker,
    Input,
    Popconfirm
} from 'antd';

import {
    CloudServerOutlined,
} from '@ant-design/icons';

import moment from 'moment';

import ReserveWorkspaceContainer from "../containers/ReserveWorkspaceContainer";
import {TagOutlined} from "@ant-design/icons";
import WorkspaceService from "../../../service/WorkspaceService";
import {errorNotification, successNotification} from "../../Notification";

const {Search} = Input;

export default function ReserveWorkspaceComponent(props) {

    const timePickerFormat = 'HH:mm';
    let currentDate = new Date();
    let sessionStartedOnTime = currentDate.getHours() + ":" + (currentDate.getMinutes() < 10 ? '0' : '') + currentDate.getMinutes();

    //rounded date used to calculate the likely end time of 90 minutes after the nearest 30 minute time
    let currentMinutes = currentDate.getMinutes();
    let currentHours = currentDate.getHours();
    let roundedMinutes = (((currentMinutes + 15) / 30 | 0) * 30) % 60;
    let roundedHours = ((((currentMinutes / 105) + .5) | 0) + currentHours) % 24;
    const roundedSessionStartedOnDate = new Date(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDay(), roundedHours, roundedMinutes);
    let sessionEndsOnDate = new Date(roundedSessionStartedOnDate.getTime() + 90 * 60000);
    let sessionEndsOnTime = sessionEndsOnDate.getHours() + ":" + (sessionEndsOnDate.getMinutes() < 10 ? '0' : '') + sessionEndsOnDate.getMinutes();


    const textAreaRef = useRef(null);
    const [sessionStartedOn, setSessionStartedOn] = useState(moment(sessionStartedOnTime, timePickerFormat));
    const [sessionEndsOn, setSessionEndsOn] = useState(moment(sessionEndsOnTime, timePickerFormat));

    function copyToClipboard(e) {
        textAreaRef.current.select();
        document.execCommand('copy');
        successNotification("Workspace URL Copied");
    };

    // const WorkspaceConnectionError =

    let WorkspaceUrlContainer = <div>
        <Search
            placeholder="   Workspace URL"
            value={props.newlyReservedWorkspaceAccessUrl}
            enterButton="Copy"
            size="large"
            prefix={<CloudServerOutlined/>}
            readOnly={true}
            onSearch={() => {
                copyToClipboard();
            }}
            style={{width: '70%', marginTop: '2em'}}
            ref={textAreaRef}
        />
        <div style={{padding: '1.5%', paddingBottom: '3%', color: 'red'}}>
            <Popconfirm
                placement='topRight'
                title={`This will prevent the workspace from being distributed. Mark workspace as inoperative?`}
                onConfirm={() => {
                    WorkspaceService.setInoperative(props.newlyReservedWorkspaceId).then(response => {
                        if (response.status === 200) {
                            successNotification('Workspace marked as inoperative!', ``);
                        }
                    });
                }}
                okText='Yes' cancelText='No'
                onCancel={e => e.stopPropagation()}>
                <Button ghost type='danger' onClick={(e) => e.stopPropagation()} size={'small'}>Mark
                    Inoperative </Button>
            </Popconfirm>
        </div>
    </div>

    return (
        <ReserveWorkspaceContainer key={1}>
            <div style={{paddingTop: '3%', paddingBottom: '3%'}}>
                <span style={{fontWeight: "bold", paddingRight: '1em'}}>
                From
                </span>
                <TimePicker value={sessionStartedOn} onChange={(time) => setSessionStartedOn(time)}
                            defaultValue={moment(sessionStartedOnTime, timePickerFormat)} format={timePickerFormat}
                            minuteStep={15}/>
                <span style={{fontWeight: "bold", paddingRight: '1em', paddingLeft: '1em'}}>
                To
                    </span>
                <span style={{paddingRight: '1em'}}>
                <TimePicker value={sessionEndsOn} onChange={(time) => setSessionEndsOn(time)}
                            defaultValue={moment(sessionEndsOnTime, timePickerFormat)} format={timePickerFormat}
                            minuteStep={15}/>
                </span>
                <Button
                    ghost
                    type="primary"
                    shape="round"
                    icon={<TagOutlined/>}
                    size={'medium'}
                    onClick={() => {
                        if (sessionEndsOn < sessionStartedOn) {
                            errorNotification("Error with Reservation", "End time must be after start time");
                        } else {
                            WorkspaceService.reserveAvailableWorkspace(sessionStartedOn, sessionEndsOn)
                                .then(response => {
                                    if (response.status === 400) {
                                        errorNotification("Workspace Error", "No Workspaces Available")
                                    } else {
                                        response.json().then(data => {
                                            props.setNewlyReservedWorkspaceId(data.id);
                                            props.setNewlyReservedWorkspaceAccessUrl(data.accessUrl);
                                            props.setFetchWorkspaces(true);
                                            props.setDefaultActiveCollapseKey(1);
                                            successNotification("Workspace Reserved!")
                                        })
                                    }
                                })
                        }
                    }}>
                    Reserve
                </Button>
            </div>
            {props.newlyReservedWorkspaceAccessUrl ? WorkspaceUrlContainer : null}
        </ReserveWorkspaceContainer>
    );
}

