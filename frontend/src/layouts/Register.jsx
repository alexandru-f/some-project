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

class Login extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            classes: props,
            email: '',
            password: ''
        }

        this.inputChange = this.inputChange.bind(this);
        this.onLogin = this.onLogin.bind(this);
    }

    inputChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    onLogin(e) {
        e.preventDefault();
        axios.post('http://localhost:8000/user/register', {
            email: this.state.email,
            password: this.state.password
        }).then(res => {
            this.props.history.push('/login');
        });
    }

    render(){
        return (
            <div>
            <form onSubmit={this.onLogin}>
            <GridContainer>
                <GridItem xs={12} sm={12} md={12}>
                <Card>
                    <CardHeader color="primary">
                        <h4 className={this.state.classes.cardTitleWhite}>Creeaza cont</h4>
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
                            </GridItem>
                        </GridContainer>
                    </CardBody>
                    <CardFooter>
                        <Button type="submit" color="primary">Creeaza contul</Button>
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