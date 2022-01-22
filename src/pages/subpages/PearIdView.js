import React, { Component } from 'react';
import {
    Avatar,
    Modal,
    Button
} from 'antd';
import {
    UserOutlined,
    MinusOutlined,
    UsergroupAddOutlined,
    PlusCircleOutlined,
} from '@ant-design/icons';


import '../../App.css'
import { successNotification, errorNotification } from "../../components/Notification";
import AdminSubcomponentTemplate from '../../components/adminViewComponents/AdminSubcomponentTemplate';
import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';
import PearIdService from '../../service/PearIdService'
import GeneratePearIdForm from '../../forms/GeneratePearIdForm'
import Pike13Service from '../../service/Pike13Service';

class PearIdView extends Component {

    state = {
        isGeneratePearIdModalVisible: false,
        isPike13ExportButtonDisabled: false
    }

    fetchPearIds = () => {
        this.props.fetchData()
    }

    fetchStudents = () => {
        this.props.fetchStudents()
    }

    assignAvailablePearIds = () => {
        PearIdService.assignAvailablePearIds().then(() => {
            successNotification('Pear IDs assigned', ``);
            this.fetchPearIds();
        }).catch(err => {
            console.log(err.error);
            errorNotification(`Error - (${err.error.httpStatus})`, `${err.error.message}`);
        });
    }

    exportPearIdsToPike13 = () => {
        this.disablePike13ExportButton();
        Pike13Service.exportPearIdsToPike13()
            .then( () => {
                successNotification('Pear IDs exports to Pike13', ``)
                this.enablePike13ExportButton();
            }).catch(err => {
                console.log(err.error);
                errorNotification(`Error - (${err.error.httpStatus})`, `${err.error.message}`);
            });
    }

    //Pear Id Maintenance View
    openGeneratePearIdModal = () => this.setState({ isGeneratePearIdModalVisible: true })

    closeGeneratePearIdModal = () => this.setState({ isGeneratePearIdModalVisible: false })

    disablePike13ExportButton = () => this.setState({ isPike13ExportButtonDisabled: true })

    enablePike13ExportButton = () => this.setState({ isPike13ExportButtonDisabled: false })

    render() {

        const pearIds = this.props.data;
        const { isGeneratePearIdModalVisible } = this.state;
        const pearIdsAvailable = pearIds.filter((pid) => pid.studentId===null).length;
        const pearIdsAssigned = pearIds.length - pearIdsAvailable;


        //create tableStructure
        const pearIdColumns = [
            {
                title: '',
                key: 'avatar',
                render: (text, pearId) => {
                    if (pearId.studentId !== null) {
                        return <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
                    }
                    else {
                        return <Avatar icon={<MinusOutlined />} />
                    }
                }
            },
            {
                title: 'Pear Id',
                dataIndex: 'pearId',
                key: 'pearId'
            },
            {
                title: 'Student Name',
                dataIndex: 'studentName',
                key: 'studentName'
            }
        ];

        //create infoCard
        const pearIdMaintenanceViewInfoCard = (
            <span>
                <h1>There are {pearIds.length} pear ids </h1>
                <br />
                <h3>Available: {pearIdsAvailable}</h3>
                <br />
                <h3>Assigned: {pearIdsAssigned}</h3>
            </span>
        );

        const pearIdButtonsLeftSide = (
            <span>
                <div className="actionButton">
                    <Button
                        ghost
                        type="primary"
                        shape="round"
                        icon={<PlusCircleOutlined />}
                        size={'medium'}
                        onClick={() => {
                            this.openGeneratePearIdModal()
                        }}
                    >
                        Generate Pear IDs
                    </Button>
                </div>
                <Modal
                    title='Generate Pear IDs'
                    visible={isGeneratePearIdModalVisible}
                    okButtonProps={{ style: { display: 'none' } }}
                    onCancel={this.closeGeneratePearIdModal}
                    width={1000}
                >

                    <GeneratePearIdForm
                        //when the form is submited
                        onSuccess={() => {
                            this.closeGeneratePearIdModal();
                            this.fetchPearIds();
                            this.fetchStudents();
                            successNotification("Pear IDs generated", "");
                        }}
                    />
                </Modal>
                <div className="actionButton">
                    <Button
                        ghost
                        type="primary"
                        shape="round"
                        icon={<UsergroupAddOutlined />}
                        size={'medium'}
                        onClick={() => {
                            this.assignAvailablePearIds();
                        }}
                    >
                        Assign Available IDs
                    </Button>
                </div>
            </span>
        );

        const pearIdButtonsRightSide = (
            <span>
            </span>
        );

        const pearIdMaintenanceView =
            <MaintenanceViewTemplate
                title={"Pear IDs"}
                infoCard={pearIdMaintenanceViewInfoCard}
                buttonsLeftSide={pearIdButtonsLeftSide}
                buttonsRightSide={pearIdButtonsRightSide}
                onSuccess={this.fetchPearIds}
            />

        return <AdminSubcomponentTemplate
            tableStructure={pearIdColumns}
            tableRowKey={'pearId'}
            tableData={pearIds}
            emptyTableMessage={"No pear ids found"}
            subcomponentMaintenanceView={pearIdMaintenanceView}
        />

    }
}

export default PearIdView;
