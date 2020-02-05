import React, { Component } from 'react';
import { Image } from "react-native"
import { AsyncStorage } from "react-native"

import { withRouter, Redirect } from "react-router-native"


import {
  Container,
  Header,
  Button,
  Text,
  Body,
  Form,
  Item as FormItem,
  Input,
  Label,
  Title,
  Left,
  Toast,
  Spinner
} from 'native-base';

import WebServices from "../components/WebServices"

class Login extends Component {
  constructor() {
    super();
    this.state = {
      username: "admin",
      password: "aaaaaaaa"
    }
  }
  componentDidMount() {
    // if (this.Auth.loggedIn()){
    //   this.props.history.replace('/');
    // }
  }
  handleFormSubmit() {
    WebServices.login(this.state.username, this.state.password)
      .then(res => {
        this.props.history.replace("/");
        console.log("then in handle submit")
      })
      .catch(err => {
        alert(err);
      })
  }


  render() {
    return (
      <Container>
        <Image style={{ marginTop: 20, height: 200, width: 200, alignSelf: "center" }} source={require("../images/logo.jpg")} />
        <Form style={{
          flex: 1,
          justifyContent: "center",
        }}>
          <FormItem floatingLabel>
            <Label>Username</Label>
            <Input  value={this.state.username} onChangeText={(text)=>this.setState({username: text})} />
          </FormItem>
          <FormItem floatingLabel last>
            <Label>Password</Label>
            <Input value={this.state.password} onChangeText={(text)=>this.setState({password: text})} secureTextEntry={true} />
          </FormItem>

          <Button onPress={()=>this.handleFormSubmit()} full primary style={{ marginTop: 20 }}>
            <Text> Login </Text>
          </Button>
        </Form>
      </Container>
    )
  }
}

export default withRouter(Login)