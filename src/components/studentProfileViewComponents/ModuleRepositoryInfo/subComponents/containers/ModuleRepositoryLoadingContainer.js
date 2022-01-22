import React from 'react';

import {
    Spin
} from 'antd';

const containerStyle = {
    width: '100%',
    height: '100px',
    margin: '0 auto',
    textAlign: 'center',
    background: '#f7f7f7',
    overflow: 'hidden',
}

const loadingDivStyle = {
    margin: '0 auto',
    marginTop: '40px',
}

export const ModuleRepositoryLoadingContainer = props => (
    <div style={containerStyle}>
        <div style={loadingDivStyle}>
            <Spin />
            <span style={{paddingLeft: '1em'}}>Loading Module Repository Data</span>
        </div>
    </div>
);

export default ModuleRepositoryLoadingContainer
