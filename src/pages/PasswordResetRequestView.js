import React, {Component} from 'react'
import {LoginContainer} from '../components/login/LoginContainer';
import LeagueNameLogoContainer from '../components/LeagueNameLogo';
import {PasswordResetRequestForm} from '../forms/PasswordResetRequestForm';

class PasswordResetView extends Component {

    state = {
        passwordResetToken: ''
    }

    componentDidMount() {
        let {passwordResetToken} = this.props.match.params;
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
                    <PasswordResetRequestForm passwordResetToken={passwordResetToken}/>
                </div>
            </LoginContainer>
        )
    }
}

export default PasswordResetView
