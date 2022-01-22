import React from 'react';

const containerStyle = {
    width: '100%',
    margin: '0 auto',
    textAlign:'center',
    padding:'0em',
    overflow: 'hidden',
    border: '.5em black',
    paddingTop: '1em',
    paddingBottom: '1em'
}

export const WorkspaceEmptyDatabaseTableContainer = props => (
    <div style={containerStyle}>
        {props.children}
    </div>
);

export default WorkspaceEmptyDatabaseTableContainer
