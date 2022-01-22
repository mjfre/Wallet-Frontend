import React, { Component } from 'react'
import {LoginContainer} from './../components/login/LoginContainer';
import LeagueNameLogoContainer from './../components/LeagueNameLogo';
import LoginForm from './../forms/LoginForm'

class LoginView extends Component {

    render() {
        return (
                <LoginContainer>
                    <div style={{margin: 'auto'}}>
                        <LeagueNameLogoContainer />
                        <LoginForm />
                    </div>
                </LoginContainer>
        )
    }
}

export default LoginView
