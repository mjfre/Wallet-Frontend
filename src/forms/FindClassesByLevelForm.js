import React, {useEffect} from 'react';
import '../App.css';

import {Select} from 'antd';
import ExamService from "../service/ExamService";
import {errorNotification} from "../components/Notification";

const {Option} = Select;

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

const formStyle = {display: 'flex', flexDirection: 'column', alignItems: 'center'};

export const FindClassesByLevelForm = (props) => {

    const fetchClassesByLevel = (level) => {
        ExamService.findClassesByStudentLevel(level)
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        props.setClasses(data);
                        // console.log(data);
                    })
                } else {
                    errorNotification("Error fetching classes")
                }
            })
    }

    useEffect(() => {
        fetchClassesByLevel(props.selectedLevel);
    }, [props.selectedLevel]);

    return (
        <div style={formStyle}>
            <div style={{flex: 1, width: '100%'}}>
                <p>Show classes that contain students in:</p>
                <Select
                    showSearch
                    style={selectStyle}
                    placeholder='Select a Level'
                    defaultValue='Level 0'
                    onChange={(value) => {
                        props.setSelectedLevel(value);
                        fetchClassesByLevel(value);
                    }}
                >
                    <Option default value="0">Level 0</Option>
                    <Option value="1">Level 1</Option>
                    <Option value="2">Level 2</Option>
                    <Option value="3">Level 3</Option>
                    <Option value="4">Level 4</Option>
                    <Option value="5">Level 5</Option>
                    <Option value="6">Level 6</Option>
                    <Option value="7">Level 7</Option>
                    <Option value="8">Level 8</Option>

                </Select>
            </div>
        </div>
    );
}
