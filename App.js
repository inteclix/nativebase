import React from "react";
import { AsyncStorage } from "react-native"

import { NativeRouter, Route, Redirect } from "react-router-native";
import { Container, Content, Text } from 'native-base';

import Footer from "./containers/Footer"
import Header from "./containers/Header"
import Login from "./containers/Login"
import Home from "./containers/Home"
import About from "./containers/About"
import Users from "./containers/Users"

import withAuth from "./components/withAuth"

class App extends React.Component {
  componentDidMount(){
    console.log("user" + this.props.user)
  }
  render() {
    return (
        <>
          <Route exact path="/" component={Home} />
          <Route exact path="/about" component={About} />
          <Route path="/users" component={Users} />
        </>
    )
  }
}

export default withAuth(App);
