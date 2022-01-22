import React from 'react';
import {
    FlexibleWidthXYPlot,
    XAxis,
    YAxis,
    VerticalBarSeries,
    LabelSeries
} from 'react-vis';

import MouseTooltip from 'react-sticky-mouse-tooltip';

class ModuleRepositoryBarChart extends React.Component {

    state = {
        nearestBarValue: null
    }

    render() {
        const data = this.props.data;
        const title = this.props.title;
        const chartHeight = 200;
        const maxValueOfY = Math.max(...data.map(o => o.y), 0);
        const yMaxDomainValue = maxValueOfY>=100?maxValueOfY+100:100;
        const yDomain = [0, yMaxDomainValue];

        return (
            <div>
                <div><p>{title}</p></div>
                <FlexibleWidthXYPlot
                    xType="ordinal"
                    height={chartHeight}
                    yDomain={yDomain}
                >
                    <XAxis />
                    <YAxis
                        title='days'
                        style={{
                            line: { stroke: '#ADDDE1' }
                        }}
                    />
                    <VerticalBarSeries

                        data={data}
                        onValueClick={(datapoint) => {
                            window.open(datapoint.url);
                        }}
                        onValueMouseOver={value => this.setState({ nearestBarValue: value })}
                        onValueMouseOut={() => this.setState({ nearestBarValue: null })}
                    />
                    <LabelSeries
                        data={data.map(obj => {
                            return { ...obj, label: obj.y.toString()!==0?obj.y.toString():"Did not find" }
                        })}
                        labelAnchorX="middle"
                        labelAnchorY="text-after-edge"
                    />
                </FlexibleWidthXYPlot>

                {/* if the mouse is hovering over a bar, display the tooltip   */}
                {this.state.nearestBarValue ?
                    <MouseTooltip
                        visible={this.state.isMouseTooltipVisible}
                        offsetX={15}
                        offsetY={10}
                    >
                        <div
                            style={{
                                background: '#fff6eb',
                                border: '2px solid black',
                                padding: '1em',
                                paddingBottom: '0em'
                            }}
                        >
                            <p>
                            <strong>created at:</strong> {this.state.nearestBarValue.createdAt}<br />
                            <strong>updated at:</strong> {this.state.nearestBarValue.updatedAt}<br />
                            <strong>click to view repository</strong>
                            </p>
                        </div>
                    </MouseTooltip>
                    : null
    }
            </div >
        );
    }
}

export default ModuleRepositoryBarChart;