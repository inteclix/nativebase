import React, { Component } from 'react';
import { Container, Header, Title, Content, View, Button, Left, Right, Body, Icon, Text, Fab } from 'native-base';
import { AsyncStorage } from 'react-native';
import { withRouter } from "react-router-native"

import Footer from "./Footer"
import WebServices from "../components/WebServices"
class Home extends Component {
  state = {
    fabActive: false
  }
  componentDidMount() {
  }
  async handleLogout() {
    await WebServices.logout()
    this.props.history.replace('/login')
  }
  render() {
    return (
      <Container>
        <Header>
          <Left>
            <Button transparent>
              
            </Button>
          </Left>
          <Body>
            <Title>Home</Title>
          </Body>
          <Right />
        </Header>
        <Content>
        </Content>
        <Fab
          active={this.state.fabActive}
          direction="up"
          
          containerStyle={{}}
          style={{ backgroundColor: '#5067FF' }}
          position="bottomRight"
          onPress={() => this.setState({ fabActive: !this.state.fabActive })}>
          <Icon size={64} name="menu" />
          <Button onPress={() => this.handleLogout()} style={{ backgroundColor: 'gray' }}>
            <Icon name="log-out" />
          </Button>
          <Button style={{ backgroundColor: '#34A34F' }}>
            <Icon name="settings" />
          </Button>
          <Button style={{ backgroundColor: '#3B5998' }}>
            <Icon name="barcode" />
          </Button>
          <Button onPress={()=>this.props.history.push("/users")} style={{ backgroundColor: '#DD5144' }}>
            <Icon name="contacts" />
          </Button>
        </Fab>
      </Container>
    );
  }
}

export default withRouter(Home)