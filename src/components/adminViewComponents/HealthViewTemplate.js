import React, { Component } from 'react';

import {
    Table,
    Empty,
    Avatar
} from 'antd';

import {
    WarningOutlined,
    LoadingOutlined,
    CheckOutlined,
    ExclamationOutlined
} from '@ant-design/icons';


import '../../App.css'
import MaintenanceViewTemplate from './subComponents/MaintenanceViewTemplate';
import AdminContentContainer from '../adminViewComponents/AdminContentContainer';
import DatabaseTableContainer from "./subComponents/DatabaseTableContainer"
import DatabaseTableContainerEmpty from "./subComponents/DatabaseTableContainerEmpty"
import LogfileContainer from './subComponents/LogfileContainer';

class HealthView extends Component {

    render() {

        const { healthData, httpTrace, logfile, flyway} = this.props;

        //create tableStructure
        const dbHealthColumns = [
            {
                title: 'Database',
                dataIndex: 'database',
                key: 'database'
            },
            {
                title: 'Validation Query',
                dataIndex: 'validationQuery',
                key: 'validationQuery'
            },
            {
                title: 'Validation Result',
                dataIndex: 'result',
                key: 'result'
            }
        ];

        //create tableStructure
        const diskSpaceHealthColumns = [
            {
                title: 'Total',
                dataIndex: 'total',
                key: 'total'
            },
            {
                title: 'Free',
                dataIndex: 'free',
                key: 'free'
            },
            {
                title: 'Threshold',
                dataIndex: 'threshold',
                key: 'threshold'
            }
        ];

        //create tableStructure
        const mailHealthColumns = [
            {
                title: 'location',
                dataIndex: 'location',
                key: 'location'
            }
        ];

        //create tableStructure
        const httpTraceColumns = [
            {
                title: '',
                key: 'responseStatusAvatar',
                render: (record) => {
                    if (record.response.status === 200) {
                        return <Avatar size="small" style={{ backgroundColor: '#87d068' }} icon={<CheckOutlined />} />
                    }
                    else {
                        return <Avatar size="small" style={{ backgroundColor: '#FF0000' }} icon={<ExclamationOutlined />} />
                    }
                }
            },
            {
                title: 'Response Status',
                render: (record) => record.response.status,
                key: 'responseStatus'
            },
            {
                title: 'method',
                render: (record) => record.request.method,
                key: 'method'
            },
            {
                title: 'endpoint',
                render: (record) => {
                    //removing the http://... from the uri to improve readability 
                    let endpoint = record.request.uri;
                    //for api
                    if (endpoint.indexOf(".org/") >= 0) {
                        endpoint = endpoint.substring(endpoint.indexOf('.org/')+4);
                    }
                    //for actuator
                    else if (endpoint.indexOf("/actuator/") >= 0) {
                        endpoint = endpoint.substring(endpoint.indexOf('/actuator/'));
                    }
                    //for swagger
                    else if (endpoint.indexOf("/v2/") >= 0) {
                        endpoint = endpoint.substring(endpoint.indexOf('/v2/'));
                    }

                    return endpoint;
                },
                key: 'request[uri]'
            },
            {
                title: 'timestamp',
                dataIndex: 'timestamp',
                key: 'timestamp'
            }
        ];

        //create tableStructure
        const flywayColumns = [
            {
                title: 'State',
                dataIndex: 'state',
                render: (record) => {
                    if (record === "SUCCESS") {
                        return <Avatar size="small" style={{ backgroundColor: '#87d068' }} icon={<CheckOutlined />} />
                    }
                    else {
                        return <Avatar size="small" style={{ backgroundColor: '#FF0000' }} icon={<ExclamationOutlined />} />
                    }
                }
            },
            {
                title: 'File',
                dataIndex: 'script',
                key: 'script'
            },
            {
                title: 'Installed On',
                dataIndex: 'installedOn',
                key: 'installedOn'
            }
        ];


        //create infoCard
        let healthMaintenanceViewInfoCard = (
            <span>
                <br/>
                <LoadingOutlined/>  Checking Service Health
                <br/>
            </span>
        );


        const healthButtonsLeftSide = (
            <span>

            </span>
        );

        const healthButtonsRightSide = (
            <span>

            </span>
        );

        let DbHealthBodyComponent = () => {
            return (
                <div>
                    <DatabaseTableContainerEmpty>
                        <Empty description={<span>No database health found</span>}/>
                    </DatabaseTableContainerEmpty>
                </div>
            )
        };

        let DiskSpaceHealthBodyComponent = () => {
            return (
                <div>
                    <DatabaseTableContainerEmpty>
                        <Empty description={<span>No disk health found</span>}/>
                    </DatabaseTableContainerEmpty>
                </div>
            )
        };

        let MailHealthBodyComponent = () => {
            return (
                <span></span>
            )
        };

        let HttpTraceBodyComponent = () => {
            return (
                <div>
                    <DatabaseTableContainerEmpty>
                        <Empty description={<span>No http trace found</span>}/>
                    </DatabaseTableContainerEmpty>
                </div>
            )
        };

        let LogfileComponent = () => {
            return (
                <div>
                    <DatabaseTableContainerEmpty>
                        <Empty description={<span>No logfile found</span>}/>
                    </DatabaseTableContainerEmpty>
                </div>
            )
        };

        let FlywayBodyComponent = () => {
            return (
                <span></span>
            )
        };

        if (healthData.components != null) {

            let status = <Avatar size="small" style={{backgroundColor: '#87d068'}} icon={<CheckOutlined/>}/>;
            if (healthData.status !== "UP") {
                status = healthData.status;
            }

            let ping = <Avatar size="small" style={{backgroundColor: '#87d068'}} icon={<CheckOutlined/>}/>;
            if (healthData.components.ping.status !== "UP") {
                ping = healthData.status;
            }


            healthMaintenanceViewInfoCard = (
                <span>
                    <h1>Status: {status} </h1>
                    <br />
                    <h1>Ping: {ping} </h1>
                </span>
            );


            DbHealthBodyComponent = () => {
                return (
                    <DatabaseTableContainer>
                        <Table
                            title={() => {
                                if (healthData.components.db.status === "UP") {
                                    return "Database"
                                }
                                else {
                                    return <span> <WarningOutlined /> Database </span>
                                }
                            }
                            }
                            id='dbHealthTable'
                            style={{ width: '100%' }}
                            dataSource={[healthData.components.db.details]}
                            columns={dbHealthColumns}
                            pagination={false}
                            rowKey={'database'} />
                    </DatabaseTableContainer>
                )
            }


            DiskSpaceHealthBodyComponent = () => {
                return (
                    <DatabaseTableContainer>
                        <Table
                            title={() => {
                                if (healthData.components.diskSpace.status === "UP") {
                                    return "Disk Space"
                                }
                                else {
                                    return <span> <WarningOutlined /> Disk Space </span>
                                }
                            }
                            }
                            id='diskSpaceHealthTable'
                            style={{ width: '100%' }}
                            dataSource={[healthData.components.diskSpace.details]}
                            columns={diskSpaceHealthColumns}
                            pagination={false}
                            rowKey={'total'} />
                    </DatabaseTableContainer>
                )
            }

            //not all services have mail 
            if (healthData.components.mail != null) {
                MailHealthBodyComponent = () => {
                    return (
                        <DatabaseTableContainer>
                            <Table
                                title={() => {
                                    if (healthData.components.mail.status === "UP") {
                                        return "Mail"
                                    }
                                    else {
                                        return <span> <WarningOutlined /> Mail </span>
                                    }
                                }
                                }
                                id='mailHealthTable'
                                style={{ width: '100%' }}
                                dataSource={[healthData.components.mail.details]}
                                columns={mailHealthColumns}
                                pagination={false}
                                rowKey={'location'} />
                        </DatabaseTableContainer>
                    )
                }
            }

            HttpTraceBodyComponent = () => {
                return (
                    <DatabaseTableContainer>
                        <Table
                            title={() => "Recent Requests"}
                            id='httpTraceTable'
                            style={{ width: '100%' }}
                            dataSource={httpTrace.traces}
                            columns={httpTraceColumns}
                            pagination={{ pageSizeOptions: ['10', '500'], showSizeChanger: true }}
                            scroll={{ x: 100, y: 1000 }}
                            rowKey={'timestamp'} />
                    </DatabaseTableContainer>
                )
            }

            LogfileComponent = () => {
                return <LogfileContainer style={{ height: '20em' }}>
                    <pre>{logfile}</pre>
                </LogfileContainer>
            }

            //not all services have flyway 
            if (flyway) {
                if (flyway.contexts != null) {
                    FlywayBodyComponent = () => {
                        return (
                            <DatabaseTableContainer>
                                <Table
                                    title={() => "Flyway Database Migrations" }
                                    id='flywayTable'
                                    style={{ width: '100%' }}
                                    dataSource={flyway.contexts.application.flywayBeans.flyway.migrations}
                                    columns={flywayColumns}
                                    pagination={false}
                                    rowKey={'script'} />
                            </DatabaseTableContainer>
                        )
                    }
                }
            }

        }



        const healthMaintenanceView =
            <MaintenanceViewTemplate
                title={this.props.title}
                infoCard={healthMaintenanceViewInfoCard}
                buttonsLeftSide={healthButtonsLeftSide}
                buttonsRightSide={healthButtonsRightSide}
            //onSuccess={}
            />

        return (
            <div key={'noData'}>
                <AdminContentContainer >
                    {healthMaintenanceView}
                    <DbHealthBodyComponent />
                    <DiskSpaceHealthBodyComponent />
                    <MailHealthBodyComponent />
                    <HttpTraceBodyComponent />
                    <FlywayBodyComponent />
                    <LogfileComponent />
                </AdminContentContainer>
            </div>
        );

    }
}

export default HealthView;