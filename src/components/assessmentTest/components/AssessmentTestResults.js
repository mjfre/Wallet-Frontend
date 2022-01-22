import React, {useEffect, useState} from "react"
import {Select, Button,} from 'antd';
import {LoginOutlined, LoadingOutlined} from '@ant-design/icons';
import {errorNotification} from "../../Notification";
import ExamService from "../../../service/ExamService";
import TestLeagueNameLogoContainer from "./TestLeagueNameLogo";

export const AssessmentTestResults = (props) => {

    let [state, setState] = useState(() => 'calculating');

    let [availableClassTimes, setAvailableClassTimes] = useState(() => []);
    let [selectedClassTimes, setSelectedClassTimes] = useState(() => []);

    useEffect(() => {
        ExamService.findClassesByStudentLevel(props.placementLevel)
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        setAvailableClassTimes(data);
                    })
                } else {
                    errorNotification("Error fetching assessment test content")
                }
            })
    }, [props.placementLevel]);

    if(state === 'calculating'){
        setTimeout(() => {  setState('level'); }, 5000);
    }

    const finishClicked = () => {
        //iterate through available class times and find the classes that correspond to the selected class times
        if (state === 'level') {
            setState('class times')
        } else if (state === 'class times') {
            let selectedClasses = availableClassTimes.filter(availableClass => selectedClassTimes.includes(dateRecordToFormattedString(availableClass.classStartAt)));
            console.log(selectedClasses);
            ExamService.updateAssessmentTestClasses(props.testToken, selectedClasses)
                .then(response => {
                    if (response.status === 200) {
                        response.json().then(data => {
                            setState('final')
                        })
                    } else {
                        errorNotification("Error fetching assessment test content")
                    }
                })
        }
    }

    const levelSubtitles = [
        "Logic, Loops, & Variables",
        "Classes, Objects, & Methods",
        "Building Games with Java",
        "Data Structures & Algorithms",
        "Object-Oriented Programming Principles",
        "Lambdas, Streams, & IO",
        "Collaborative Coding Principles",
        "Application Programming Interface Development",
        "Oracle Java Certification",
        "Advanced Application Development"
    ]

    function dateRecordToFormattedString(dateString) {
        if (dateString !== null) {
            let date = new Date(dateString);

            let period = "a.m.";
            let dateHours = 0;
            if (date.getHours() === 0) {
                dateHours = 12;
            } else if (date.getHours() < 12) {
                dateHours = date.getHours();
            } else if (date.getHours() === 12) {
                dateHours = date.getHours();
                period = "p.m.";
            } else {
                dateHours = date.getHours() - 12;
                period = "p.m.";
            }


            let day = "";

            switch (date.getDay()) {
                case 0:
                    day = "Sundays";
                    break;
                case 1:
                    day = "Mondays";
                    break;
                case 2:
                    day = "Tuesdays";
                    break;
                case 3:
                    day = "Wednesdays";
                    break;
                case 4:
                    day = "Thursdays";
                    break;
                case 5:
                    day = "Fridays"
                    break;
                case 6:
                    day = "Saturdays"
                    break;
            }


            return day + ' @ ' + dateHours + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + " " + period

        }
        return "";
    }

    let filteredOptions = availableClassTimes.filter(o => !selectedClassTimes.includes(dateRecordToFormattedString(o.classStartAt)));


    //remove duplicate times

    let flags = {};

    filteredOptions = filteredOptions.filter(o => {
        if (flags[o.classStartAt]) {
            return false;
        }
        flags[o.classStartAt] = true;
        return true;
    })

    const BodyComponent = () => {
        if (state === 'calculating') {
            return <div style={{marginBottom: '5%'}}>
                <p style={{color: 'white'}}>Calculating Your Results</p>
                <LoadingOutlined style={{fontSize: '2em', color:'#d3613e'}}/>
            </div>
        } else if (state === 'level') {
            return <div style={{marginBottom: '5%'}}>
                <p style={{color: 'white'}}>Congratulations! Your placement:</p>
                <p style={{color: '#d3613e', fontSize: '3em', marginBottom: 0}}>Level {props.placementLevel}</p>
                <p style={{color: '#d3613e'}}>{levelSubtitles[props.placementLevel]}</p>
            </div>
        } else if (state === 'class times') {
            return <div style={{marginBottom: '5%'}}>
                <p style={{color: 'white',}}>Please select any class times for which you are
                    available</p>

                <div style={{ width: '80%', borderRadius: 10, margin: 'auto'}}>
                    <Select
                        mode="multiple"
                        placeholder={<div style={{color: 'white'}}>Select Class Times</div>}
                        value={selectedClassTimes}
                        size={'large'}
                        bordered={false}
                        onChange={value => {
                            setSelectedClassTimes(value)
                        }}
                        dropdownStyle={{backgroundColor: '#ccccd6'}}
                        style={{width: '80%',  height: '100%', backgroundColor:'#60626e',padding: '1em', borderRadius: 20}}
                    >
                        {filteredOptions.sort((a, b) => {
                            let aStartAt = dateRecordToFormattedString(a.classStartAt.toLowerCase());
                            let bStartAt = dateRecordToFormattedString(b.classStartAt.toLowerCase());
                            if (aStartAt < bStartAt) {
                                return -1
                            } else if (aStartAt > bStartAt) {
                                return 1;
                            } else {
                                return 0;
                            }
                        }).map(item => (
                            <Select.Option key={item.eventId} value={dateRecordToFormattedString(item.classStartAt)}>
                                {dateRecordToFormattedString(item.classStartAt)}
                            </Select.Option>
                        ))}
                    </Select>
                </div>
            </div>
        } else if (state === 'final') {
            return <div style={{ marginBottom: '5%'}}>
                <div style={{ textAlign: 'center'}}>
                <p style={{color: 'white', marginLeft: '5%',marginRight: '5%'}}>
                    Thank you for completing the assessment test. We will reach out to you at the email(s) you provided
                    to schedule a class time that works for everyone. We're looking forward to igniting your mind through
                    programming!
                </p>
                </div>
            </div>
        }
    }

    const NextButton = () => {
        if(state !== 'final' && state !== 'calculating'){
            return <Button
                className="btn btn-success"
                onClick={finishClicked}
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
                Next
            </Button>
        }
        else{
            return null;
        }
    }
    return (
        <div style={{
            backgroundColor: '#4a4c54', color: 'white',
            fontSize: '1.25em', paddingBottom: '4%',
            borderRadius: 20, width: '80%'
        }}>
            <TestLeagueNameLogoContainer style={{margin: '2.5em', marginTop: '4%'}}/>
                <BodyComponent/>
            <NextButton />
        </div>
    );
}
