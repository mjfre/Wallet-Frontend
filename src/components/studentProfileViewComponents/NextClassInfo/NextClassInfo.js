import React, {Component} from 'react';
import {
    Button,
    Descriptions,
} from 'antd';

import StudentProfileInfoContainer from "../containers/StudentProfileInfoContainer";

class NextClassInfo extends Component {


    render() {

        return (
            <StudentProfileInfoContainer key={1}>
                <Descriptions
                    layout="vertical"
                    bordered
                    key={2}
                >
                    <Descriptions.Item label="Class Name" span={1}  key={1} style={{textAlign:'center', fontWeight:500}}>
                        <span style={{fontWeight:'normal'}}> {this.props.nextClass.eventName} </span>
                    </Descriptions.Item>
                    <Descriptions.Item label="Class Time"  key={2} style={{textAlign:'center', fontWeight:500}}>
                        <span style={{fontWeight:'normal'}}> {this.props.nextClass.startAt}</span>
                    </Descriptions.Item>
                    <Descriptions.Item  key={3}>
                        <Button
                            ghost
                            key={1}
                            type="primary"
                            shape="round"
                            size={'small'}
                            style={{marginRight:'1em'}}
                            onClick={() => {
                                window.open('https://jtl.pike13.com/e/'+this.props.nextClass.id);
                            }}
                        >
                            view on pike13
                        </Button>
                        <Button
                            key={2}
                            ghost
                            type="primary"
                            shape="round"
                            size={'small'}
                            onClick={() => {
                                window.open(this.props.nextClass.link);
                            }}
                        >
                            open zoom classroom
                        </Button>
                    </Descriptions.Item>
                </Descriptions>
            </StudentProfileInfoContainer>
        );
    }
}

export default NextClassInfo;

