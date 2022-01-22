import React, {Component} from 'react';
import StudentService from "../../service/StudentService";
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
} from 'recharts';
import 'react-vis/dist/style.css';
import {LoadingOutlined} from "@ant-design/icons";
import './style.css';
import StudentTotalLineChartContainer from "./containers/StudentTotalLineChartContainer";

export default class StudentTotalDataCharts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            studentTotals: [],
            selectedStudentTotalIndex: null,
            chartAnimated: true,
            chartRecordedOn: null,
        };
    }

    fetchStudentTotals() {
        StudentService.fetchStudentTotalData()
            .then((response) => response.json())
            .then((data) => {
                if(data.length>0) {
                    this.setState({
                        studentTotals: data,
                        selectedStudentTotalIndex: data.length - 1,
                        chartRecordedOn: data[data.length - 1].recordedOn
                    });
                }
            });
    }

    componentDidMount() {
        this.fetchStudentTotals();
    }

    render() {
        const {
            studentTotals,
            selectedStudentTotalIndex,
            chartAnimated,
            chartRecordedOn,
        } = this.state;

        let genderPieChartData;
        let agePieChartData;
        let levelPieChartData;

        //this prevents the pie charts from rendering improperly
        if (studentTotals.length === 0) {
            return <div style={{margin: '0 auto', textAlign: 'center', marginTop: '25%'}}><LoadingOutlined
                style={{fontSize: '5em'}}/></div>
        }

        let studentTotalYDomain;

        if (studentTotals.length > 0) {

            const maxValueOfStudentTotalY = Math.max(...studentTotals.map(studentTotal => studentTotal.studentTotal));
            const minValueOfStudentTotalY = Math.min(...studentTotals.map(studentTotal => studentTotal.studentTotal));
            studentTotalYDomain=  [minValueOfStudentTotalY - 10, maxValueOfStudentTotalY + 10];

            genderPieChartData = [
                {
                    name: 'male',
                    value: studentTotals[selectedStudentTotalIndex].maleStudentTotal,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].maleStudentTotal / (studentTotals[selectedStudentTotalIndex].maleStudentTotal + studentTotals[selectedStudentTotalIndex].femaleStudentTotal)) * 10000) / 100
                },
                {
                    name: 'female',
                    value: studentTotals[selectedStudentTotalIndex].femaleStudentTotal,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].femaleStudentTotal / (studentTotals[selectedStudentTotalIndex].maleStudentTotal + studentTotals[selectedStudentTotalIndex].femaleStudentTotal)) * 10000) / 100
                },
            ];

            const totalAgeResponses = studentTotals[selectedStudentTotalIndex].ageLessThan10Total +
                studentTotals[selectedStudentTotalIndex].age10Total + studentTotals[selectedStudentTotalIndex].age11Total +
                studentTotals[selectedStudentTotalIndex].age12Total + studentTotals[selectedStudentTotalIndex].age13Total +
                studentTotals[selectedStudentTotalIndex].age14Total + studentTotals[selectedStudentTotalIndex].age15Total +
                studentTotals[selectedStudentTotalIndex].age16Total + studentTotals[selectedStudentTotalIndex].age17Total +
                studentTotals[selectedStudentTotalIndex].age18Total + studentTotals[selectedStudentTotalIndex].age19Total +
                studentTotals[selectedStudentTotalIndex].ageGreaterThan19Total;

            agePieChartData = [
                {
                    name: 'age <10',
                    value: studentTotals[selectedStudentTotalIndex].ageLessThan10Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].ageLessThan10Total / totalAgeResponses) * 10000) / 100
                },
                {
                    name: 'age 10',
                    value: studentTotals[selectedStudentTotalIndex].age10Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].age10Total / totalAgeResponses) * 10000) / 100
                },
                {
                    name: 'age 11',
                    value: studentTotals[selectedStudentTotalIndex].age11Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].age11Total / totalAgeResponses) * 10000) / 100
                },
                {
                    name: 'age 12',
                    value: studentTotals[selectedStudentTotalIndex].age12Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].age12Total / totalAgeResponses) * 10000) / 100
                },
                {
                    name: 'age 13',
                    value: studentTotals[selectedStudentTotalIndex].age13Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].age13Total / totalAgeResponses) * 10000) / 100
                },
                {
                    name: 'age 14',
                    value: studentTotals[selectedStudentTotalIndex].age14Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].age14Total / totalAgeResponses) * 10000) / 100
                },
                {
                    name: 'age 15',
                    value: studentTotals[selectedStudentTotalIndex].age15Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].age15Total / totalAgeResponses) * 10000) / 100
                },
                {
                    name: 'age 16',
                    value: studentTotals[selectedStudentTotalIndex].age16Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].age16Total / totalAgeResponses) * 10000) / 100
                },
                {
                    name: 'age 17',
                    value: studentTotals[selectedStudentTotalIndex].age17Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].age17Total / totalAgeResponses) * 10000) / 100
                },
                {
                    name: 'age 18',
                    value: studentTotals[selectedStudentTotalIndex].age18Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].age18Total / totalAgeResponses) * 10000) / 100
                },
                {
                    name: 'age 19',
                    value: studentTotals[selectedStudentTotalIndex].age19Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].age19Total / totalAgeResponses) * 10000) / 100
                },
                {
                    name: 'age >19',
                    value: studentTotals[selectedStudentTotalIndex].ageGreaterThan19Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].ageGreaterThan19Total / totalAgeResponses) * 10000) / 100
                },
            ]

            agePieChartData = agePieChartData.filter(ageData => ageData.value !== 0);

            const totalLevelResponses = studentTotals[selectedStudentTotalIndex].javaLevel0Total +
                studentTotals[selectedStudentTotalIndex].javaLevel1Total + studentTotals[selectedStudentTotalIndex].javaLevel2Total +
                studentTotals[selectedStudentTotalIndex].javaLevel3Total + studentTotals[selectedStudentTotalIndex].javaLevel4Total +
                studentTotals[selectedStudentTotalIndex].javaLevel5Total + studentTotals[selectedStudentTotalIndex].javaLevel6Total +
                studentTotals[selectedStudentTotalIndex].javaLevel7Total + studentTotals[selectedStudentTotalIndex].javaLevel8Total;

            levelPieChartData = [
                {
                    name: 'Level 0',
                    value: studentTotals[selectedStudentTotalIndex].javaLevel0Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].javaLevel0Total / totalLevelResponses) * 10000) / 100
                },
                {
                    name: 'Level 1',
                    value: studentTotals[selectedStudentTotalIndex].javaLevel1Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].javaLevel1Total / totalLevelResponses) * 10000) / 100
                },
                {
                    name: 'Level 2',
                    value: studentTotals[selectedStudentTotalIndex].javaLevel2Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].javaLevel2Total / totalLevelResponses) * 10000) / 100
                },
                {
                    name: 'Level 3',
                    value: studentTotals[selectedStudentTotalIndex].javaLevel3Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].javaLevel3Total / totalLevelResponses) * 10000) / 100
                },
                {
                    name: 'Level 4',
                    value: studentTotals[selectedStudentTotalIndex].javaLevel4Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].javaLevel4Total / totalLevelResponses) * 10000) / 100
                },
                {
                    name: 'Level 5',
                    value: studentTotals[selectedStudentTotalIndex].javaLevel5Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].javaLevel5Total / totalLevelResponses) * 10000) / 100
                },
                {
                    name: 'Level 6',
                    value: studentTotals[selectedStudentTotalIndex].javaLevel6Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].javaLevel6Total / totalLevelResponses) * 10000) / 100
                },
                {
                    name: 'Level 7',
                    value: studentTotals[selectedStudentTotalIndex].javaLevel7Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].javaLevel7Total / totalLevelResponses) * 10000) / 100
                },
                {
                    name: 'Level 8',
                    value: studentTotals[selectedStudentTotalIndex].javaLevel8Total,
                    percent: Math.round((studentTotals[selectedStudentTotalIndex].javaLevel8Total / totalLevelResponses) * 10000) / 100
                },
            ]
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

        const CustomStudentTotalLineChartToolTip = ({active, payload, label}) => {
            if (active && payload && payload.length) {
                return (
                    <div style={{backgroundColor: 'white', padding: '1em', border: '1px solid grey'}}>
                        <span style={{fontWeight: 'bold'}}>{`${payload[0].payload.recordedOn}`}</span><br/>
                        {`${payload[0].payload.studentTotal}`} students<br/>
                        {/*<span style={{fontWeight: 'bold'}}>previous week change:</span><br/>*/}
                        {/*{`${payload[0].payload.studentsAddedThisWeek}`} added<br/>*/}
                        {/*{`${payload[0].payload.studentsDeactivatedThisWeek}`} deactivated*/}
                    </div>
                );
            }
            return null;
        };

        return (
            <div style={{
                width: '95%',
                textAlign: 'center',
                padding: '2em 5em 5em',
                paddingTop: '0em',
                paddingBottom: 0,
                margin: '2.5em auto 2em'
            }}>
                <h1 className='chartHeadingStyle'>Student Totals</h1>
                <StudentTotalLineChartContainer>
                    <ResponsiveContainer width="99%" aspect={4}>
                        <LineChart
                            width={500}
                            height={300}
                            data={studentTotals}
                            margin={{
                                top: 5,
                                right: 30,
                                left: 20,
                                bottom: 30,
                            }}
                            onMouseMove={(e) => {
                                if (e.activeTooltipIndex !== undefined && e.activeTooltipIndex !== selectedStudentTotalIndex) {
                                    this.setState({
                                        selectedStudentTotalIndex: e.activeTooltipIndex,
                                        chartAnimated: false,
                                        chartRecordedOn: studentTotals[e.activeTooltipIndex].recordedOn
                                    })
                                }
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
                            <YAxis domain={studentTotalYDomain} scale='linear'/>
                            <Tooltip content={CustomStudentTotalLineChartToolTip}/>
                            <Legend/>
                            <Line type="monotone" dataKey="studentTotal" stroke="#8884d8" activeDot={{r: 8}}
                                  legendType='none'/>
                        </LineChart>
                    </ResponsiveContainer>

                    {/*Pie Charts*/}
                    <div style={{flexDirection: "row", display: 'flex', flexWrap: 'wrap', marginTop: '3em'}}>
                        <div style={{flex: 1, height: '250px', minWidth: '300px'}}>
                            <ResponsiveContainer width='99%'>
                                <PieChart width={400} height={400}>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={chartAnimated}
                                        data={levelPieChartData}
                                        cx='50%'
                                        cy='50%'
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label={(entry) => entry.name}
                                    />
                                    <Tooltip content={<CustomPieChartsTooltip/>}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{flex: 1, height: '250px', minWidth: '300px'}}>
                            <ResponsiveContainer width="99%">
                                <PieChart width={400} height={400}>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={chartAnimated}
                                        data={genderPieChartData}
                                        cx='50%'
                                        cy='50%'
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label={(entry) => entry.name}
                                    />
                                    <Tooltip content={<CustomPieChartsTooltip/>}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                        <div style={{flex: 1, height: '250px', minWidth: '300px'}}>
                            <ResponsiveContainer width="99%">
                                <PieChart width={400} height={400}>
                                    <Pie
                                        dataKey="value"
                                        isAnimationActive={chartAnimated}
                                        data={agePieChartData}
                                        cx='50%'
                                        cy='50%'
                                        outerRadius={80}
                                        fill="#8884d8"
                                        label={(entry) => entry.name}
                                        paddingAngle={4}
                                        minAngle={2}
                                        legendType="circle"
                                    />
                                    <Tooltip content={<CustomPieChartsTooltip/>}/>
                                </PieChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                    <span style={{
                        float: 'left',
                        fontSize: '.7em',
                        color: '#707070',
                        paddingTop: '2em',
                        paddingBottom: 0
                    }}>recorded on: {chartRecordedOn}</span>
                </StudentTotalLineChartContainer>
            </div>
        )
    }
}
