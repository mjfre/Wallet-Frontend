import React, { Component, Fragment } from 'react';
import {
    Modal,
    Button,
    Popconfirm,
    Avatar
} from 'antd';
import {
    PlusCircleOutlined,
    CheckOutlined,
    MinusOutlined
} from '@ant-design/icons';

import '../../App.css'
import { successNotification } from "../../components/Notification";
import AdminSubcomponentTemplate from '../../components/adminViewComponents/AdminSubcomponentTemplate';
import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';
import UserService from '../../service/UserService'
import AddUserForm from '../../forms/AddUserForm'


class UserView extends Component {

    state = {
        isAddUserModalVisible: false
    }

    fetchUsers = () => {
        this.props.fetchData()
    }

    deleteUser = (username) => {
        UserService.deleteUser(username)
            .then(response =>
                console.log(response)
            )
            .then(data => {
                this.fetchUsers();
            });
    }

    sendUserPasswordResetEmail = (username) => {
        UserService.requestPasswordResetEmail(username)
            .then(response =>
                console.log(response)
            )
            .then(data => {
                this.fetchUsers();
            });
    }

    openAddUserModal = () => this.setState({ isAddUserModalVisible: true })

    closeAddUserModal = () => this.setState({ isAddUserModalVisible: false })

    render() {

        const users = this.props.data;
        const { isAddUserModalVisible } = this.state;

        //create tableStructure
        const userColumns = [
            {
                title: 'Username',
                dataIndex: 'username',
                key: 'username'
            },
            {
                title: 'Role',
                dataIndex: 'applicationUserRole',
                key: 'applicationUserRole'
            },
            {
                title: 'Email',
                dataIndex: 'email',
                key: 'email'
            },
            {
                title: 'Account Activated',
                key: 'avatar',
                render: (text, record) => {
                    if (record.accountActivated === true) {
                        return <Avatar size="small" style={{ backgroundColor: '#87d068' }} icon={<CheckOutlined />} />
                    }
                    else {
                        return <Avatar size="small" icon={<MinusOutlined />} />
                    }
                }
            },
            {
                title: '',
                key: 'action',
                render: (text, record) => (
                    <Fragment>
                        <Popconfirm
                            placement='topRight'
                            title={`Send password reset email to \n ${record.email}?`}
                            onConfirm={() => {
                                this.sendUserPasswordResetEmail(record.username);
                            }
                            }
                            okText='Yes' cancelText='No'
                            onCancel={e => e.stopPropagation()}>
                            <Button ghost type='primary' size='small' onClick={(e) => e.stopPropagation()}>Reset Password</Button>
                        </Popconfirm>
                        <Popconfirm
                            placement='topRight'
                            title={`Are you sure you want to delete user \n ${record.username}`}
                            onConfirm={() => {
                                this.deleteUser(record.username);
                            }
                            }
                            okText='Yes' cancelText='No'
                            onCancel={e => e.stopPropagation()}>
                            <Button ghost type='danger' size='small' onClick={(e) => e.stopPropagation()}>Delete</Button>
                        </Popconfirm>
                    </Fragment>
                ),
            }
        ];

        //create infoCard
        const userMaintenanceViewInfoCard = (
            <span>
                <h1>There are {users.length} users </h1>
            </span>
        );

        const userButtonsLeftSide = (
            <span>
                <div className="actionButton">
                    <Button
                        ghost
                        type="primary"
                        shape="round"
                        icon={<PlusCircleOutlined />}
                        size={'medium'}
                        onClick={() => {
                            this.openAddUserModal();
                        }}
                    >
                        Add User
                    </Button>
                </div>
                <Modal
                    title="Add New User"
                    visible={isAddUserModalVisible}
                    okButtonProps={{ style: { display: 'none' } }}
                    onCancel={this.closeAddUserModal}
                    width={1000}
                >
                    <AddUserForm
                        teachers={this.props.teachers}
                        //when the form is submitted
                        onSuccess={() => {
                            this.closeAddUserModal();
                            this.fetchUsers();
                            successNotification('User added', '');
                        }}
                    />
                </Modal>
            </span>
        );

        const userButtonsRightSide = (
            <span>

            </span>
        );

        const userMaintenanceView =
            <MaintenanceViewTemplate
                title={"Users"}
                infoCard={userMaintenanceViewInfoCard}
                buttonsLeftSide={userButtonsLeftSide}
                buttonsRightSide={userButtonsRightSide}
                onSuccess={this.fetchUsers}
            />

        return <AdminSubcomponentTemplate
            tableStructure={userColumns}
            tableRowKey={'username'}
            tableData={users}
            emptyTableMessage={"No users found"}
            subcomponentMaintenanceView={userMaintenanceView}
        />

    }
}

export default UserView;
