import React from 'react'
import ReactDOM from 'react-dom';
import axios from 'axios';

import withStyles from "@material-ui/core/styles/withStyles";
import InputLabel from "@material-ui/core/InputLabel";

import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import Button from "components/CustomButtons/Button.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardAvatar from "components/Card/CardAvatar.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";
import { Link } from 'react-router-dom';
import SimpleReactValidator from 'simple-react-validator';

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: props,
            email: '',
            password: ''
        }
        
        this.validator = new SimpleReactValidator();
        this.inputChange = this.inputChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    inputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
        this.validator.showMessageFor(e.target.name);
    }

    onLogin(e) {
        e.preventDefault();
        if (this.validator.allValid()){
            axios.post('http://localhost:8000/user/login', {
                email: this.state.email,
                password: this.state.password
            }).then(res => {
                localStorage.setItem('cool-jwt', res.data.token);
                this.props.history.push('/admin');
            }).catch(err => {
                console.log(err);
            });
        } else {
            this.validator.showMessages();
        }
    }

    render(){
        return (
            <div>
            <form onSubmit={this.onLogin}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={this.state.classes.cardTitleWhite}>Login</h4>
                    </CardHeader>
                    <CardBody>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Email address"
                                    id="email-address"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: "email",
                                        value: this.state.email,
                                        onChange: this.inputChange
                                    }}
                                />
                                {this.validator.message('email', this.state.email, 'required')}
                            </GridItem>
                        </GridContainer>
                        <GridContainer>
                            <GridItem xs={12} sm={12} md={12}>
                                <CustomInput
                                    labelText="Password"
                                    id="password"
                                    formControlProps={{
                                        fullWidth: true
                                    }}
                                    inputProps={{
                                        name: "password",
                                        type: "password",
                                        value: this.state.password,
                                        onChange: this.inputChange
                                    }}
                                />
                                {this.validator.message('password', this.state.password, 'required')}
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                    <CardFooter>
                        <Button type="submit" color="primary">Login</Button>
                        <Link to="/register">Register</Link>
                        
                    </CardFooter>
                </Card>
                </GridItem>
            </GridContainer>
            </form>
            </div>
        )
    }
}
export default Login;