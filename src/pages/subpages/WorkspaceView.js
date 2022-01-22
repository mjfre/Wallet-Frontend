import React, {useState} from 'react';
import {
    Button,
    Popconfirm, Collapse, Empty
} from 'antd';
import {
    ClearOutlined,
} from '@ant-design/icons';

import '../../App.css'
import {successNotification, errorNotification} from "../../components/Notification";
import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';
import WorkspaceService from '../../service/WorkspaceService'
import AdminContentContainer from "../../components/adminViewComponents/AdminContentContainer";
import ReserveWorkspaceComponent
    from "../../components/workspaceViewComponents/reserveWorkspace/ReserveWorkspaceComponent";
import AllWorkspacesView from "../../components/workspaceViewComponents/AllWorkspaces/AllWorkspacesView";
import WorkspaceEmptyDatabaseTableContainer
    from "../../components/workspaceViewComponents/containers/WorkspaceEmptyDatabaseTableContainer";

const {Panel} = Collapse;

export default function WorkspaceView(props) {

    const [fetchWorkspaces, setFetchWorkspaces] = useState(true);
    const [workspaces, setWorkspaces] = useState(null);
    const [defaultActiveCollapseKey, setDefaultActiveCollapseKey] = useState(1);

    const [newlyReservedWorkspaceAccessUrl, setNewlyReservedWorkspaceAccessUrl] = useState(null);
    const [newlyReservedWorkspaceId, setNewlyReservedWorkspaceId] = useState(null);

    const [workspaceEmptyMessage, setWorkspaceEmptyMessage] = useState("No Workspaces Are Running");


    if (fetchWorkspaces === true) {
        WorkspaceService.fetchWorkspaces()
            .then(response => {
                    if (response.ok) {
                        response.json().then(data => {
                            // console.log("workspaces:")
                            // console.log(data);
                            setWorkspaces(data);
                            setFetchWorkspaces(false);
                        });
                    } else {
                        setFetchWorkspaces(false);
                        setWorkspaceEmptyMessage("Unable to fetch Workspaces")
                        errorNotification(`OOPS...`, `Error fetching workspace data. Status: ` + JSON.stringify(response.status));
                    }
                }
            )
    }


    let workspacesInUseLength = 0;
    let workspacesInoperativeLength = 0;
    let workspacesAvailableLength = 0;
    let workspacesLength = 0;
    console.log(workspaces);
    if (workspaces !== null) {
        workspacesInUseLength = workspaces.filter(workspace => workspace.reservedByUsername != null && new Date(workspace.sessionEndsOn) > new Date()).length;
        workspacesInoperativeLength = workspaces.filter(workspace => workspace.operational === false).length;
        workspacesAvailableLength = workspaces.length - workspacesInUseLength - workspacesInoperativeLength;
        workspacesLength = workspaces.length;
    }

    const BodyComponent = () => {

        const ReserveComponent = () => {
            if (workspacesLength === 0) {
                return <WorkspaceEmptyDatabaseTableContainer>
                    <Empty description={<span>{workspaceEmptyMessage}</span>}/>
                </WorkspaceEmptyDatabaseTableContainer>
            } else if (newlyReservedWorkspaceAccessUrl === null && workspacesAvailableLength === 0) {
                return <WorkspaceEmptyDatabaseTableContainer>
                    <Empty description={<span>{'All Workspaces Are in Use'}</span>}/>
                </WorkspaceEmptyDatabaseTableContainer>
            } else {
                return <ReserveWorkspaceComponent
                    fetchData={props.fetchData}
                    newlyReservedWorkspaceAccessUrl={newlyReservedWorkspaceAccessUrl}
                    setNewlyReservedWorkspaceAccessUrl={setNewlyReservedWorkspaceAccessUrl}
                    newlyReservedWorkspaceId={newlyReservedWorkspaceId}
                    setNewlyReservedWorkspaceId={setNewlyReservedWorkspaceId}
                    setFetchWorkspaces={setFetchWorkspaces}
                    setDefaultActiveCollapseKey={setDefaultActiveCollapseKey}
                />;
            }
        }

        return (
            <div>
                <br/>
                <br/>
                <Collapse bordered={true} style={{backgroundColor: '#dde4eb', textAlign: 'left'}} accordion={true}
                          defaultActiveKey={defaultActiveCollapseKey}>
                    <Panel header="Reserve a Workspace" key="1">
                        <ReserveComponent/>
                    </Panel>
                    <Panel header="View All Workspaces" key="2">
                        <AllWorkspacesView workspaces={workspaces} userRole={props.userRole} username={props.username}
                                           setFetchWorkspaces={setFetchWorkspaces}
                                           setDefaultActiveCollapseKey={setDefaultActiveCollapseKey}/>
                    </Panel>
                </Collapse>
            </div>
        );
    }

    //create infoCard
    const workspaceMaintenanceViewInfoCard = (
        <span>
                <h1>There are currently {workspacesLength} workspaces </h1>
                <h3 style={{margin: 0, fontSize: '.85em'}}>Available: {workspacesAvailableLength}</h3>
                <h3 style={{margin: 0, fontSize: '.85em'}}>In use: {workspacesInUseLength}</h3>
                <h3 style={{margin: 0, fontSize: '.85em'}}>Inoperative: {workspacesInoperativeLength}</h3>
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
                                           setNewlyReservedWorkspaceAccessUrl(null);
                                           setNewlyReservedWorkspaceId(null);
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
            title={"Workspaces"}
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
