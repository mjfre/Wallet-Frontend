import React, {useEffect, useState} from 'react';
import MaintenanceViewTemplate from '../../components/adminViewComponents/subComponents/MaintenanceViewTemplate';
import {Button, Collapse, Descriptions} from "antd";
import ExamService from "../../service/ExamService";
import {errorNotification} from "../../components/Notification";
import Level0Emblem from "../../img/level_emblems/level0Emblem.png";
import Level1Emblem from "../../img/level_emblems/level1Emblem.png";
import Level2Emblem from "../../img/level_emblems/level2Emblem.png";
import Level3Emblem from "../../img/level_emblems/level3Emblem.png";
import Level4Emblem from "../../img/level_emblems/level4Emblem.png";
import Level5Emblem from "../../img/level_emblems/level5Emblem.png";
import Level6Emblem from "../../img/level_emblems/level6Emblem.png";
import Level7Emblem from "../../img/level_emblems/level7Emblem.png";
import Level8Emblem from "../../img/level_emblems/level8Emblem.png";
import Level9Emblem from "../../img/level_emblems/level9Emblem.png";
import LevelUnknownEmblem from "../../img/level_emblems/levelUnknownEmblem.png";

const {Panel} = Collapse;

export const AssessmentTestResultsView = (props) => {

    const [assessmentTests, setAssessmentTests] = useState(() => []);


    useEffect(() => {
        ExamService.fetchAssessmentTests()
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        setAssessmentTests(data);
                        console.log(data);
                    })
                } else {
                    errorNotification("Error fetching assessment test content")
                }
            })
    }, []);

    //create infoCard
    const oracleMaintenanceViewInfoCard = (
        <span>
                <h1>There are currently {assessmentTests.length} assessment test records</h1>
            </span>
    );

    const buttonsLeftSide = <span></span>;

    const buttonsRightSide = <span></span>;

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

            return dateHours + ":" + (date.getMinutes() < 10 ? '0' : '') + date.getMinutes() + " " + period + " on " +
                (date.getMonth() + 1) + "/" + date.getDate() + "/" + date.getFullYear().toString().substring(2);
        }
        return "";
    }

    function dateRecordToFormattedStringDayOfWeek(dateString) {
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


    const AssessmentTestResults = () => {
        let results = assessmentTests.reverse().map((result, index) => {
            let durationMinutes = ((new Date(result.completedAt) - new Date(result.startedAt)) / 1000 / 60).toFixed(2);
            let minutesPerQuestion = (durationMinutes / result.questionsSeen).toFixed(2);

            //format all the selected class times
            let formattedClassTimes = result.selectedClasses.map(selectedClass => dateRecordToFormattedStringDayOfWeek(selectedClass.classTime));
            //filter any duplicate class times
            let formattedClassTimesSet = () => {
                let s = new Set(formattedClassTimes);
                let it = s.values();
                return Array.from(it);
            }
            //create spans
            let selectedClassTimesSpans = formattedClassTimesSet().map(classTime => {
                return <div style={{width: '40%', float: 'left'}}>{classTime}</div>
            })

            let parentMailto = "mailto:" + result.parentContactEmail + "?subject=League of Amazing Programmers Assessment Test" +
                "&body=Hello,%0D%0A%0D%0A" + result.studentName + " recently completed an assessment test, and their results " +
                "indicated that they would be a good fit for Level " + result.placementLevel +
                ".  We're very excited to have them join our program, and we've identified possible class times that " +
                "we hope are a good fit.  Please let us know if the times below would work well:%0D%0A%0D%0A" +
                "[INSERT CLASS TIMES HERE]%0D%0A%0D%0A" +
                "We're looking forward to igniting their young mind through programming!"

            let studentMailto = "mailto:" + result.studentContactEmail + "?subject=League of Amazing Programmers Assessment Test" +
                "&body=Hello " + result.studentName + ",%0D%0A%0D%0A You recently completed an assessment test, and your results indicated "
                + "that you would be a good fit for Level " + result.placementLevel + "%0D%0A%0D%0A" +
                "We're looking forward to igniting their young mind through programming!"

            const StudentBadge = () => {
                switch (result.placementLevel) {
                    case 0:
                        return <img src={Level0Emblem} alt="League Level 0 Emblem"
                                    style={{height: '2.5em'}}/>
                    case 1:
                        return <img src={Level1Emblem} alt="League Level 1 Emblem"
                                    style={{height: '2.5em'}}/>
                    case 2:
                        return <img src={Level2Emblem} alt="League Level 2 Emblem"
                                    style={{height: '2.5em'}}/>
                    case 3:
                        return <img src={Level3Emblem} alt="League Level 3 Emblem"
                                    style={{height: '2.5em'}}/>
                    case 4:
                        return <img src={Level4Emblem} alt="League Level 4 Emblem"
                                    style={{height: '2.5em'}}/>
                    case 5:
                        return <img src={Level5Emblem} alt="League Level 5 Emblem"
                                    style={{height: '2.5em'}}/>
                    case 6:
                        return <img src={Level6Emblem} alt="League Level 6 Emblem"
                                    style={{height: '2.5em'}}/>
                    case 7:
                        return <img src={Level7Emblem} alt="League Level 7 Emblem"
                                    style={{height: '2.5em'}}/>
                    case 8:
                        return <img src={Level8Emblem} alt="League Level 8 Emblem"
                                    style={{height: '2.5em'}}/>
                    case 9:
                        return <img src={Level9Emblem} alt="League Level 8 Emblem"
                                    style={{height: '2.5em'}}/>
                    default:
                        return <img src={LevelUnknownEmblem} alt="League Level Unknown Emblem"
                                    style={{height: '2.5em'}}/>
                }

            };

            return <Panel
                header={result.studentName !== null ? <span>{result.studentName}</span> :
                    <span style={{color: '#9da1a7'}}>Assessment Not Started</span>}
                key={index} style={{backgroundColor: '#dde4eb'}}
            >
                <Descriptions
                    layout="vertical"
                    bordered
                    column={{xxl: 4, xl: 3, lg: 3, md: 3, sm: 3, xs: 1}}
                >
                    <Descriptions.Item label="Student Name" style={{textAlign: 'center', fontWeight: 500}}>
                        {result.studentName}
                    </Descriptions.Item>
                    <Descriptions.Item label="Placement Level" style={{textAlign: 'center', fontWeight: 500}}>
                        {StudentBadge()}
                    </Descriptions.Item>
                    <Descriptions.Item label="Questions Correct" style={{textAlign: 'center', fontWeight: 500}}>
                        <span style={{fontWeight: 'normal'}}>{result.questionsCorrect}/{result.questionsSeen}</span>
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions layout="vertical"
                              bordered
                              column={{xxl: 4, xl: 3, lg: 3, md: 4, sm: 4, xs: 1}}
                >
                    <Descriptions.Item label="Minutes Per Question" style={{textAlign: 'center', fontWeight: 500}}>
                        <span style={{fontWeight: 'normal'}}>{minutesPerQuestion}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Test Duration (Minutes)" style={{textAlign: 'center', fontWeight: 500}}>
                        <span style={{fontWeight: 'normal'}}>{durationMinutes}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Started At" style={{textAlign: 'center', fontWeight: 500}}>
                        <span style={{fontWeight: 'normal'}}>{dateRecordToFormattedString(result.startedAt)}</span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Completed At" style={{textAlign: 'center', fontWeight: 500}}>
                        <span style={{fontWeight: 'normal'}}>{dateRecordToFormattedString(result.completedAt)}</span>
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions layout="vertical"
                              bordered
                              column={{xxl: 4, xl: 3, lg: 3, md: 3, sm: 3, xs: 1}}
                >
                    <Descriptions.Item label="Parent Email" style={{textAlign: 'center', fontWeight: 500}}>
                        <a href={parentMailto}>
                            <Button ghost type='primary' size='small'>{result.parentContactEmail}</Button>
                        </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Student Email" style={{textAlign: 'center', fontWeight: 500}}>
                        <a href={studentMailto}>
                            <Button ghost type='primary' size='small'>{result.studentContactEmail}</Button>
                        </a>
                    </Descriptions.Item>
                    <Descriptions.Item label="Administered By" span={1} style={{textAlign: 'center', fontWeight: 500}}>
                        <span style={{fontWeight: 'normal'}}>{result.createdByUsername}</span>
                    </Descriptions.Item>
                </Descriptions>
                <Descriptions layout="vertical"
                              bordered
                              column={{xxl: 2, xl: 2, lg: 2, md: 2, sm: 2, xs: 2}}
                >
                    <Descriptions.Item label="Selected Classes" style={{textAlign: 'center', fontWeight: 500}}>
                        {result.selectedClasses.map(c => {
                            return <Button ghost type='primary' size='small'
                                           onClick={(e) => window.open('https://jtl.pike13.com/desk/events/' + c.eventId)}>{c.className}</Button>
                        })}
                    </Descriptions.Item>
                    <Descriptions.Item label="Selected Class Times" style={{textAlign: 'center', fontWeight: 500}}>
                        {selectedClassTimesSpans}
                    </Descriptions.Item>
                </Descriptions>
            </Panel>
        })

        return <Collapse bordered={true} style={{backgroundColor: '#dde4eb', textAlign: 'left'}}
                         accordion={true}
                         defaultActiveKey={0}>
            {results}
        </Collapse>
    }

    return (
        <div style={{ width: '95%',
            textAlign: 'center',
            padding: '2em 5em 5em',
            paddingTop: '0em',
            margin: '2.5em auto 2em'
        }}>
            <div style={{marginBottom: '2.5em'}}>
            <MaintenanceViewTemplate
                title={"Assessment Test Records"}
                infoCard={oracleMaintenanceViewInfoCard}
                buttonsLeftSide={buttonsLeftSide}
                buttonsRightSide={buttonsRightSide}
                onSuccess={() => {
                }}
            />
            </div>
            <AssessmentTestResults/>
        </div>
    );
}
