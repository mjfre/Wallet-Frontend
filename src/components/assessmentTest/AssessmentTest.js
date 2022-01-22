import React, {useState} from "react"
import {withRouter} from 'react-router'
import {AssessmentTestInitialInfo} from "./components/AssessmentTestInitialInfo";
import {AssessmentTestContent} from "./components/AssessmentTestContent";
import {AssessmentTestResults} from "./components/AssessmentTestResults";

const AssessmentTest = (props) => {

    let [initialInfoInputVisible, setInitialInfoInputVisible] = useState(() => 'welcome')
    let [studentName, setStudentName] = useState(() => null)
    let [parentContactEmail, setParentContactEmail] = useState(() => null)
    let [studentContactEmail, setStudentContactEmail] = useState(() => null)
    let [academicHonestyAgreed, setAcademicHonestyAgreed] = useState(() => false)
    let [initialInfoCompleted, setInitialInfoCompleted] = useState(() => false)
    let [assessmentTestCompleted, setAssessmentTestCompleted] = useState(() => false)
    let [placementLevel, setPlacementLevel] = useState(() => 0)

    let [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => 0)

    const BodyComponent = () => {
        if(initialInfoCompleted === false){
            return <AssessmentTestInitialInfo
                initialInfoInputVisible={initialInfoInputVisible}
                setInitialInfoInputVisible={setInitialInfoInputVisible}
                studentName={studentName}
                setStudentName={setStudentName}
                parentContactEmail={parentContactEmail}
                setParentContactEmail={setParentContactEmail}
                studentContactEmail={studentContactEmail}
                setStudentContactEmail={setStudentContactEmail}
                academicHonestyAgreed={academicHonestyAgreed}
                setAcademicHonestyAgreed={setAcademicHonestyAgreed}
                setInitialInfoCompleted={setInitialInfoCompleted}
                testToken={props.testToken}
            />
        }
        else if(assessmentTestCompleted === false){
            return <AssessmentTestContent
                testToken={props.testToken}
                setAssessmentTestCompleted={setAssessmentTestCompleted}
                placementLevel={placementLevel}
                setPlacementLevel={setPlacementLevel}
                currentQuestionIndex={currentQuestionIndex}
                setCurrentQuestionIndex={setCurrentQuestionIndex}
            />
        }
        else{
            return <AssessmentTestResults
                testToken={props.testToken}
                placementLevel={placementLevel}
                />
        }
    }
    return (
        <BodyComponent />
    )
}

export default withRouter(AssessmentTest)
