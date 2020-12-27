import React, {Component} from 'react';
import {Container, WithStyles,
        CssBaseline, Typography} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { withStyles } from '@material-ui/core/styles';
import { SubmitButton } from "../../elements/buttons";
import { TextInput } from "../../elements/inputs";
import {setJWTToken} from "../../utils/security";
import {Redirect} from "react-router-dom";
import {re_email} from "../../utils/additional";
import {styles} from "./SignInStyles";

interface Props extends WithStyles<typeof styles> {}
interface StateTextInput {
    valid: boolean,
    value: string
}
type State = {
    invalid: boolean,
    email: StateTextInput,
    password: StateTextInput,
    redirect: boolean
}

class SignIn extends Component<Props, State> {
    state = {
        invalid: false,
        email: {
            valid: true,
            value: ""
        },
        password: {
            valid: true,
            value: ""
        },
        redirect: false
    }

    onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        if (re_email.test(String(value).toLowerCase())) {
            this.setState({
                email: {
                    ...this.state.email,
                    value: value,
                    valid: true
                }
            })
        } else {
            this.setState({
                email: {
                    ...this.state.email,
                    value: value,
                    valid: false
                }
            })
        }
    }

    onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = event.currentTarget.value;
        if (value.length >= 8) {
            this.setState({
                password: {
                    ...this.state.password,
                    value: value,
                    valid: true
                }
            })
        } else {
            this.setState({
                password: {
                    ...this.state.password,
                    value: value,
                    valid: false
                }
            })
        }
    }

    onSubmit = () => {
        if (this.state.password.value && this.state.password.valid
            && this.state.email.value && this.state.email.valid) {
            setJWTToken()
            this.setState({
                invalid: false,
                redirect: true
            })
        } else {
            this.setState({
                invalid: true,
                email: {
                    ...this.state.email,
                    valid: false
                },
                password: {
                    ...this.state.password,
                    valid: false
                }
            })
        }
    }

    render() {
        const {classes} = this.props;
        return (
            <Container component="main" maxWidth="xs">
                {this.state.redirect ? <Redirect to="/" /> : ''}
                <CssBaseline />
                <div className={classes.paper}>
                    <Typography component="h1" variant="h5">
                        Epic Notes
                    </Typography>
                    <form className={classes.form} noValidate>
                        <TextInput label={"Email"} type={"email"}
                                   onChange={this.onChangeEmail}
                                   value={this.state.email.value}
                                   valid={this.state.email.valid}/>
                        <TextInput label={"Password"} type={"password"}
                                   onChange={this.onChangePassword}
                                   value={this.state.password.value}
                                   valid={this.state.password.valid}/>
                        <SubmitButton className={classes.submit} onClick={this.onSubmit}>
                            Login
                        </SubmitButton>
                    </form>
                    {this.state.invalid ?
                        <Alert severity="error" className={classes.error}>
                            Invalid email or password!
                        </Alert> : ''}
                </div>
            </Container>
            );
    }
}

export default withStyles(styles)(SignIn);