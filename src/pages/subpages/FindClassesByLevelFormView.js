import React, {useState} from 'react';
import '../../App.css';
import {FindClassesByLevelForm} from "../../forms/FindClassesByLevelForm";
import {Button, Table} from "antd";

const containerStyle = {
    width: '95%',
    margin: '2.5em auto',
    textAlign: 'center',
    padding: '2.5em',
    paddingTop: '4em',
    paddingBottom: '4em',
    marginTop: '0',
    background: '#fffef6',
    overflow: 'hidden',
    border: '10px solid #041e38',
    borderRadius: '0px',
    boxShadow: '10px 10px 1em #888888',

};

const titleStyle = {
    fontSize: '1.25em',
    width: '95%',
    margin: '0 auto',
    textAlign: 'center',
    padding: '0',
    paddingTop: '.5em',
    paddingLeft: '1em',
    paddingBottom: '0',
    background: '#041e38',
    overflow: 'hidden',
    border: '3px solid #041e38',
    borderBottom: '0',
    borderRadius: '10px 10px 0 0',
    boxShadow: '10px 10px 1em #888888',
}

const mainContainerStyle = {
    width: '95%',
    margin: '2.5em auto',
    textAlign: 'center',
    padding: '2.5em 5em 5em',
    marginTop: '1.5em'
};

export const FindClassesByLevelFormView = (props) => {

    const [selectedLevel, setSelectedLevel] = useState(() => 0);
    const [classes, setClasses] = useState(() => null);

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

    const classesColumns = [
        {
            title: 'Class Name',
            dataIndex: 'className',
        },
        {
            title: 'Start At',
            dataIndex: 'classStartAt',
            render: (text, record) => {
                return <span>{dateRecordToFormattedStringDayOfWeek(record.classStartAt)}</span>
            }
        },
        {
            title: 'Student Levels',
            dataIndex: 'studentLevels',
            render: (text, record) => {
                if (record.studentLevels !== undefined) {
                    return record.studentLevels.sort().map((studentLevel, index) => {
                        if(index < record.studentLevels.length - 1) {
                            return <span>{studentLevel},</span>
                        }
                        else{
                            return <span>{studentLevel}</span>
                        }
                    })
                } else {
                    return null;
                }
            }
        },
        {
            title: '',
            key: 'actions',
            render: (text, record) => (
                <div>
                    <Button ghost type='primary' size='medium' shape='round'
                            onClick={(e) => window.open('https://jtl.pike13.com/desk/events/' + record.eventId)}>view
                        class</Button>
                </div>
            ),
        },
    ];

    return (
        <div style={mainContainerStyle}>
            <div style={titleStyle}>
                <h1 style={{color: 'white'}}>Find Classes by Student Level</h1>
            </div>
            <div style={{overflow: 'hidden'}}>
                <div style={containerStyle}>
                    <FindClassesByLevelForm
                        selectedLevel={selectedLevel}
                        setSelectedLevel={setSelectedLevel}
                        setClasses={setClasses}
                    />
                </div>
            </div>
            <div style={{
                width: '100%',
                margin: '0 auto',
                textAlign: 'center',
                padding: '0em',
                background: '#dedede',
                boxShadow: '10px 10px 2em #888888',
                border: '.5em black',
                marginTop: '2.5em'
            }}>
                <Table
                    id='table'
                    style={{width: '100%'}}
                    dataSource={classes}
                    columns={classesColumns}
                    pagination={{pageSizeOptions: ['10', '500'], showSizeChanger: true}}
                    scroll={{x: 100, y: 1000}}
                    rowKey={record => (record.className + " " + record.classStartAt)}
                />
            </div>
        </div>
    )
}

