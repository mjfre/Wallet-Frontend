import React, {Component} from 'react';
import '../App.css';

import {UpCircleOutlined} from '@ant-design/icons';
import StudentService from '../service/StudentService';
import GraduationService from '../service/GraduationService';
import {errorNotification, successNotification} from '../components/Notification';
import {Button, Select, InputNumber} from 'antd';

const Option = Select.Option;

const inputBottomMargin = {marginBottom: '10px'};
const selectStyle = {
    display: 'inherit',
    fontSize: '1em',
    width: '50%',
    margin: '0 auto',
    border: '2px solid #c9c9c9',
    borderRadius: '3px',
    ...inputBottomMargin
};

const inputStyle = {
    display: 'inherit',
    margin: '0 auto',
    border: '2px solid #c9c9c9',
    borderRadius: '3px',
    textAlign: 'center',
    ...inputBottomMargin
};

const formStyle = {display: 'flex', flexDirection: 'column', alignItems: 'center'};

export default class GraduationForm extends Component {
    constructor(props) {
        super(props);
        const {students, studentId, inModal} = props;
        this.state = {
            allStudents: students,
            studentId: studentId,
            studentLevel: null,
            accomplishment: 'BOTH',
            scorePercentage: 80,
            examScoreInputMaxValue: 100,
            examScoreInputFormatter: (value) => `${value}%`,
            examScoreInputParser: (value) => value.replace('%', ''),
            disabledScorePercentageInput: false,
            studentNameOptions: this.getStudentNameOptions(students),
            submitGraduationButtonDisabled: !inModal,
        };
    }

    componentDidUpdate(prevProps, prevState, snapShot) {
        if (prevProps.studentId !== this.props.studentId) {
            this.setState({studentId: this.props.studentId});
        }
    }

    getStudentNameOptions(students) {
        return students.map((student) => {
            return {
                value: student.studentId,
                label: student.firstName + ' ' + student.lastName + ': ' + student.githubAccount,
            };
        });
    }

    graduateStudent = (studentId, level, accomplishment, scorePercentage) => {
        StudentService.submitStudentGraduation(
            studentId,
            level,
            accomplishment,
            scorePercentage
        ).then((response) => {
            if (response.status === 400) {
                this.setState({submitGraduationButtonDisabled: false});
                if (accomplishment === "BOTH" || accomplishment === 'PROMOTED') {
                    errorNotification(`OOPS...`, `This student has already graduated level ` + level);
                }
                else{
                    errorNotification(`OOPS...`, `This student has already ` + accomplishment.toLowerCase() + " test score submitted for Level " + level);
                }

            } else {
                //this.props.fetchData();
                if (accomplishment === "BOTH" || accomplishment === 'PROMOTED') {
                    this.setState({submitGraduationButtonDisabled: false, studentLevel: level + 1});
                } else {
                    this.setState({submitGraduationButtonDisabled: false});
                }
                successNotification('Congratulations!', `Keep up the good work.`);
            }
        });
    };

