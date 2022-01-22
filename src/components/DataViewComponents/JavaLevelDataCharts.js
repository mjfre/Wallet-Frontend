import React, {Component} from 'react';
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    Pie,
    PieChart,
    Bar,
    BarChart

} from 'recharts';
import 'react-vis/dist/style.css';
import NoBottomPaddingChartContainer
    from "../../components/DataViewComponents/containers/NoBottomPaddingChartContainer";
import GraduationService from "../../service/GraduationService";
import OverflowChartContainer from "../../components/DataViewComponents/containers/OverflowChartContainer";
import {Button} from "antd";
import './style.css';

export default class JavaLevelDataCharts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            javaLevelData: [],
            graduationChartSelected: "lastMonth",
            deactivationChartSelected: "lastMonth",
            //this will cause only the chart which button is click to animate instead of both
            chartButtonClicked: null,
        };
    }

    fetchJavaLevelData() {
        GraduationService.fetchJavaLevelData()
            .then((response) => response.json())
            .then((data) => {
                this.setState({
                    javaLevelData: data
                });
            });
    }

    componentDidMount() {
        this.fetchJavaLevelData();
    }

    render() {
        const {
            javaLevelData,
            graduationChartSelected,
            deactivationChartSelected,
            chartButtonClicked
        } = this.state;


        //this prevents the pie charts from rendering improperly
        if (javaLevelData.length === 0) {
            return <div/>
        }


        const CustomPieChartsTooltip = ({active, payload, label}) => {
            if (active && payload && payload.length) {
                return (
                    <div style={{backgroundColor: 'white', padding: '1em', border: '1px solid grey'}}>
                        <span style={{fontWeight: 'bold'}}>{`${payload[0].name}`}</span><br/>
                        {`${payload[0].payload.percent}`}%<br/>
                        {`${payload[0].payload.value}`} students
                    </div>
                );
            }
            return null;
        };

        //JAVA AVERAGE LEVEL DURATION DATA

        const javaLevelDataColumns = [
            {
                name: 'Level 0',
                weeks: Math.round(javaLevelData[javaLevelData.length - 1].level0AverageDurationDays / 7 * 10) / 10,
                dataPoints: javaLevelData[javaLevelData.length - 1].level0DataPoints
            },
            {
                name: 'Level 1',
                weeks: Math.round(javaLevelData[javaLevelData.length - 1].level1AverageDurationDays / 7 * 10) / 10,
                dataPoints: javaLevelData[javaLevelData.length - 1].level1DataPoints
            },
            {
                name: 'Level 2',
                weeks: Math.round(javaLevelData[javaLevelData.length - 1].level2AverageDurationDays / 7 * 10) / 10,
                dataPoints: javaLevelData[javaLevelData.length - 1].level2DataPoints
            },
            {
                name: 'Level 3',
                weeks: Math.round(javaLevelData[javaLevelData.length - 1].level3AverageDurationDays / 7 * 10) / 10,
                dataPoints: javaLevelData[javaLevelData.length - 1].level3DataPoints
            },
            {
                name: 'Level 4',
                weeks: Math.round(javaLevelData[javaLevelData.length - 1].level4AverageDurationDays / 7 * 10) / 10,
                dataPoints: javaLevelData[javaLevelData.length - 1].level4DataPoints
            },
            {
                name: 'Level 5',
                weeks: Math.round(javaLevelData[javaLevelData.length - 1].level5AverageDurationDays / 7 * 10) / 10,
                dataPoints: javaLevelData[javaLevelData.length - 1].level5DataPoints
            },
            {
                name: 'Level 6',
                weeks: Math.round(javaLevelData[javaLevelData.length - 1].level6AverageDurationDays / 7 * 10) / 10,
                dataPoints: javaLevelData[javaLevelData.length - 1].level6DataPoints
            },
            {
                name: 'Level 7',
                weeks: Math.round(javaLevelData[javaLevelData.length - 1].level7AverageDurationDays / 7 * 10) / 10,
                dataPoints: javaLevelData[javaLevelData.length - 1].level7DataPoints
            }, {
                name: 'Level 8',
                weeks: Math.round(javaLevelData[javaLevelData.length - 1].level8AverageDurationDays / 7 * 10) / 10,
                dataPoints: javaLevelData[javaLevelData.length - 1].level8DataPoints
            },
        ];

        let totalAverageDurationYears = Math.round((javaLevelDataColumns[0].weeks + javaLevelDataColumns[1].weeks +
            javaLevelDataColumns[2].weeks + javaLevelDataColumns[3].weeks + javaLevelDataColumns[4].weeks +
            javaLevelDataColumns[5].weeks + javaLevelDataColumns[6].weeks + javaLevelDataColumns[7].weeks +
            javaLevelDataColumns[8].weeks) / 52 * 100) / 100;


        const maxValueOfLevelAverageY = Math.max(...javaLevelDataColumns.map(datum => datum.weeks));
        const levelAverageYDomain = [0, maxValueOfLevelAverageY + 5];

        const CustomLevelAverageBarChartToolTip = ({active, payload, label}) => {
            if (active && payload && payload.length) {
                return (
                    <div style={{backgroundColor: 'white', padding: '1em', border: '1px solid grey'}}>
                        <span style={{fontWeight: 'bold'}}>{`${payload[0].payload.name}`}</span><br/>
                        {`${payload[0].payload.weeks}`} weeks<br/>
                        {`${payload[0].payload.dataPoints}`} data points
                    </div>
                );
            }
            return null;
        };

        //JAVA LAST MONTH GRADUATION DATA
        const javaLastMonthGraduationsColumns = [
            {
                name: 'Level 0',
                value: javaLevelData[javaLevelData.length - 1].level0Graduations
            },
            {
                name: 'Level 1',
                value: javaLevelData[javaLevelData.length - 1].level1Graduations
            },
            {
                name: 'Level 2',
                value: javaLevelData[javaLevelData.length - 1].level2Graduations
            },
            {
                name: 'Level 3',
                value: javaLevelData[javaLevelData.length - 1].level3Graduations
            },
            {
                name: 'Level 4',
                value: javaLevelData[javaLevelData.length - 1].level4Graduations
            },
            {
                name: 'Level 5',
                value: javaLevelData[javaLevelData.length - 1].level5Graduations
            },
            {
                name: 'Level 6',
                value: javaLevelData[javaLevelData.length - 1].level6Graduations
            },
            {
                name: 'Level 7',
                value: javaLevelData[javaLevelData.length - 1].level7Graduations
            },
            {
                name: 'Level 8',
                value: javaLevelData[javaLevelData.length - 1].level8Graduations
            },

        ];

        let totalLastMonthGraduations = javaLastMonthGraduationsColumns[0].value + javaLastMonthGraduationsColumns[1].value +
            javaLastMonthGraduationsColumns[2].value + javaLastMonthGraduationsColumns[3].value + javaLastMonthGraduationsColumns[4].value +
            javaLastMonthGraduationsColumns[5].value + javaLastMonthGraduationsColumns[6].value + javaLastMonthGraduationsColumns[7].value +
            javaLastMonthGraduationsColumns[8].value;

        const javaLevelDataRecordedOnDate = new Date(javaLevelData[javaLevelData.length - 1].recordedOn);
        javaLevelDataRecordedOnDate.setMonth(javaLevelDataRecordedOnDate.getMonth());
        const javaLevelDataRecordedOnMonthName = javaLevelDataRecordedOnDate.toLocaleString('default', {month: 'long'});

        const CustomLastMonthGraduationBarChartToolTip = ({active, payload, label}) => {
            if (active && payload && payload.length) {
                return (
                    <div style={{backgroundColor: 'white', padding: '1em', border: '1px solid grey'}}>
                        <span style={{fontWeight: 'bold'}}>{`${payload[0].payload.name}`}</span><br/>
                        {`${payload[0].payload.value}`} graduations<br/>
                    </div>
                );
            }
            return null;
        };

        const CustomGraduationsByLevelLineChartToolTip = ({active, payload, label}) => {
            if (active && payload && payload.length) {
                return (
                    <div style={{backgroundColor: 'white', padding: '1em', border: '1px solid grey'}}>
                        <span style={{fontWeight: 'bold'}}>{`${payload[0].payload.recordedOn}`}</span><br/>
                        <span
                            style={{color: '#050505'}}>Level 0</span>: {`${payload[0].payload.level0Graduations}`}<br/>
                        <span
                            style={{color: '#945100'}}>Level 1</span>: {`${payload[0].payload.level1Graduations}`}<br/>
                        <span
                            style={{color: '#cb2309'}}>Level 2</span>: {`${payload[0].payload.level2Graduations}`}<br/>
                        <span
                            style={{color: '#e87e0f'}}>Level 3</span>: {`${payload[0].payload.level3Graduations}`}<br/>
                        <span
                            style={{color: '#e7ef00'}}>Level 4</span>: {`${payload[0].payload.level4Graduations}`}<br/>
                        <span
                            style={{color: '#008f00'}}>Level 5</span>: {`${payload[0].payload.level5Graduations}`}<br/>
                        <span
                            style={{color: '#005393'}}>Level 6</span>: {`${payload[0].payload.level6Graduations}`}<br/>
                        <span
                            style={{color: '#942192'}}>Level 7</span>: {`${payload[0].payload.level7Graduations}`}<br/>
                        <span
                            style={{color: '#f7b605'}}>Level 8</span>: {`${payload[0].payload.level8Graduations}`}<br/>
                    </div>
                );
            }
            return null;
        };

        const CustomDeactivationsByLevelLineChartToolTip = ({active, payload, label}) => {
            if (active && payload && payload.length) {
                return (
                    <div style={{
                        backgroundColor: 'white',
                        padding: '1em',
                        border: '1px solid grey',
                        zIndex: 2,
                        position: 'relative'
                    }}>
                        <span style={{fontWeight: 'bold'}}>{`${payload[0].payload.recordedOn}`}</span><br/>
                        <span
                            style={{color: '#050505'}}>Level 0</span>: {`${payload[0].payload.level0Deactivations}`}<br/>
                        <span
                            style={{color: '#945100'}}>Level 1</span>: {`${payload[0].payload.level1Deactivations}`}<br/>
                        <span
                            style={{color: '#cb2309'}}>Level 2</span>: {`${payload[0].payload.level2Deactivations}`}<br/>
                        <span
                            style={{color: '#e87e0f'}}>Level 3</span>: {`${payload[0].payload.level3Deactivations}`}<br/>
                        <span
                            style={{color: '#e7ef00'}}>Level 4</span>: {`${payload[0].payload.level4Deactivations}`}<br/>
                        <span
                            style={{color: '#008f00'}}>Level 5</span>: {`${payload[0].payload.level5Deactivations}`}<br/>
                        <span
                            style={{color: '#005393'}}>Level 6</span>: {`${payload[0].payload.level6Deactivations}`}<br/>
                        <span
                            style={{color: '#942192'}}>Level 7</span>: {`${payload[0].payload.level7Deactivations}`}<br/>
                        <span
                            style={{color: '#f7b605'}}>Level 8</span>: {`${payload[0].payload.level8Deactivations}`}<br/>
                    </div>
                );
            }
            return null;
        };


        const GraduationChart = () => {
            if (graduationChartSelected === 'lastMonth') {
                return <div>
                    <h1 className='chartHeadingStyle'>{javaLevelDataRecordedOnMonthName} Graduations</h1>
                    <NoBottomPaddingChartContainer>
                        <ResponsiveContainer width="99%" aspect={4}>
                            <BarChart
                                width={500}
                                height={500}
                                data={javaLastMonthGraduationsColumns}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis scale='linear'/>
                                <Tooltip content={CustomLastMonthGraduationBarChartToolTip}/>
                                <Legend/>
                                <Bar dataKey="value" fill="#8884d8" legendType='none' isAnimationActive={chartButtonClicked==='graduation'}/>
                            </BarChart>
                        </ResponsiveContainer>
                        <span style={{
                            float: 'left',
                            fontSize: '.7em',
                            color: '#707070',
                            paddingTop: '2.5em',
                            paddingBottom: '.5em'
                        }}>Total Graduations in {javaLevelDataRecordedOnMonthName}: {totalLastMonthGraduations}</span>
                        <span style={{
                            float: 'right',
                            fontSize: '.7em',
                            color: '#707070',
                            paddingTop: '1.5em',
                            paddingBottom: '1em'
                        }}>
                            <Button
                                ghost
                                type="solid"
                                shape="round"
                                size={'small'}
                                style={{borderColor: "black", color: 'black'}}
                                onClick={() => {
                                }}>
                            Last Month
                             </Button>
                             <Button
                                 ghost
                                 type="dashed"
                                 shape="round"
                                 size={'small'}
                                 style={{borderColor: "#949191", color: '#949191'}}
                                 onClick={() => {
                                     this.setState({
                                         graduationChartSelected: 'historical',
                                         chartButtonClicked: 'graduation'
                                     })
                                 }}>
                            Historical
                             </Button>
                        </span>
                    </NoBottomPaddingChartContainer>
                </div>
            } else {
                return <div>
                    <h1 className='chartHeadingStyle'>Graduations by Level</h1>
                    <OverflowChartContainer>
                        <ResponsiveContainer width="99%" aspect={4}>
                            <LineChart
                                width={500}
                                height={300}
                                data={javaLevelData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 30,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis
                                    dataKey="recordedOn"
                                    angle={-30}
                                    textAnchor="end"
                                    style={{padding: '50px'}}
                                    label={{}}
                                />
                                <YAxis scale='linear'/>
                                <Tooltip content={CustomGraduationsByLevelLineChartToolTip}/>
                                <Legend/>
                                <Line type="monotone" dataKey="level0Graduations" stroke="#050505" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='graduation'}/>
                                <Line type="monotone" dataKey="level1Graduations" stroke="#945100" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='graduation'}/>
                                <Line type="monotone" dataKey="level2Graduations" stroke="#cb2309" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='graduation'}/>
                                <Line type="monotone" dataKey="level3Graduations" stroke="#e87e0f" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='graduation'}/>
                                <Line type="monotone" dataKey="level4Graduations" stroke="#e7ef00" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='graduation'}/>
                                <Line type="monotone" dataKey="level5Graduations" stroke="#008f00" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='graduation'}/>
                                <Line type="monotone" dataKey="level6Graduations" stroke="#005393" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='graduation'}/>
                                <Line type="monotone" dataKey="level7Graduations" stroke="#942192" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='graduation'}/>
                                <Line type="monotone" dataKey="level8Graduations" stroke="#f7b605" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='graduation'}/>
                            </LineChart>
                        </ResponsiveContainer>
                        <span style={{
                            float: 'right',
                            fontSize: '.7em',
                            color: '#707070',
                            paddingTop: '1.5em',
                            zIndex: 1, position: 'relative'
                        }}>
                            <Button
                                ghost
                                type="dashed"
                                shape="round"
                                size={'small'}
                                style={{borderColor: "#949191", color: '#949191', zIndex: 1, position: 'relative'}}
                                onClick={() => {
                                    this.setState({
                                        graduationChartSelected: 'lastMonth',
                                        chartButtonClicked: 'graduation'
                                    })
                                }}>
                                Last Month
                            </Button>
                            <Button
                                ghost
                                type="solid"
                                shape="round"
                                size={'small'}
                                style={{borderColor: "black", color: 'black'}}
                                onClick={() => {
                                }}>
                            Historical
                             </Button>
                        </span>
                        <div style={{clear: "both"}}/>
                    </OverflowChartContainer>
                </div>
            }
        }


        //LAST MONTH DEACTIVATION

        //JAVA LAST MONTH GRADUATION DATA
        const javaLastMonthDeactivationsColumns = [
            {
                name: 'Level 0',
                value: javaLevelData[javaLevelData.length - 1].level0Deactivations
            },
            {
                name: 'Level 1',
                value: javaLevelData[javaLevelData.length - 1].level1Deactivations
            },
            {
                name: 'Level 2',
                value: javaLevelData[javaLevelData.length - 1].level2Deactivations
            },
            {
                name: 'Level 3',
                value: javaLevelData[javaLevelData.length - 1].level3Deactivations
            },
            {
                name: 'Level 4',
                value: javaLevelData[javaLevelData.length - 1].level4Deactivations
            },
            {
                name: 'Level 5',
                value: javaLevelData[javaLevelData.length - 1].level5Deactivations
            },
            {
                name: 'Level 6',
                value: javaLevelData[javaLevelData.length - 1].level6Deactivations
            },
            {
                name: 'Level 7',
                value: javaLevelData[javaLevelData.length - 1].level7Deactivations
            },
            {
                name: 'Level 8',
                value: javaLevelData[javaLevelData.length - 1].level8Deactivations
            },

        ];

        let totalLastMonthDeactivations = javaLastMonthDeactivationsColumns[0].value + javaLastMonthDeactivationsColumns[1].value +
            javaLastMonthDeactivationsColumns[2].value + javaLastMonthDeactivationsColumns[3].value + javaLastMonthDeactivationsColumns[4].value +
            javaLastMonthDeactivationsColumns[5].value + javaLastMonthDeactivationsColumns[6].value + javaLastMonthDeactivationsColumns[7].value +
            javaLastMonthDeactivationsColumns[8].value;


        const CustomLastMonthDeactivationsBarChartToolTip = ({active, payload, label}) => {
            if (active && payload && payload.length) {
                return (
                    <div style={{backgroundColor: 'white', padding: '1em', border: '1px solid grey'}}>
                        <span style={{fontWeight: 'bold'}}>{`${payload[0].payload.name}`}</span><br/>
                        {`${payload[0].payload.value}`} deactivations<br/>
                    </div>
                );
            }
            return null;
        };

        //6 month deactivations pie chart

        //index represents level number
        let deactivationCount = [0, 0, 0, 0, 0, 0, 0, 0, 0];
        //get the last six months of deactivation data if they exist
        for (let i = javaLevelData.length - 1; i >= 0 && i >= javaLevelData.length - 6; i--) {
            deactivationCount[0] += javaLevelData[i].level0Deactivations;
            deactivationCount[1] += javaLevelData[i].level1Deactivations;
            deactivationCount[2] += javaLevelData[i].level2Deactivations;
            deactivationCount[3] += javaLevelData[i].level3Deactivations;
            deactivationCount[4] += javaLevelData[i].level4Deactivations;
            deactivationCount[5] += javaLevelData[i].level5Deactivations;
            deactivationCount[6] += javaLevelData[i].level6Deactivations;
            deactivationCount[7] += javaLevelData[i].level7Deactivations;
            deactivationCount[8] += javaLevelData[i].level8Deactivations;
        }

        const totalSixMonthDeactivations = deactivationCount.reduce((accumulator, currentValue) => accumulator + currentValue);


        const sixMonthDeaPieChartData = [
            {
                name: 'Level 0',
                value: deactivationCount[0],
                percent: Math.round((deactivationCount[0] / totalSixMonthDeactivations) * 10000) / 100
            },
            {
                name: 'Level 1',
                value: deactivationCount[1],
                percent: Math.round((deactivationCount[1] / totalSixMonthDeactivations) * 10000) / 100
            },
            {
                name: 'Level 2',
                value: deactivationCount[2],
                percent: Math.round((deactivationCount[2] / totalSixMonthDeactivations) * 10000) / 100
            },
            {
                name: 'Level 3',
                value: deactivationCount[3],
                percent: Math.round((deactivationCount[3] / totalSixMonthDeactivations) * 10000) / 100
            },
            {
                name: 'Level 4',
                value: deactivationCount[4],
                percent: Math.round((deactivationCount[4] / totalSixMonthDeactivations) * 10000) / 100
            },
            {
                name: 'Level 5',
                value: deactivationCount[5],
                percent: Math.round((deactivationCount[5] / totalSixMonthDeactivations) * 10000) / 100
            },
            {
                name: 'Level 6',
                value: deactivationCount[6],
                percent: Math.round((deactivationCount[6] / totalSixMonthDeactivations) * 10000) / 100
            },
            {
                name: 'Level 7',
                value: deactivationCount[7],
                percent: Math.round((deactivationCount[7] / totalSixMonthDeactivations) * 10000) / 100
            },
            {
                name: 'Level 8',
                value: deactivationCount[8],
                percent: Math.round((deactivationCount[8] / totalSixMonthDeactivations) * 10000) / 100
            }
        ]

        const DeactivationChart = () => {
            if (deactivationChartSelected === "lastMonth") {
                return <div>
                    <h1 className='chartHeadingStyle'>{javaLevelDataRecordedOnMonthName} Deactivations</h1>
                    <NoBottomPaddingChartContainer>
                        <ResponsiveContainer width="99%" aspect={4}>
                            <BarChart
                                width={500}
                                height={500}
                                data={javaLastMonthDeactivationsColumns}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 5,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis dataKey="name"/>
                                <YAxis scale='linear'/>
                                <Tooltip content={CustomLastMonthDeactivationsBarChartToolTip}/>
                                <Legend/>
                                <Bar dataKey="value" fill="#8884d8" legendType='none' isAnimationActive={chartButtonClicked==='deactivation'}/>
                            </BarChart>
                        </ResponsiveContainer>

                        <span style={{
                            float: 'left',
                            fontSize: '.7em',
                            color: '#707070',
                            paddingTop: '2em',
                            paddingBottom: 0
                        }}>Total Deactivations in {javaLevelDataRecordedOnMonthName}: {totalLastMonthDeactivations}
                        </span>
                        <span style={{
                            float: 'right',
                            fontSize: '.7em',
                            color: '#707070',
                            paddingTop: '1.5em',
                            paddingBottom: '1em'
                        }}>
                             <Button
                                 ghost
                                 type="solid"
                                 shape="round"
                                 size={'small'}
                                 style={{borderColor: "black", color: 'black'}}
                                 onClick={() => {
                                 }}>
                            Last Month
                             </Button>

                             <Button
                                 ghost
                                 type="dashed"
                                 shape="round"
                                 size={'small'}
                                 style={{borderColor: "#949191", color: '#949191'}}
                                 onClick={() => {
                                     this.setState({
                                         deactivationChartSelected: 'sixMonth',
                                         chartButtonClicked: 'deactivation'
                                     })
                                 }}>
                            Six-Month
                             </Button>

                             <Button
                                 ghost
                                 type="dashed"
                                 shape="round"
                                 size={'small'}
                                 style={{borderColor: "#949191", color: '#949191'}}
                                 onClick={() => {
                                     this.setState({
                                         deactivationChartSelected: 'historical',
                                         chartButtonClicked: 'deactivation'
                                     })
                                 }}>
                            Historical
                             </Button>
                        </span>
                    </NoBottomPaddingChartContainer>
                </div>
            } else if (deactivationChartSelected === "sixMonth") {
                return <div>
                    <h1 className='chartHeadingStyle'>Six-Month Level Deactivations</h1>
                    <div style={{minHeight: '500px'}}>
                        <NoBottomPaddingChartContainer>
                            <ResponsiveContainer width="99%" aspect={4}>
                                <PieChart width={500} height={500}>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={chartButtonClicked==='deactivation'}
                                        data={sixMonthDeaPieChartData}
                                        cx='50%'
                                        cy='50%'
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label={(entry) => entry.name}
                                    />
                                    <Tooltip content={<CustomPieChartsTooltip/>}/>
                                </PieChart>
                            </ResponsiveContainer>
                            <span style={{
                                float: 'right',
                                fontSize: '.7em',
                                color: '#707070',
                                paddingTop: '1.5em',
                                paddingBottom: '1em'
                            }}>
                             <Button
                                 ghost
                                 type="dashed"
                                 shape="round"
                                 size={'small'}
                                 style={{borderColor: "#949191", color: '#949191'}}
                                 onClick={() => {
                                     this.setState({
                                         deactivationChartSelected: 'lastMonth',
                                         chartButtonClicked: 'deactivation'
                                     })
                                 }}>
                            Last Month
                             </Button>

                             <Button
                                 ghost
                                 type="solid"
                                 shape="round"
                                 size={'small'}
                                 style={{borderColor: "black", color: 'black'}}
                                 onClick={() => {
                                 }}>
                            Six-Month
                             </Button>

                             <Button
                                 ghost
                                 type="dashed"
                                 shape="round"
                                 size={'small'}
                                 style={{borderColor: "#949191", color: '#949191'}}
                                 onClick={() => {
                                     this.setState({
                                         deactivationChartSelected: 'historical',
                                         chartButtonClicked: 'deactivation'
                                     })
                                 }}>
                            Historical
                             </Button>
                        </span>
                        </NoBottomPaddingChartContainer>
                    </div>
                </div>
            } else if (deactivationChartSelected === "historical") {
                return <div>
                    <h1 className='chartHeadingStyle'>Deactivations by Level</h1>
                    <OverflowChartContainer>
                        <ResponsiveContainer width="99%" aspect={4}>
                            <LineChart
                                width={500}
                                height={300}
                                data={javaLevelData}
                                margin={{
                                    top: 5,
                                    right: 30,
                                    left: 20,
                                    bottom: 30,
                                }}
                            >
                                <CartesianGrid strokeDasharray="3 3"/>
                                <XAxis
                                    dataKey="recordedOn"
                                    angle={-30}
                                    textAnchor="end"
                                    style={{padding: '50px'}}
                                    label={{}}
                                />
                                <YAxis scale='linear'/>
                                <Tooltip content={CustomDeactivationsByLevelLineChartToolTip}/>
                                <Legend/>
                                <Line type="monotone" dataKey="level0Deactivations" stroke="#050505" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='deactivation'}/>
                                <Line type="monotone" dataKey="level1Deactivations" stroke="#945100" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='deactivation'}/>
                                <Line type="monotone" dataKey="level2Deactivations" stroke="#cb2309" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='deactivation'}/>
                                <Line type="monotone" dataKey="level3Deactivations" stroke="#e87e0f" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='deactivation'}/>
                                <Line type="monotone" dataKey="level4Deactivations" stroke="#e7ef00" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='deactivation'}/>
                                <Line type="monotone" dataKey="level5Deactivations" stroke="#008f00" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='deactivation'}/>
                                <Line type="monotone" dataKey="level6Deactivations" stroke="#005393" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='deactivation'}/>
                                <Line type="monotone" dataKey="level7Deactivations" stroke="#942192" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='deactivation'}/>
                                <Line type="monotone" dataKey="level8Deactivations" stroke="#f7b605" activeDot={{r: 8}}
                                      legendType='none' isAnimationActive={chartButtonClicked==='deactivation'}/>
                            </LineChart>
                        </ResponsiveContainer>
                        <span style={{
                            float: 'right',
                            fontSize: '.7em',
                            color: '#707070',
                            paddingTop: '1.5em',
                            zIndex: 1,
                            position: 'relative'
                        }}>
                             <Button
                                 ghost
                                 type="dashed"
                                 shape="round"
                                 size={'small'}
                                 style={{borderColor: "#949191", color: '#949191'}}
                                 onClick={() => {
                                     this.setState({
                                         deactivationChartSelected: 'lastMonth',
                                         chartButtonClicked: 'deactivation'
                                     })
                                 }}>
                            Last Month
                             </Button>

                             <Button
                                 ghost
                                 type="dashed"
                                 shape="round"
                                 size={'small'}
                                 style={{borderColor: "#949191", color: '#949191'}}
                                 onClick={() => {
                                     this.setState({
                                         deactivationChartSelected: 'sixMonth',
                                         chartButtonClicked: 'deactivation'
                                     })
                                 }}>
                            Six-Month
                             </Button>

                             <Button
                                 ghost
                                 type="solid"
                                 shape="round"
                                 size={'small'}
                                 style={{borderColor: "black", color: 'black'}}
                                 onClick={() => {
                                 }}>
                            Historical
                             </Button>
                        </span>
                        <div style={{clear: 'both'}}/>
                    </OverflowChartContainer>
                </div>
            }
        }

        return (
            <div style={{
                width: '95%',
                textAlign: 'center',
                padding: '2em 5em 5em',
                paddingTop: '0em',
                margin: '2.5em auto 2em'
            }}>
                <h1 className='chartHeadingStyle'>Average Level Duration</h1>
                <NoBottomPaddingChartContainer>
                    <ResponsiveContainer width="99%" aspect={4}>
                        <BarChart
                            width={500}
                            height={500}
                            data={javaLevelDataColumns}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 5,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3"/>
                            <XAxis dataKey="name"/>
                            <YAxis domain={levelAverageYDomain} scale='linear'/>
                            <Tooltip content={CustomLevelAverageBarChartToolTip}/>
                            <Legend/>
                            <Bar dataKey="weeks" fill="#8884d8" legendType='none'/>
                        </BarChart>
                    </ResponsiveContainer>
                    <span style={{
                        float: 'left',
                        fontSize: '.7em',
                        color: '#707070',
                        paddingTop: '2em',
                        paddingBottom: '1em'
                    }}>Total Average Duration: {totalAverageDurationYears} years</span>
                </NoBottomPaddingChartContainer>
                <GraduationChart/>
                <DeactivationChart/>
            </div>
        )
    }
}
