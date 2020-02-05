/**
 * @format
 */
import React from "react"
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

import { NativeRouter, Route, Redirect } from "react-router-native";
import App from './App';
import Login from "./containers/Login"
const Root = () => (<NativeRouter>
  <Route path="/" component={App} />
  <Route exact path="/login" component={Login} />
</NativeRouter>)

AppRegistry.registerComponent(appName, () => Root);
