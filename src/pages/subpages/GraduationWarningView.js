import React, {useEffect, useState} from "react";
import MaintenanceViewTemplate from "../../components/adminViewComponents/subComponents/MaintenanceViewTemplate";
import AdminSubcomponentTemplate from "../../components/adminViewComponents/AdminSubcomponentTemplate";
import {errorNotification} from "../../components/Notification";
import StudentService from "../../service/StudentService";
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

export const GraduationWarningView = (props) => {

    const [studentWithGraduationWarnings, setStudentWithGraduationWarnings] = useState(() => null);

    useEffect(() => {
        StudentService.fetchStudentGraduationWarningData()
            .then(response => {
                if (response.status === 200) {
                    response.json().then(data => {
                        setStudentWithGraduationWarnings(data);
                    })
                } else {
                    errorNotification("Error fetching students with graduation warnings")
                }
            })
    }, []);

    const getNameColumnProps = () => ({
        render: (text, record) => {
            const StudentBadge = () => {
                switch (record.studentLevel) {
                    case 0:
                        return <img src={Level0Emblem} alt="League Level 0 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 1:
                        return <img src={Level1Emblem} alt="League Level 1 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 2:
                        return <img src={Level2Emblem} alt="League Level 2 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 3:
                        return <img src={Level3Emblem} alt="League Level 3 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 4:
                        return <img src={Level4Emblem} alt="League Level 4 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 5:
                        return <img src={Level5Emblem} alt="League Level 5 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 6:
                        return <img src={Level6Emblem} alt="League Level 6 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 7:
                        return <img src={Level7Emblem} alt="League Level 7 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 8:
                        return <img src={Level8Emblem} alt="League Level 8 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    case 9:
                        return <img src={Level9Emblem} alt="League Level 8 Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                    default:
                        return <img src={LevelUnknownEmblem} alt="League Level Unknown Emblem"
                                    style={{height: '2.75em', padding: '.25em', marginRight: '2em'}}/>
                }

            };
            return (
                <div>
                    <StudentBadge/>
                    <span>{record.studentFullName}</span>
                </div>
            );
        },
    });

    //create tableStructure
    const graduationWarningColumns = [
        {
            dataIndex: 'studentFullName',
            ...getNameColumnProps(),
        },
        {
            title: 'Last Module Committed To',
            dataIndex: 'mostRecentModuleRepositoryName',
        },
        {
            title: 'Teachers',
            dataIndex: 'teachersForStudent',
            render: (text, record) => {
                return record.teachersForStudent.map((teacher)=>{
                    return <span style={{width:'100%'}}>{teacher.firstName} {teacher.lastName}</span>
                })
            }
        }
    ];

    //create infoCard
    const graduationWarningMaintenanceViewInfoCard = (
        studentWithGraduationWarnings !== null ? <span>
                <h1>There are {studentWithGraduationWarnings.length} graduation warnings</h1>
            </span>
    : <span></span>
    );

    const graduationWarningButtonsLeftSide = (
        <span>
        </span>
    );

    const graduationWarningButtonsRightSide = (
        <span>
            </span>
    );

    const graduationWarningMaintenanceView =
        <MaintenanceViewTemplate
            title={"Graduation Warnings"}
            infoCard={graduationWarningMaintenanceViewInfoCard}
            buttonsLeftSide={graduationWarningButtonsLeftSide}
            buttonsRightSide={graduationWarningButtonsRightSide}
            onSuccess={null}
        />

    return <AdminSubcomponentTemplate
        tableStructure={graduationWarningColumns}
        tableRowKey={'studentId'}
        tableData={studentWithGraduationWarnings}
        emptyTableMessage={"No graduation warnings found"}
        subcomponentMaintenanceView={graduationWarningMaintenanceView}
    />
}
