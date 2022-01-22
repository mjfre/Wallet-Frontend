import React, {Fragment} from 'react';
import {
    Button, Table, Empty, Avatar, Popconfirm
} from 'antd';

import {
    BugOutlined, CloudServerOutlined, TagOutlined,
} from '@ant-design/icons';

import WorkspaceService from "../../../service/WorkspaceService";
import {successNotification} from "../../Notification";
import WorkspaceDatabaseTableContainer from "../containers/WorkspaceDatabaseTableContainer";
import WorkspaceEmptyDatabaseTableContainer from "../containers/WorkspaceEmptyDatabaseTableContainer";

export default function AllWorkspacesView(props) {

    const currentDate = new Date();

    function dateRecordToFormattedString(dateString) {
        if (dateString !== null) {
            let date = new Date(dateString);

            let period = "a.m.";
            let dateHours = 0;
            if(date.getHours() === 0){
                dateHours = 12;
            }
            else if (date.getHours() < 12) {
                dateHours = date.getHours();
            }
            else if(date.getHours() === 12){
                dateHours = date.getHours();
                period = "p.m.";
            }
            else {
                dateHours = date.getHours() - 12;
                period = "p.m.";
            }

            return dateHours + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + " " + period + " on " +
                (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substring(2);
        }
        return "";
    }

    //create tableStructure
    const workspaceColumns = [
        {
            title: '',
            key: 'avatar',
            render: (text, workspace) => {
                if (workspace.operational === false) {
                    return <Avatar style={{backgroundColor: '#8a1e12'}} icon={<BugOutlined/>} size="small"/>
                } else if (workspace.reservedByUsername != null && new Date(workspace.sessionEndsOn) > new Date()) {
                    return <Avatar style={{backgroundColor: '#3a8ff3'}} icon={<TagOutlined/>} size="small"/>
                } else {
                    return <Avatar style={{backgroundColor: '#87d068'}} icon={<CloudServerOutlined/>} size="small"/>
                }
            }

        },
        {
            title: 'Name',
            dataIndex: 'name',
            defaultSortOrder: 'descend',
        },
        {
            title: 'Reserved By',
            dataIndex: 'reservedByUsername',
        },
        {
            title: 'Started at ',
            dataIndex: 'sessionStartedOn',
            render: (text, record) => {
                let formattedDate = dateRecordToFormattedString(record.sessionStartedOn);
                return <Fragment>
                    {formattedDate}
                </Fragment>
            },
        },
        {
            title: 'Ends at',
            dataIndex: 'sessionEndsOn',
            render: (text, record) => {
                let formattedDate = dateRecordToFormattedString(record.sessionEndsOn);
                return <Fragment>
                    {formattedDate}
                </Fragment>
            },
        },
        {
            title: '',
            render: (text, record) => {
                if (props.userRole === "SUPERUSER" || props.userRole === "ADMIN" || (props.username === record.reservedByUsername && new Date(record.sessionEndsOn) > currentDate)) {
                    return <Fragment>
                        <Popconfirm
                            placement='topRight'
                            title={`${record.accessUrl}`}
                            onConfirm={() => {
                                let tempInput = document.createElement("input");
                                tempInput.value = record.accessUrl;
                                document.body.appendChild(tempInput);
                                tempInput.select();
                                document.execCommand("copy");
                                document.body.removeChild(tempInput);
                            }}
                            icon={<div/>}
                            okText='Copy' cancelText='Close'
                            onCancel={e => e.stopPropagation()}>
                            <Button ghost type='primary' onClick={(e) => e.stopPropagation()} size={'small'}>View
                                URL</Button>
                        </Popconfirm>
                        <Popconfirm
                            placement='topRight'
                            title={`Cancel your reservation for ${record.name}?`}
                            onConfirm={() => {
                                WorkspaceService.cancelReservation(record.id).then(response => {
                                    if (response.status === 200) {
                                        successNotification('Workspace reservation canceled!', ``);
                                        props.setFetchWorkspaces(true);
                                        props.setDefaultActiveCollapseKey(2)
                                    }
                                });
                            }}
                            okText='Yes' cancelText='No'
                            onCancel={e => e.stopPropagation()}>
                            <Button ghost type='danger' onClick={(e) => e.stopPropagation()} size={'small'} disabled={new Date(record.sessionEndsOn) < currentDate}>Cancel
                                Reservation</Button>
                        </Popconfirm>
                        <Popconfirm
                            placement='topRight'
                            title={`This will prevent the workspace from being distributed. Mark ${record.name} as inoperative?`}
                            onConfirm={() => {
                                WorkspaceService.setInoperative(record.id).then(response => {
                                    if (response.status === 200) {
                                        successNotification('Workspace marked as inoperative!', ``);
                                        props.setFetchWorkspaces(true);
                                        props.setDefaultActiveCollapseKey(2)
                                    }
                                });
                            }}
                            okText='Yes' cancelText='No'
                            onCancel={e => e.stopPropagation()}
                            disabled={record.operational === false}>
                            <Button ghost type='danger' onClick={(e) => e.stopPropagation()} size={'small'} disabled={record.operational === false}>Mark
                                Inoperative</Button>
                        </Popconfirm>
                    </Fragment>
                } else {
                    return <Fragment/>
                }
            }
        }
    ];

    if (props.workspaces && props.workspaces.length > 0) {
        return <WorkspaceDatabaseTableContainer>
            <Table
                id="workspaceTable"
                style={{width: '100%'}}
                dataSource={props.workspaces}
                columns={workspaceColumns}
                pagination={false}
                rowKey={workspace => workspace.id}
            />
        </WorkspaceDatabaseTableContainer>
    } else {
        return <WorkspaceEmptyDatabaseTableContainer>
            <Empty description={<span>{'No Workspaces Are Running'}</span>}/>
        </WorkspaceEmptyDatabaseTableContainer>
    }
}

