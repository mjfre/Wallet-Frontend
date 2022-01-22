import React, {useState} from 'react'
import {withRouter} from "react-router";
import TestContainer from "../components/assessmentTest/components/TestContainer";
import AssessmentTest from "../components/assessmentTest/AssessmentTest";

const AssessmentTestView = (props) => {

    let [testToken, setTestToken] = useState(() => props.match.params.testToken)

    console.log(testToken);

    return (
            <TestContainer>

                <AssessmentTest testToken={testToken}/>

            </TestContainer>
    )
}

export default withRouter(AssessmentTestView);
