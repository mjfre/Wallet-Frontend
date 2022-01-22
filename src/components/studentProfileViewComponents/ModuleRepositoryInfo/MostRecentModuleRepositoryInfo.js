import React, { Component } from 'react';
import ModuleRepositoryLoadingContainer from './subComponents/containers/ModuleRepositoryLoadingContainer';
import MostRecentModuleDescription from './subComponents/description/MostRecentModuleDescription';
import StudentProfileInfoContainer from '../containers/StudentProfileInfoContainer';

class MostRecentModuleRepositoryInfo extends Component {

    render() {

        const { moduleRepositoryInfo, formattedMostRecentStudentRepositoryName } = this.props;

        if (moduleRepositoryInfo == null) {
            return <ModuleRepositoryLoadingContainer />
        }

        return <StudentProfileInfoContainer>
            <MostRecentModuleDescription mostRecentRepositoryInformation={moduleRepositoryInfo} formattedMostRecentStudentRepositoryName={formattedMostRecentStudentRepositoryName} />
        </StudentProfileInfoContainer>
    }

}

export default MostRecentModuleRepositoryInfo;
