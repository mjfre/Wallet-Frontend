import React, { Component } from 'react';
import AdminContentContainer from './AdminContentContainer';

import {
    Table,
    Empty
} from 'antd';

import DatabaseTableContainer from './subComponents/DatabaseTableContainer.js';
import DatabaseTableContainerEmpty from './subComponents/DatabaseTableContainerEmpty.js';

class AdminSubcomponentTemplate extends Component {

    render() {

        const { tableData, tableStructure, tableRowKey, emptyTableMessage, pageTitle} = this.props;

        if (tableData && tableData.length) {

            const BodyComponent = () => {
                    return (
                        <DatabaseTableContainer>
                            <Table
                                id='table'
                                style={{ width: '100%' }}
                                dataSource={tableData}
                                columns={tableStructure}
                                pagination= { {pageSizeOptions: ['10','500'], showSizeChanger: true}}
                                scroll={{ x: 100, y: 1000 }}
                                rowKey={tableRowKey}
                                 />
                        </DatabaseTableContainer>
                    )
                }

            return (
                <div key={'loaded'}>
                    <AdminContentContainer>
                        <div style = {{fontWeight:'bold', fontSize:'1.5em'}} ><h1>{pageTitle}</h1></div>
                        <BodyComponent />
                    </AdminContentContainer>
                </div>
            );
        }

        const BodyComponent = () => {
                return (
                    <div>
                        <DatabaseTableContainerEmpty >
                            <Empty description={<span>{emptyTableMessage}</span>} />
                        </DatabaseTableContainerEmpty>
                    </div>
                )
        }

        return (
            <div key={'noData'}>
                <AdminContentContainer >
                <div style = {{fontWeight:'bold', fontSize:'1.5em'}} ><h1>{pageTitle}</h1></div>
                    <BodyComponent />
                </AdminContentContainer>
            </div>
        );
    }
}

export default AdminSubcomponentTemplate;
