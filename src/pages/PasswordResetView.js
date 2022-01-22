import React, {Component} from 'react'
import {LoginContainer} from '../components/login/LoginContainer';
import LeagueNameLogoContainer from '../components/LeagueNameLogo';
import {PasswordResetForm} from '../forms/PasswordResetForm';

class PasswordResetView extends Component {

    state = {
        passwordResetToken: ''
    }

    componentDidMount() {
        let {passwordResetToken} = this.props.match.params;
        console.log(passwordResetToken);
        this.setState({
            passwordResetToken: passwordResetToken
        });

    }

    render() {
        const {passwordResetToken} = this.state;

        return (
            <LoginContainer>
                <div style={{margin: 'auto'}}>
                    <LeagueNameLogoContainer/>
                    <PasswordResetForm passwordResetToken={passwordResetToken}/>
                </div>
            </LoginContainer>
        )
    }
}

export default PasswordResetView
