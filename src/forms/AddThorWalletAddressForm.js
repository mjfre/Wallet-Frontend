import React, {Component} from 'react';
import '../App.css';

import {UpCircleOutlined, WalletOutlined} from '@ant-design/icons';
import {Button, Select, InputNumber, Input} from 'antd';
import WalletService from "../service/WalletService";
import {errorNotification, successNotification} from "../components/Notification";

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

        const {thorWalletAddress} = this.state;

        const submitThorWalletAddress = () => {
            WalletService.addThorWalletAddress(thorWalletAddress)
                .then((response) => {
                if (response.status === 400) {
                        errorNotification(`OOPS...`, 'Wallet address already exists in database');
                } else if (response.ok) {
                    successNotification('Success', `Thor Wallet Address added.`);
                    this.setState({thorWalletAddress: ''});
                } else {
                    errorNotification(`OOPS...`, 'Error adding address to database');
                }
            });
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
                    prefix={<WalletOutlined/>}
                    style={{width: '50%'}}
                    value={thorWalletAddress}
                    onChange={text =>
                        this.setState({
                            thorWalletAddress: text.target.value
                        })}
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
