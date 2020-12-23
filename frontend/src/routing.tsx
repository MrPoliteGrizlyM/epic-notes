import React from 'react';
import {Switch} from "react-router-dom";
import SignIn from "./components/Auth/SignIn";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import Main from "./components/Notes/Main";

const Routing = () => {
    return (
        <Switch>
            <PublicRoute component={SignIn} path={"/login"} exact/>
            <PrivateRoute component={Main} path={"/"} exact/>
        </Switch>
    );
};

export default Routing;