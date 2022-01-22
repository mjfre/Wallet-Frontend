import React, {useState, useEffect} from "react"
import {LoadingOutlined } from '@ant-design/icons';
import {errorNotification} from "../../Notification";
import ExamService from "../../../service/ExamService";
import {AnswerButton} from "./AnswerButton";
import {NextButton} from "./NextButton";

export const AssessmentTestContent = (props) => {

    let [currentQuestionIndex, setCurrentQuestionIndex] = useState(() => 0)

    let [assessmentTestContent, setAssessmentTestContent] = useState(() => null);

    let [buttonSelected, setButtonSelected] = useState(() => null);

    let [selectedAnswers, setSelectedAnswers] = useState(() => []);

    let [placementFinalized, setPlacementFinalized] = useState(() => false);

    //this placement level is used during the test, to prevent the re-render that would occur if the parent's state were updated
    let [placementLevel, setPlacementLevel] = useState(() => 0)

    useEffect(() => {
        ExamService.fetchAssessmentTestContent()
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        setAssessmentTestContent(data);
                    })
                } else {
                    errorNotification("Error fetching assessment test content")
                }
            })
    }, []);

    const submitAssessmentTest = () => {
        props.setPlacementLevel(placementLevel);
        props.setAssessmentTestCompleted(true);
        ExamService.submitAssessmentTest(props.testToken, placementLevel, selectedAnswers)
            .then(response => {
                if (response.status !== 200) {
                    errorNotification("Error submitting assessment test, please try again later")
                }
            })
    }

    const nextClicked = () => {
        if (currentQuestionIndex < assessmentTestContent.length - 1) {
            setCurrentQuestionIndex(currentQuestionIndex + 1)
            setButtonSelected(null);
        }
        if ((currentQuestionIndex + 1) % 10 === 0) {
            //if the previous level of questions was not passed
            if (placementFinalized === true) {
                submitAssessmentTest();
            } else {
                //send the just completed level of questions
                ExamService.checkAssessmentTestAnswers(props.testToken, [...selectedAnswers, buttonSelected])
                    .then(response => {
                        //if the requests was successful
                        if (response.status === 200) {
                            response.json().then(data => {
                                //if they passed the level
                                if (data === true) {
                                    //increment the current placement level
                                    setPlacementLevel(placementLevel + 1);
                                    //if they level just passed was level 8
                                    if (placementLevel === 9) {
                                        //test is over - submit the results
                                        submitAssessmentTest();
                                    }
                                } else {
                                    //if they didn't pass the level 8
                                    if (placementLevel === 8) {
                                        //end immediately
                                        submitAssessmentTest();
                                    }
                                    //else end the test at the end of the next level's questions
                                    setPlacementFinalized(true);
                                }
                            })
                        } else {
                            errorNotification("Error checking assessment test answers, please try again later")
                        }
                    })
            }
        }
        setSelectedAnswers([...selectedAnswers, buttonSelected]);
    }

    const CodeColumn = () => {
        if (assessmentTestContent[currentQuestionIndex].code.length !== 0) {
            return <div style={{
                flex: 1,
                flexDirection: 'column',
                height: '100%',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '3%',
                paddingLeft: '5%'
            }}>
                {/*top*/}
                {/*bottom*/}
                <div style={{
                    display: 'flex', justifyContent: 'center',
                    alignItems: 'center', flex: 1, padding: '3%',
                    border: '1px solid green',
                    backgroundColor: '#bdbc93',
                    borderRadius: '1em',
                    visibility: assessmentTestContent[currentQuestionIndex].code.length === 0 ? 'hidden' : 'inherit'
                }}>
                        <pre style={{
                            color: '#031527', display: 'inline-block', justifyContent: 'center',
                            alignItems: 'center', width: '100%', height: '100%', textAlign: 'left', margin: 'auto',
                            padding: '3%', fontSize: '1.1em'
                        }}>
                            {assessmentTestContent[currentQuestionIndex].code}
                        </pre>
                </div>
            </div>
        } else {
            return null;
        }
    }

    const BodyComponent = () => {
        if (assessmentTestContent === null) {
            return <LoadingOutlined/>
        } else {
            return <div style={{width: '80%'}}>
                <div style={{
                    display: 'flex', color: 'white',
                    fontSize: '1.25em', backgroundColor: '#4a4c54', paddingTop: '6%', paddingBottom: '1%',
                    borderTopLeftRadius: 20, borderTopRightRadius: 20
                }}>
                    <div style={{
                        alignSelf: 'center',
                        marginLeft: '5%',
                        margin: '0 auto',
                        fontSize: '1.25em',
                        paddingRight: '3%',
                        paddingLeft: '3%'
                    }}>
                        {assessmentTestContent[currentQuestionIndex].question}
                    </div>
                </div>
                {/*columns*/}
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        border: '3px solid #4a545e',
                        backgroundColor: '#4a4c54',
                        marginBottom: 0,
                        borderTopWidth: 0,
                        borderBottomWidth: 0,
                    }}>
                    {/*left column*/}
                    <CodeColumn/>
                    {/*right column*/}
                    <div style={{
                        flex: assessmentTestContent[currentQuestionIndex].code.length !== 0 ? 1 : .5,
                        flexDirection: 'column', height: '100%', justifyContent: 'center',
                        alignItems: 'center', padding: '3%', width: '50%',
                        borderTopRightRadius: '1em', borderBottomRightRadius: '1em',
                        paddingRight: '5%',
                    }}>
                        <AnswerButton
                            content={assessmentTestContent[currentQuestionIndex].answers[0]}
                            buttonIndex={0}
                            buttonSelected={buttonSelected}
                            setButtonSelected={setButtonSelected}
                        />
                        <AnswerButton
                            content={assessmentTestContent[currentQuestionIndex].answers[1]}
                            buttonIndex={1}
                            buttonSelected={buttonSelected}
                            setButtonSelected={setButtonSelected}
                        />
                        <AnswerButton
                            content={assessmentTestContent[currentQuestionIndex].answers[2]}
                            buttonIndex={2}
                            buttonSelected={buttonSelected}
                            setButtonSelected={setButtonSelected}
                        />
                        <AnswerButton
                            content={assessmentTestContent[currentQuestionIndex].answers[3]}
                            buttonIndex={3}
                            buttonSelected={buttonSelected}
                            setButtonSelected={setButtonSelected}
                        />
                    </div>
                </div>
                {/*next button*/}
                <NextButton
                    disabled={buttonSelected === null}
                    onClick={nextClicked}
                />
            </div>
        }
    }

    return (
        <BodyComponent/>
    );
}
