import React, { Component } from 'react'
import { Route, Redirect } from 'react-router-dom'
import AdminService from '../../service/AdminService';
class AuthenticatedRoute extends Component {
    render() {
       if (AdminService.isUserLoggedIn()) {
            return <Route {...this.props} />
       } else {
          return <Redirect to="/login" />
       }
    }
}
export default AuthenticatedRoute