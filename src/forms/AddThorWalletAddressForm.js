import React, {Component} from 'react';
import '../App.css';

import {UpCircleOutlined, WalletOutlined} from '@ant-design/icons';
import {Button, Select, InputNumber, Input} from 'antd';

const inputBottomMargin = {marginBottom: '10px'};

const inputStyle = {
    display: 'inherit',
    margin: '0 auto',
    border: '2px solid #c9c9c9',
    borderRadius: '3px',
    textAlign: 'center',
    ...inputBottomMargin
};

const formStyle = {display: 'flex', flexDirection: 'column', alignItems: 'center'};

export default class AddThorWalletAddressForm extends Component {
    constructor(props) {
        super(props);
        const {students, studentId, inModal} = props;
        this.state = {
            scorePercentage: 80,
            examScoreInputMaxValue: 100,
            examScoreInputFormatter: (value) => `${value}%`,
            examScoreInputParser: (value) => value.replace('%', ''),
            disabledScorePercentageInput: false,
            submitGraduationButtonDisabled: !inModal,

            thorWalletAddress: ''
        };
    }

    render() {

        const submitThorWalletAddress = () => {
            // StudentService.submitStudentGraduation(
            //     studentId,
            //     level,
            //     accomplishment,
            //     scorePercentage
            // ).then((response) => {
            //     if (response.status === 400) {
            //         this.setState({submitGraduationButtonDisabled: false});
            //         if (accomplishment === "BOTH" || accomplishment === 'PROMOTED') {
            //             errorNotification(`OOPS...`, `This student has already graduated level ` + level);
            //         }
            //         else{
            //             errorNotification(`OOPS...`, `This student has already ` + accomplishment.toLowerCase() + " test score submitted for Level " + level);
            //         }
            //
            //     } else {
            //         //this.props.fetchData();
            //         if (accomplishment === "BOTH" || accomplishment === 'PROMOTED') {
            //             this.setState({submitGraduationButtonDisabled: false, studentLevel: level + 1});
            //         } else {
            //             this.setState({submitGraduationButtonDisabled: false});
            //         }
            //         successNotification('Congratulations!', `Keep up the good work.`);
            //     }
            // });
        };

        const getButtonText = () => {
            return 'Please Complete All Fields';
        };

        return (
            <div style={formStyle}>
                <br/>
                <br/>
                <Input
                    size="large"
                    placeholder="Thor Wallet Address"
                    prefix={<WalletOutlined />}
                    style={{width:'50%'}}
                    onChange={text =>   this.setState({
                        thorWalletAddress: text
                    }) }
                />
                <br/>
                <div className='actionButton' style={{display: 'flex', justifyContent: 'center'}}>
                    <Button
                        ghost
                        onClick={submitThorWalletAddress}
                        type='primary'
                        shape='round'
                        icon={<UpCircleOutlined/>}
                        size={'large'}
                        disabled={this.state.thorWalletAddress === ''}
                    >
                        Add Thor Wallet Address
                    </Button>
                </div>
            </div>
        );
    }
}
