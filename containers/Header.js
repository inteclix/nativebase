import React from "react"
import { withRouter } from "react-router-native"
import { Header, Title, Left, Right, Body, Button, Icon } from 'native-base';


export default withRouter(({ history, location }) => (
  <Header>
    <Left>
      <Button transparent>
        <Icon name='menu' />
      </Button>
    </Left>
    <Body>
      <Title>Angela App</Title>
    </Body>
    <Right />
  </Header>
))
