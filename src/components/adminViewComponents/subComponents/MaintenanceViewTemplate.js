import { Component } from 'react';
import { MaintenanceContainer } from "./MaintenanceContainer";
import React from 'react';
import './css/WorkspaceActionButtonContainer.css'

class MaintenanceViewTemplate extends Component {

    render() {
        return (
            <MaintenanceContainer title={this.props.title}>
                <div id="updateComponentLeftSide"
                    style={{
                        width: '50%',
                        float: 'left',
                    }}>
                    <div style={{
                        fontWeight: 'bold',
                        margin: '2.5%',
                        padding: '1.5em',
                        paddingBottom:  '.75em',
                        borderStyle: 'inset',
                        borderColor: '#ffdab5',
                        borderRadius: '10px',
                        backgroundImage: 'linear-gradient(45deg, #fff6eb 10%, #fffef5 10%, #fffef5 50%, #fff6eb 50%, #fff6eb 60%, #fffef5 60%, #fffef5 100%)',
                        backgroundSize: '35.36px 35.36px'
                    }}>
                        {this.props.infoCard}
                    </div>
                </div>

                <div id="updateComponentRightSide">
                    <div id="buttonsLeftSide">
                        {this.props.buttonsLeftSide}
                    </div>
                    <div id="buttonsRightSide">
                        {this.props.buttonsRightSide}
                    </div>
                </div>
            </MaintenanceContainer>
        );
    }
}

export default MaintenanceViewTemplate;
