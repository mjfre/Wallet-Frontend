import React, { Component } from 'react';
import '../../App.css';
import AddThorWalletAddressForm from '../../forms/AddThorWalletAddressForm';

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
    marginTop: '1.5em',
    boxShadow: '10px 10px 1em #888888',
}

const mainContainerStyle = {
    width: '95%',
    margin: '2.5em auto',
    textAlign: 'center',
    padding: '2.5em 5em 5em',
    overflow: 'hidden'
};

export default class AddThorWalletAddressFormView extends Component {
    constructor(props) {
        super(props);
        const {students} = props;
        this.state = {
            students: students
        }
    }

    render() {

        return (
            <div style={mainContainerStyle}>
                <div style={titleStyle}>
                    <h1 style={{color: '#fc3ae6'}}>Add Thor Wallet Addresses</h1>
                </div>
                <div style={{overflow:'hidden'}}>
                <div style={containerStyle}>
                    <AddThorWalletAddressForm students={this.state.students} fetchData={this.props.fetchData} inModal={false}/>
                </div>
                </div>

            </div>
        );
    }
}
