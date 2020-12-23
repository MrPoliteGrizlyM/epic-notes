import React, {Component} from 'react';
import { Route, Redirect } from 'react-router-dom';
import { isLogin } from '../utils/security';


const PrivateRoute = ({component: Component, ...rest}: any) => {
    return (
        <Route {...rest} render={props => (
            isLogin() ?
                <Component {...props} />
                : <Redirect to="/login" />
        )} />
    );
};

export default PrivateRoute;