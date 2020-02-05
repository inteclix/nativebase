import React, { Component } from 'react';
import { Container, Header, Title, Content, View, Button, Left, Right, Body, Icon, Text, Fab } from 'native-base';
import { withRouter } from "react-router-native"

import WebServices from "../components/WebServices"
class Users extends Component {
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
              <Icon name='menu' />
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
          <Button style={{ backgroundColor: '#3B5998' }}>
            <Icon name="grid" />
          </Button>
          <Button style={{ backgroundColor: '#DD5144' }}>
            <Icon name="add-circle" />
          </Button>
        </Fab>
      </Container>
    );
  }
}

export default withRouter(Users)