    render() {
        const {studentNameOptions, studentLevel, scorePercentage} = this.state;

        console.log(scorePercentage);

        const accomplishmentOptions = [
            //be careful when changing the order. Check out the graduateStudent() method
            {
                value: 'BOTH',
                label: 'Finished Exam',
                key: 'BOTH',
            },
            {
                value: 'WRITTEN',
                label: 'Written Portion',
                key: 'WRITTEN',
            },
            {
                value: 'CODING',
                label: 'Coding Portion',
                key: 'CODING',
            },
            {
                value: 'PROMOTED',
                label: 'Promotion',
                key: 'PROMOTED',
            },
            {
                value: 'AP Computer Science A',
                label: 'AP Computer Science A',
                key: 'AP Computer Science A',
            },
            {
                value: 'AP Computer Science Principles',
                label: 'AP Computer Science Principles',
                key: 'AP Computer Science Principles',
            },
            {
                value: 'OCA',
                label: 'Java Programmer I Oracle Exam',
                key: 'OCA',
            },
        ];

        const verifyState = () => {
            const {studentId, accomplishment} = this.state;
            return studentId && accomplishment;
        };

        const graduateStudent = () => {
            const {studentId, accomplishment, allStudents} = this.state;
            this.setState({submitGraduationButtonDisabled: true});
            if (verifyState()) {
                if (
                    accomplishment === 'BOTH' ||
                    accomplishment === 'WRITTEN' ||
                    accomplishment === 'CODING' ||
                    accomplishment === 'PROMOTED'
                ) {
                    const scorePercentage = this.state.scorePercentage - (this.state.scorePercentage % 1);
                    //League Exam
                    let level = 0;
                    if (studentLevel === null) {
                        allStudents.forEach((s) => {
                            if (s.studentId === studentId) {
                                level = s.level;
                            }
                        });
                    } else {
                        level = studentLevel
                    }
                    if (accomplishment === 'PROMOTED') {
                        this.graduateStudent(studentId, level, accomplishment, -1);
                    } else {
                        this.graduateStudent(studentId, level, accomplishment, scorePercentage);
                    }
                    if (this.props.onSuccess) this.props.onSuccess();
                } else {
                    //AP or Oracle exam
                    if (accomplishment.startsWith('AP')) {
                        if (accomplishment === 'AP Computer Science A') {
                            GraduationService.sendApCompletion(
                                studentId,
                                'A',
                                scorePercentage
                            ).then((response) => {
                                this.setState({submitGraduationButtonDisabled: false});
                                if (response.status === 400) {
                                    errorNotification(
                                        `OOPS...`,
                                        `This student has already completed that test`
                                    );
                                } else {
                                    //this.props.fetchData();
                                    successNotification(
                                        'Congratulations!',
                                        `Keep up the good work.`
                                    );
                                }
                            });
                        } else if (accomplishment === 'AP Computer Science Principles') {
                            GraduationService.sendApCompletion(
                                studentId,
                                'PRINCIPLES',
                                scorePercentage
                            ).then((response) => {
                                this.setState({submitGraduationButtonDisabled: false});
                                if (response.status === 400) {
                                    errorNotification(
                                        `OOPS...`,
                                        `This student has already completed that test`
                                    );
                                } else {
                                    //this.props.fetchData();
                                    successNotification(
                                        'Congratulations!',
                                        `Keep up the good work.`
                                    );
                                }
                            });
                        }
                    } else if (accomplishment === 'OCA') {
                        GraduationService.sendOracleCompletion(studentId, scorePercentage).then(
                            (response) => {
                                this.setState({submitGraduationButtonDisabled: false});
                                if (response.status === 400) {
                                    errorNotification(
                                        `OOPS...`,
                                        `This student has a higher Oracle exam score already submitted`
                                    );
                                } else {
                                    //this.props.fetchData();
                                    successNotification(
                                        'Congratulations!',
                                        `Keep up the good work.`
                                    );
                                }
                            }
                        );
                    }
                }
            } else {
                this.setState({submitGraduationButtonDisabled: false});
                errorNotification('OOPS...', 'Please provide values for all fields');
            }
        };

        const getButtonText = () => {
            const {studentId, allStudents, accomplishment} = this.state;
            if (studentId) {
                if (accomplishment === 'AP Computer Science A') {
                    return 'Completed AP CS A';
                } else if (accomplishment === 'AP Computer Science Principles') {
                    return 'Completed AP CS   Principles';
                } else if (accomplishment === 'OCA') {
                    return 'Oracle Programmer I';
                } else {

                    let level = 0;
                    if (studentLevel === null) {
                        allStudents.forEach((s) => {
                            if (s.studentId === studentId) {
                                level = s.level;
                            }
                        });
                    } else {
                        level = studentLevel
                    }

                    if(accomplishment === 'WRITTEN' || accomplishment === 'CODING'){
                        const accomplishmentFormatted = accomplishment.substring(0,1) + accomplishment.substring(1).toLowerCase();
                        return 'Submit Level ' + level + " " + accomplishmentFormatted + " Exam";
                    }
                    else if(accomplishment === 'PROMOTED'){
                        return "Promote from Level " + level;
                    }
                    else{
                        return "Graduate Level " + level;
                    }

                }
            }
            return 'Please Complete All Fields';
        };

        return (
            <div style={formStyle}>
                <Select
                    showSearch
                    style={selectStyle}
                    placeholder='Student'
                    optionFilterProp='children'
                    onChange={(value) => {
                        this.setState({studentId: value, submitGraduationButtonDisabled: false});
                    }}
                    defaultValue={this.props.studentId}
                    value={this.state.studentId}
                    filterOption={selectFilter}
                >
                    {studentNameOptions.map((option) => {
                        return (
                            <Option value={option.value} key={option.value}>
                                {option.label}
                            </Option>
                        );
                    })}
                </Select>
                <br/>
                <Select
                    showSearch
                    style={selectStyle}
                    placeholder='Accomplishment'
                    defaultValue='Finished Exam'
                    optionFilterProp='children'
                    onChange={(value) => {
                        this.setState({disabledScorePercentageInput: value === 'PROMOTED'});
                        this.setState({accomplishment: value});
                        if (value.startsWith("AP")) {
                            this.setState({
                                scorePercentage: 5,
                                examScoreInputMaxValue: 5,
                                examScoreInputFormatter: value => value,
                                examScoreInputParser: value => value
                            });
                        }
                        else {
                            this.setState({
                                scorePercentage: 80,
                                examScoreInputMaxValue: 100,
                                examScoreInputFormatter: (value) => `${value}%`,
                                examScoreInputParser: (value) => value.replace('%', '')
                            });
                        }
                    }}
                    filterOption={selectFilter}
                >
                    {accomplishmentOptions.map((option) => {
                        return (
                            <Option value={option.value} key={option.value}>
                                {option.label}
                            </Option>
                        );
                    })}
                </Select>
                <br/>
                <label>Exam Score:</label>
                <InputNumber
                    autofocus
                    min={0}
                    max={this.state.examScoreInputMaxValue}
                    defaultValue={80}
                    style={inputStyle}
                    value={scorePercentage}
                    disabled={this.state.disabledScorePercentageInput}
                    onChange={(num) => {
                        this.setState({scorePercentage: num});
                    }}
                    formatter={this.state.examScoreInputFormatter}
                    parser={this.state.examScoreInputParser}
                />
                <br/>
                <div className='actionButton' style={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        ghost
                        onClick={graduateStudent}
                        type='primary'
                        shape='round'
                        icon={<UpCircleOutlined/>}
                        size={'large'}
                        disabled={this.state.submitGraduationButtonDisabled}
                    >
                        {getButtonText()}
                    </Button>
                </div>
            </div>
        );
    }
}

function selectFilter(input, option) {
    return option.props.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
}
