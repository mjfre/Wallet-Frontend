import React, {Component} from 'react';
import 'react-vis/dist/style.css';
import StudentTotalDataCharts from "../../components/DataViewComponents/StudentTotalDataCharts";
import JavaLevelDataCharts from "../../components/DataViewComponents/JavaLevelDataCharts";

export default class DataView extends Component {

    render() {
        return (
            <div>
                <StudentTotalDataCharts/>
                <JavaLevelDataCharts/>
            </div>
        )
    }
}
