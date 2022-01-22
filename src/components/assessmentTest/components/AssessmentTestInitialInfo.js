import React  from "react"
import {Input, Button, Checkbox} from 'antd';
import {LoginOutlined} from '@ant-design/icons';
import {errorNotification, successNotification} from "../../Notification";
import ExamService from "../../../service/ExamService";
import TestLeagueNameLogoContainer from "./TestLeagueNameLogo";

const inputFieldStyle = {marginBottom: '10px', width: '20em', borderRadius: ' 1em', paddingLeft: '1em'};

export const AssessmentTestInitialInfo = (props) => {

    const buttonText = () => {
        if (props.initialInfoInputVisible === 'instructions') {
            return "START";
        } else {
            return "Next";
        }
    }

    const nextClicked = () => {
        if (props.initialInfoInputVisible === 'welcome') {
            //check to make sure the exam wasn't previously completed
            ExamService.assessmentCompletedById(props.testToken)
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(data => {
                            if (data === true) {
                                props.setInitialInfoInputVisible('already completed');
                            }
                            else{
                                props.setInitialInfoInputVisible('student name');
                            }
                        })
                    } else {
                        errorNotification("Error starting test.  Please try again later")
                    }
                });
        } else if (props.initialInfoInputVisible === 'student name' && props.studentName === null) {
            errorNotification("Information Needed", "Please enter your full name before continuing")
        } else if (props.initialInfoInputVisible === 'student name' && props.studentName !== null) {
            props.setInitialInfoInputVisible('guardian email');
        } else if (props.initialInfoInputVisible === 'guardian email' && props.parentContactEmail === null) {
            errorNotification("Information Needed", "Please enter your guardian's email address before continuing")
        } else if (props.initialInfoInputVisible === 'guardian email' && !props.parentContactEmail.includes('@')) {
            errorNotification("Information Needed", "Please enter a valid guardian email address before continuing")
        } else if (props.initialInfoInputVisible === 'guardian email' && props.parentContactEmail !== null) {
            props.setInitialInfoInputVisible('student email');
        } else if (props.initialInfoInputVisible === 'student email') {
            props.setInitialInfoInputVisible('academic honesty');
        } else if (props.initialInfoInputVisible === 'academic honesty' && props.academicHonestyAgreed !== true) {
            errorNotification("Acknowledgement Incomplete ", "Please agree to the academic honesty statement in order to continue")
        } else if (props.initialInfoInputVisible === 'academic honesty' && props.academicHonestyAgreed === true) {
            props.setInitialInfoInputVisible('instructions');
        } else if (props.initialInfoInputVisible === 'instructions') {
            //update initial info and proceed
            ExamService.updateAssessmentTestInitialInfo(
                props.testToken,
                props.studentName,
                props.parentContactEmail,
                props.studentContactEmail
            )
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(data => {
                            props.setInitialInfoCompleted(true);
                            successNotification("Good Luck!")
                        })
                    } else {
                        errorNotification("Error starting test")
                    }
                })
        }
    }

    const InputField = () => {
        if (props.initialInfoInputVisible === 'welcome') {
            return <div style={{display: 'flex', flex: 1, width: '100%', marginBottom: '5%'}}>
                <div style={{width: '100%', textAlign: 'center'}}>
                    <p style={{color: 'white', width: '60%', margin: 'auto', maxWidth: '800px'}}>
                        Welcome to The League of Amazing Programmer's assessment test. The following questions are
                        designed to
                        assess your knowledge of the topics covered in each level of our curriculum, and place you
                        in
                        the appropriate
                        level. Before we start, there are few pieces of information we need from you.
                    </p>
                </div>
            </div>

        } else if (props.initialInfoInputVisible === 'student name') {
            return <div style={{width: '100%', marginBottom: '5%'}}>
                <p style={{color: 'white'}}>Enter Your Full Name</p>
                <Input type="text"
                       autoFocus
                       name="student name"
                       placeholder="full name"
                       size="large"
                       value={props.studentName}
                       onChange={e => props.setStudentName(e.target.value)}
                       onPressEnter={nextClicked}
                       style={inputFieldStyle}
                />
            </div>

        } else if (props.initialInfoInputVisible === 'guardian email') {
            return <div style={{width: '100%', marginBottom: '5%'}}>
                <p style={{color: 'white'}}>Enter Your Guardian's Email Address</p>
                <Input type="text"
                       autoFocus
                       name="guardian email"
                       placeholder="guardian email"
                       size="large"
                       value={props.parentContactEmail}
                       onChange={e => props.setParentContactEmail(e.target.value)}
                       onPressEnter={nextClicked}
                       style={inputFieldStyle}
                />
            </div>
        } else if (props.initialInfoInputVisible === 'student email') {
            return <div style={{width: '100%', marginBottom: '5%'}}>
                <p style={{color: 'white'}}>Enter Your Email (Optional)</p>
                <Input type="text"
                       autoFocus
                       name="student email"
                       placeholder="student email"
                       size="large"
                       value={props.studentContactEmail}
                       onChange={e => props.setStudentContactEmail(e.target.value)}
                       onPressEnter={nextClicked}
                       style={inputFieldStyle}
                />
            </div>

        } else if (props.initialInfoInputVisible === 'academic honesty') {
            return <div style={{width: '100%', marginBottom: '5%'}}>
                <div style={{width: '100%', textAlign: 'center'}}>
                    <p style={{color: 'white', width: '60%', margin: 'auto', maxWidth: '800px'}}>
                        At The League of Amazing Programmers, academic honesty
                        is an important principle. Please agree to the expectations for your
                        conduct below before starting this assessment test.
                    </p>
                </div>
                <div style={{width: '100%', textAlign: 'center', marginTop: '3%'}}>
                    <p style={{color: '#f26522', width: '60%', margin: 'auto', maxWidth: '800px'}}>
                        I understand that I am not not allowed to use any websites or other resources during this
                        assessment test, and that I may be required to take an additional placement exam after
                        beginning
                        classes, in order to confirm my placement.
                    </p>
                </div>
                <Checkbox
                    onChange={e => {
                        props.setAcademicHonestyAgreed(e.target.checked)
                    }}
                    checked={props.academicHonestyAgreed}
                    style={{marginTop: '.5em'}}
                >
                    <span style={{fontWeight: 'bold', color: 'white', width: '60%', margin: 'auto'}}>
                        I Agree
                    </span>
                </Checkbox>
            </div>
        } else if (props.initialInfoInputVisible === 'instructions') {
            return <div style={{width: '100%', marginBottom: '5%'}}>
                <div style={{width: '100%', textAlign: 'center'}}>
                    <p style={{color: 'white', width: '60%', margin: 'auto', maxWidth: '800px'}}>
                        Ok, let's get started! Here's how it works: you will be asked a series of multiple-choice
                        questions. They will start off covering basic material, and then get progressively harder
                        as you demonstrate your mastery of the topics in each level. Take your time and read each
                        question
                        carefully.
                    </p>
                </div>
            </div>
        } else if (props.initialInfoInputVisible === 'already completed') {
            return <div style={{width: '100%', marginBottom: '5%'}}>
                <div style={{width: '100%', textAlign: 'center'}}>
                    <p style={{color: 'white', width: '60%', margin: 'auto', maxWidth: '800px'}}>
                        It looks like you have already completed your assessment test! If there was an issue with
                        your
                        previous assessment test, please let the person that administered it know, and they can
                        provide you
                        with a new one.
                    </p>
                </div>
            </div>
        }


    }

    return (
        <div style={{
            backgroundColor: '#4a4c54', color: 'white',
            fontSize: '1.25em', paddingBottom: '4%',
            borderRadius: 20
        }}>
            <TestLeagueNameLogoContainer style={{margin: '2.5em', marginTop: '4%'}}/>
            <InputField/>
            {props.initialInfoInputVisible !== 'already completed' ? <Button
                className="btn btn-success"
                onClick={nextClicked}
                type="primary"
                shape="round"
                icon={<LoginOutlined/>}
                size={'large'}
                style={{
                    marginTop: '1.5em',
                    background: '#d3613e',
                    borderColor: 'white'
                }}
            >
                {buttonText()}
            </Button>  :  null}
        </div>
    );
}
