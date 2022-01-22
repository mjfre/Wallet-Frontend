import React, {useEffect, useState} from 'react';
import {Button, Collapse, Descriptions, Spin} from 'antd';
import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';
import SubstituteService from "../../service/SubstituteService";

const {Panel} = Collapse;

export const SubstituteRequestView = (props) => {
    let [substituteRequests, setSubstituteRequests] = useState(() => null)
    let [collapseActiveKey, setCollapseActiveKey] = useState(() => 0)

    const fetchSubstituteRequests = () => {
        SubstituteService.fetchSubstituteRequests()
            .then((response) => response.json())
            .then((data) => {
                // console.log(data);
                setSubstituteRequests(data);
            });
    }

    useEffect(() => {
        fetchSubstituteRequests();
    }, []);

    function dateRecordToFormattedString(dateString) {
        if (dateString !== null) {
            let date = new Date(dateString);

            let period = "a.m.";
            let dateHours = 0;
            if (date.getHours() === 0) {
                dateHours = 12;
            } else if (date.getHours() < 12) {
                dateHours = date.getHours();
            } else if (date.getHours() === 12) {
                dateHours = date.getHours();
                period = "p.m.";
            } else {
                dateHours = date.getHours() - 12;
                period = "p.m.";
            }

            return dateHours + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + " " + period + " on " +
                (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substring(2);
        }
        return "";
    }

    function dateRecordToFormattedDatesString(dateStringStart, dateStringEnd) {
        if (dateStringStart !== null && dateStringEnd !== null) {
            let date1 = new Date(dateStringStart);
            let date2 = new Date(dateStringEnd);

            return (date1.getMonth() + 1) + "/" + date1.getDate() + "/" + date1.getFullYear().toString().substring(2)
                + " to " +
                (date2.getMonth() + 1) + "/" + date2.getDate() + "/" + date2.getFullYear().toString().substring(2)
        } else {
            return "";
        }
    }


    const SubstituteRequests = () => {
        let results = substituteRequests.reverse().map((result, index) => {

            const ApprovedOrDeniedByData = () => {
                if (result.approvedOrDeniedByUsername !== null) {
                    return <Descriptions layout="vertical"
                                         bordered
                                         column={{xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2}}
                    >
                        <Descriptions.Item label="Approved/Denied By" style={{textAlign: 'center', fontWeight: 500}}>
                            <span style={{fontWeight: 'normal'}}>{result.approvedOrDeniedByUsername}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label="Approved/Denied On" style={{textAlign: 'center', fontWeight: 500}}>
                            <span
                                style={{fontWeight: 'normal'}}>{dateRecordToFormattedString(result.approvedOrDeniedOn)}</span>
                        </Descriptions.Item>
                    </Descriptions>
                } else {
                    return null;
                }
            }

            const ClassesFilledByData = () => {
                if (result.classesFilledByUsername !== null) {
                    return <Descriptions layout="vertical"
                                         bordered
                                         column={{xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2}}
                    >
                        <Descriptions.Item label="Classes Filled By" style={{textAlign: 'center', fontWeight: 500}}>
                            <span style={{fontWeight: 'normal'}}>{result.classesFilledByUsername}</span>
                        </Descriptions.Item>
                        <Descriptions.Item label="Classes Filled On" style={{textAlign: 'center', fontWeight: 500}}>
                            <span
                                style={{fontWeight: 'normal'}}>{dateRecordToFormattedString(result.classesFilledOn)}</span>
                        </Descriptions.Item>
                    </Descriptions>
                } else {
                    return null;
                }
            }

            const ClassDuringRequest = () => {
                return <Descriptions layout="vertical"
                                     bordered
                                     column={{xxl: 1, xl: 1, lg: 1, md: 1, sm: 1, xs: 1}}
                >
                    <Descriptions.Item label="Classes During Request" style={{textAlign: 'center', fontWeight: 500}}>
                        {result.classesDuringRequest.map(c => {
                            return <Button ghost type='primary' size='small' shape='round' style={{
                                margin: '1%', width: 'fit-content',
                                blockSize: 'fit-content', padding: '1%'
                            }}
                                           onClick={(e) =>
                                               window.open('https://jtl.pike13.com/e/' + c.pike13EventOccurrenceId)}
                            >
                                <span style={{color: '#1047a1'}}>{c.className}</span>
                                <br/> {dateRecordToFormattedString(c.classDate)}
                            </Button>
                        })}
                    </Descriptions.Item>
                </Descriptions>
            }

            const StatusUpdateButtons = () => {
                if (result.requestStatus === "PENDING") {
                    return <Descriptions layout="vertical"
                                         bordered
                                         column={{xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2}}
                    >
                        <Descriptions.Item label="Update Request Status" style={{textAlign: 'center', fontWeight: 500}}>
                            <Button ghost shape="round" type='primary' size='medium' style={{marginRight: '3%'}}
                                    onClick={() => SubstituteService.approveOrDenySubstituteRequest("APPROVED", props.username, result.id).then(() => {
                                        setCollapseActiveKey(index);
                                        fetchSubstituteRequests();
                                    })}>Approve</Button>
                            <Button ghost shape="round" type='danger' size='medium'
                                    onClick={() => SubstituteService.approveOrDenySubstituteRequest("DENIED", props.username, result.id).then(() => {
                                        setCollapseActiveKey(index);
                                        fetchSubstituteRequests();
                                    })}>Deny</Button>
                        </Descriptions.Item>
                    </Descriptions>
                } else if (result.requestStatus === "APPROVED") {
                    return <Descriptions layout="vertical"
                                         bordered
                                         column={{xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2}}
                    >
                        <Descriptions.Item label="Update Request Status" style={{textAlign: 'center', fontWeight: 500}}>
                            <Button ghost shape="round" type='primary' size='medium'
                                    onClick={() => SubstituteService.updateSubstituteRequestStatusToClassesCovered(props.username, result.id).then(() => {
                                        setCollapseActiveKey(index);
                                        fetchSubstituteRequests();
                                    })}>Classes
                                Covered</Button>
                        </Descriptions.Item>
                    </Descriptions>
                } else {
                    return null;
                }
            }

            return <Panel
                header={
                    <span>{result.requestStatus.replace('_', ' ')} - {result.teacherName} - {dateRecordToFormattedDatesString(result.startOn, result.endOn)}</span>}
                key={index} style={{backgroundColor: '#dde4eb'}}
            >
                <Descriptions
                    layout="vertical"
                    bordered
                    column={{xxl: 3, xl: 3, lg: 3, md: 3, sm: 3, xs: 3}}
                >
                    <Descriptions.Item label="Status" style={{textAlign: 'center', fontWeight: 500}}>
                        {result.requestStatus}
                    </Descriptions.Item>
                    <Descriptions.Item label="Submitted By" style={{textAlign: 'center', fontWeight: 500}}>
                        {result.teacherName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Submitted On" style={{textAlign: 'center', fontWeight: 500}}>
                        <span style={{fontWeight: 'normal'}}>{dateRecordToFormattedString(result.submittedOn)}</span>
                    </Descriptions.Item>
                </Descriptions>


                <Descriptions
                    layout="vertical"
                    bordered
                    column={{xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2}}
                >
                    <Descriptions.Item label="Start On" style={{textAlign: 'center', fontWeight: 500}}>
                        {dateRecordToFormattedString(result.startOn)}
                    </Descriptions.Item>
                    <Descriptions.Item label="End On" style={{textAlign: 'center', fontWeight: 500}}>
                        {dateRecordToFormattedString(result.endOn)}
                    </Descriptions.Item>
                </Descriptions>

                <ApprovedOrDeniedByData/>

                <ClassesFilledByData/>

                <ClassDuringRequest/>

                <StatusUpdateButtons/>
            </Panel>
        })

        return <Collapse bordered={true} style={{backgroundColor: '#dde4eb', textAlign: 'left'}}
                         accordion={true}
                         defaultActiveKey={collapseActiveKey}>
            {results}
        </Collapse>
    }


    if (substituteRequests !== null) {

        const pendingRequestCount = substituteRequests.filter(substituteRequest => substituteRequest.requestStatus === "PENDING").length;
        const approvedRequestCount = substituteRequests.filter(substituteRequest => substituteRequest.requestStatus === "APPROVED").length;

        //create infoCard
        const substituteRequestsMaintenanceViewInfoCard = (
            <span>
                <h1>There are {pendingRequestCount + approvedRequestCount} requests that require attention</h1>
                <h3 style={{margin: 0, fontSize: '.85em'}}>Pending: {pendingRequestCount}</h3>
                <h3 style={{margin: 0, fontSize: '.85em'}}>Approved: {approvedRequestCount}</h3>
            </span>
        );

        const substituteRequestsButtonsLeftSide = (
            <span>

                   </span>
        );

        const substituteRequestsButtonsRightSide = (
            <span>

                   </span>
        );

        return <div style={{
            width: '95%',
            textAlign: 'center',
            padding: '2em 5em 5em',
            paddingTop: '0em',
            margin: '2.5em auto 2em'
        }}>
            <div style={{marginBottom: '2.5em'}}>
                <MaintenanceViewTemplate
                    title={"Substitute Teacher Requests"}
                    infoCard={substituteRequestsMaintenanceViewInfoCard}
                    buttonsLeftSide={substituteRequestsButtonsLeftSide}
                    buttonsRightSide={substituteRequestsButtonsRightSide}
                    onSuccess={() => {
                    }}
                />
            </div>
            <SubstituteRequests/>
        </div>
    } else {
        return <div style={{height: '100%', justifyContent: 'center', alignItems: 'center', display: 'flex'}}>
            <div>
                <Spin/>
                <span style={{paddingLeft: '1em'}}>Loading substitute request data</span>
            </div>
        </div>
    }
}
