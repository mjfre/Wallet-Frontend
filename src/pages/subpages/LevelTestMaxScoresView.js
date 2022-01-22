import React, {Component} from 'react';
import {Button, InputNumber} from 'antd';
import LevelTestMaxScoresService from "../../service/LevelTestMaxScoresService";
import Modal from "antd/lib/modal/Modal";
import GraduationService from '../../service/GraduationService';
import {errorNotification, successNotification} from '../../components/Notification';
import AdminSubcomponentTemplateNoMaintenanceContainer
    from "../../components/adminViewComponents/AdminSubcomponentTemplateNoMaintenanceContainer";

export default class LevelTestMaxScoresView extends Component {
    constructor(props) {
        super(props);

        this.state = {
            maxScores: [],
            newMaxScoreLevel: null,
            newWrittenTestMaxScore: null,
            newCodingTestMaxScore: null,
            modalOutputData: null,
            modalVisible: false
        };
    }

    fetchLevelTestMaxScores() {
        LevelTestMaxScoresService.fetchLevelTestMaxScores()
            .then((response) => response.json())
            .then((data) => {
                this.setState({maxScores: data});
            });
    }

    componentDidMount() {
        this.fetchLevelTestMaxScores();
    }

    render() {
        const {maxScores, newWrittenTestMaxScore, newCodingTestMaxScore } = this.state;

        //create tableStructure
        const columns = [
            {
                title: 'Level',
                dataIndex: 'level',
                key: 'level',
                defaultSortOrder: 'descend',
                sortOrder: 'descend',
                sorter: (a, b) => a.level < b.level,
            },
            {
                title: 'Max Written Score',
                dataIndex: 'maxWrittenScore',//TODO: should probably call points as to not confuse with %
                key: 'maxWrittenScore'
            },
            {
                title: 'Max Coding Score',
                dataIndex: 'maxCodingScore',
                key: 'maxCodingScore'
            },
            {
                dataIndex: 'actions',
                key: 'actions',
                render: (text, record, index) => {
                    const clickHandler = (e) => {
                        if (this.state.modalOutputData) {
                            this.setState({modalOutputData: null});
                        }
                        this.setState({modalInputData: record});
                        this.setState({modalVisible: true})
                    };

                    return <Button
                        ghost
                        type='primary'
                        size='small'
                        onClick={clickHandler}>Update</Button>;
                }
            }
        ];

        const getTitle = () => {
            if (this.state.modalInputData == null) {
                return "ERROR LINE 87 OF LEVEL TEST MAX..."; // modal was visible but modalInputData was not set
            }
            return "Update Points for Level " + this.state.modalInputData.level + " Tests";
        };

        return (
            <div>
                <AdminSubcomponentTemplateNoMaintenanceContainer
                    pageTitle={'Level Test Max Scores'}
                    tableStructure={columns}
                    tableRowKey={'level'}
                    tableData={maxScores}
                    emptyTableMessage={'No tests found'}
                />
                <Modal
                    title={getTitle()}
                    visible={this.state.modalVisible}
                    okText="Submit"
                    onCancel={() => {
                        this.setState({modalVisible: false})
                    }}
                    onOk={() => {
                        //submission
                        this.setState({modalVisible: false});
                        const {level} = this.state.modalInputData;
                        GraduationService
                            .setTestMaxScore(level, newWrittenTestMaxScore, newCodingTestMaxScore)
                            .then((response) => {
                                if (response.status === 200) {
                                    //all good
                                    successNotification(
                                        `Success`,
                                        `The max points for level ${level} have been updated`
                                    );
                                    this.fetchLevelTestMaxScores();
                                } else {
                                    //error
                                    errorNotification(
                                        `OOPS...`,
                                        `Updating failed for level ${level} tests`
                                    );
                                }
                            });
                        this.setState({
                            newWrittenTestMaxScore: null,
                            newCodingTestMaxScore: null
                        })
                    }}>
                    <div style={{display: "flex", alignItems: "center", flexDirection: "column"}}>
                        <span>Written Max Points:</span>
                        <InputNumber min={1} onChange={(value) => {
                            this.setState({newWrittenTestMaxScore: value});
                        }}/>
                        <br/>
                        <span>Coding Max Points:</span>
                        <InputNumber min={1} onChange={(value) => {
                            this.setState({newCodingTestMaxScore: value});
                        }}/>
                    </div>
                </Modal>
            </div>
        );
    }
}
