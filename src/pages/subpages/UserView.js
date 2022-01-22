import React, {Component, Fragment, useState, useEffect} from 'react';
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
import {successNotification} from "../../components/Notification";
import AdminSubcomponentTemplate from '../../components/adminViewComponents/AdminSubcomponentTemplate';
import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';
import UserService from '../../service/UserService'
import AddUserForm from '../../forms/AddUserForm'


export const UserView = (props) => {

    const [users, setUsers] = useState(() => null);
    const [fetchingUsers, setFetchingUsers] = useState(() => false);
    const [isAddUserModalVisible, setIsAddUserModalVisible] = useState(() => null);


    useEffect(()=>{
        if(fetchingUsers === false && users === null){
            setFetchingUsers(true);
            fetchUsers()
        }
    }, [])

    const fetchUsers = () => {
        UserService.getUsers()
            .then(response =>
                response.json()
            )
            .then(data => {
                //console.log("users:")
                //console.log(data);
                setUsers(data);
                setFetchingUsers(false);
            });
    }

    const deleteUser = (username) => {
        UserService.deleteUser(username)
            .then(response =>
                console.log(response)
            )
            .then(data => {
                fetchUsers();
            });
    }

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
            title: '',
            key: 'action',
            render: (text, record) => (
                <Fragment>
                    <Popconfirm
                        placement='topRight'
                        title={`Are you sure you want to delete user \n ${record.username}`}
                        onConfirm={() => {
                            deleteUser(record.username);
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
                <h1>There are {users !== null ? users.length : 0} users </h1>
            </span>
    );

    const userButtonsLeftSide = (
        <span>
                <div className="actionButton">
                    <Button
                        ghost
                        type="primary"
                        shape="round"
                        icon={<PlusCircleOutlined/>}
                        size={'medium'}
                        onClick={() => {
                            setIsAddUserModalVisible(true);
                        }}
                    >
                        Add User
                    </Button>
                </div>
                <Modal
                    title="Add New User"
                    visible={isAddUserModalVisible}
                    okButtonProps={{style: {display: 'none'}}}
                    onCancel={() => setIsAddUserModalVisible(false)}
                    width={1000}
                >
                    <AddUserForm
                        onSuccess={() => {
                            setIsAddUserModalVisible(false);
                            fetchUsers();
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
            onSuccess={fetchUsers}
        />

    return <AdminSubcomponentTemplate
        tableStructure={userColumns}
        tableRowKey={'username'}
        tableData={users}
        emptyTableMessage={"No users found"}
        subcomponentMaintenanceView={userMaintenanceView}
    />


}

export default UserView;
