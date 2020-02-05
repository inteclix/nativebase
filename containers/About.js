import React, { Component } from 'react';
import { Container, Header, Title, Content, FooterTab, Button, Left, Right, Body, Icon, Text } from 'native-base';
import { AsyncStorage } from 'react-native';
import Footer from "./Footer"
export default class About extends Component {
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
            <Title>About</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Text>
            This is Content Section
            </Text>
          <Button onPress={() => console.log('logout')} >
            <Text>
              logout
            </Text>
          </Button>
        </Content>
        <Footer />
      </Container>
    );
  }
}