import React, {useState} from 'react';
import {
    Button,
    Popconfirm, Collapse, Empty, Table
} from 'antd';
import {
    ClearOutlined,
} from '@ant-design/icons';

import '../../App.css'
import {successNotification, errorNotification} from "../../components/Notification";
import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';
import WorkspaceService from '../../service/WorkspaceService'
import AdminContentContainer from "../../components/adminViewComponents/AdminContentContainer";
import WalletService from "../../service/WalletService";

const {Panel} = Collapse;

export default function ThorWalletRecordView(props) {

    const [fetchWorkspaces, setFetchWorkspaces] = useState(true);
    const [thorWalletRecords, setThorWalletRecords] = useState(null);

    const [workspaceEmptyMessage, setWorkspaceEmptyMessage] = useState("No Workspaces Are Running");


    if (fetchWorkspaces === true) {
        WalletService.fetchThorWalletRecords()
            .then(response => {
                    if (response.ok) {
                        response.json().then(data => {
                            // console.log("workspaces:")
                            // console.log(data);
                            setThorWalletRecords(data);
                            setFetchWorkspaces(false);
                        });
                    } else {
                        setFetchWorkspaces(false);
                        setWorkspaceEmptyMessage("Unable to fetch Thor wallet records")
                    }
                }
            )
    }

    //create tableStructure
    const thorWalletRecordColumns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id'
        },
        {
            title: 'Thor Wallet Address',
            dataIndex: 'thorWalletAddress',
        },
        {
            title: 'Terra Wallet Address',
            dataIndex: 'terraWalletAddress',
        },
    ];

    const BodyComponent = () => {
            return <div
                style={{width: '100%',
                    margin: '0 auto',
                    textAlign:'center',
                    padding:'0em',
                    background:'#dedede',
                    boxShadow: '10px 10px 2em #888888',
                    overflow: 'hidden',
                    border: '.5em black',
                    marginTop : '2.5em'}}
            >

           <Table
                title={() => 'Thor Wallet Records'}
                id='thor wallet record table'
                style={{width: '100%'}}
                dataSource={thorWalletRecords}
                columns={thorWalletRecordColumns}
                pagination={false}
                />
            </div>
    }

    let addressesAvailableLength =
        thorWalletRecords !== null ?
            thorWalletRecords.filter(thorWalletRecord => thorWalletRecord.terraWalletAddress === null).length
            : "cats";

    //create infoCard
    const workspaceMaintenanceViewInfoCard = (
        <span>
                <h1>There are currently {thorWalletRecords === null ? 0 : thorWalletRecords.length} wallet records </h1>
                <h3 style={{margin: 0, fontSize: '.85em'}}>Unassigned Thor Addresses: {addressesAvailableLength}</h3>
            </span>
    );

    const UpdateWorkspaceTableComponent = () => {
        if (props.userRole === 'ADMIN' || props.userRole === 'SUPERUSER') {
            return <Popconfirm placement="bottomLeft"
                               title={<div>This will remove all workspace and session information from the
                                   database,<br/> then
                                   find
                                   any running workspaces on AWS and import information about them.<br/><br/> Proceed?
                               </div>}
                               onConfirm={() => {
                                   WorkspaceService.updateWorkspacesTableFromAws().then(response => {
                                       if (response.status === 200) {
                                           setFetchWorkspaces(true);
                                           successNotification('Workspaces updated from AWS!', ``);
                                       } else {
                                           errorNotification(`OOPS...`, `Unable to update workspace from AWS`);
                                       }
                                   });
                               }} okText="Yes"
                               cancelText="No">
                <Button
                    ghost
                    type="danger"
                    shape="round"
                    icon={<ClearOutlined/>}
                    size={'medium'}
                    onClick={() => {

                    }}>
                    Repopulate from AWS
                </Button>
            </Popconfirm>
        } else {
            return <div></div>
        }
    }


    const workspaceButtonsLeftSide = (
        <span>
                 <div className="actionButton">
    <UpdateWorkspaceTableComponent/>
                </div>
            </span>
    );

    const workspaceButtonsRightSide = (
        <span>
            </span>
    );

    const workspaceMaintenanceView =
        <MaintenanceViewTemplate
            title={"Thor Wallet Records"}
            infoCard={workspaceMaintenanceViewInfoCard}
            buttonsLeftSide={workspaceButtonsLeftSide}
            buttonsRightSide={workspaceButtonsRightSide}
            onSuccess={props.fetchData}
        />

    return <div key={'loaded'}>
        <AdminContentContainer>
            {workspaceMaintenanceView}
            <BodyComponent/>
        </AdminContentContainer>
    </div>

}
