import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import UserService from "../../service/UserService";
class AuthenticatedRoute extends Component {
    render() {
       if (UserService.isUserLoggedIn()) {
            return <Route {...this.props} />
       } else {
          return <Redirect to="/login" />
       }
    }
}
export default AuthenticatedRoute
