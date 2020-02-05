import React, { Component } from 'react';
import { FlatList, Alert, SafeAreaView } from 'react-native';

import {
  Container, Header, Title, Content,
  View, Button, Left, Right, Body, Icon, Text, Fab,
  List, ListItem, Picker, Form, Item as FormItem, Label, Input, Spinner
} from 'native-base';
import { withRouter, NativeRouter, Route, Redirect } from "react-router-native";

import WebServices from "../components/WebServices"


class All extends React.Component {
  state = {
    users: [],
    loading: true
  }
  componentDidMount() {
    this.init()
  }
  init() {
    WebServices.getUsers().then((res) => {
      this.setState({ users: res.data, loading: false })
    })
    .catch(err => {
      alert(err);
      this.setState({loading: false })
    })
  }
  _onPressUser(item) {
    this.props.history.push("/users/edit/" + item.id)
  }
  _onDeleteUser(item) {
    Alert.alert(
      'Dialog',
      'Are you sure to delete',
      [
        { text: 'NO' },
        {
          text: 'YES', onPress: () => {
            WebServices.deleteUser(item.id).then((res) => {
              alert("user deleted success")
              this.init()
            })
          }
        },
      ]
    );
  }
  render() {
    if(this.state.loading){
      return(
        <Container style={{
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Spinner size={64} />
        </Container>
      )
    }
    return (<SafeAreaView ><FlatList
      data={this.state.users}
      renderItem={({ item, index }) => (
        <View key={index} style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          margin: 5,
          borderColor: "#757de8",
          borderWidth: 1,
          borderRadius: 5,
        }} >
          <View style={{
            flex: 1,
            backgroundColor: 'white',

            padding: 5,
            paddingVertical: 7,
            margin: 3,
          }}>
            <Text style={{ fontSize: 22, color: "black", fontWeight: "bold" }} >{"username: " + item.username}</Text>
            <Text style={{ fontSize: 20, color: "black" }} >{item.firstname + " " + item.lastname}</Text>
          </View>
          <View style={{ flexDirection: "row" }}>
            <Button transparent onPress={() => this._onDeleteUser(item)}>
              <Icon style={{ fontSize: 32, color: 'red' }} name="trash" />
            </Button>
            <Button transparent onPress={() => this._onPressUser(item)}>
              <Icon style={{ fontSize: 32, color: 'blue' }} name="eye" />
            </Button>
          </View>
        </View>
      )}
    /></SafeAreaView>)
  }
}

All = withRouter(All)

class Edit extends React.Component {
  state = {
    id: 0,
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    tel: "",
    role: "user",
    img1: "123456789",
    img2: "123456789",
    img3: "123456789",
    loading: true
  }
  componentDidMount() {
    const { id } = this.props.match.params;
    WebServices.getUser(id)
      .then((res) => {
        const data = res.data
        this.setState({ ...data, loading: false })
      })
      .catch(err => {
        alert(err);
        this.setState({ loading: false })
      })
  }
  handleFormSubmit() {
    const {
      id,
      username,
      password,
      firstname,
      lastname,
      tel,
      role,
      img1,
      img2,
      img3
    } = this.state
    WebServices.editUser(id, username, password, firstname, lastname, tel, role, img1, img2, img3)
      .then(res => {
        console.log("then in handle submit" + res)
        alert("user updated success")
      })
      .catch(err => {
        alert(err);
      })
  }
  render() {
    if(this.state.loading){
      return(
        <Container style={{
          justifyContent: "center",
          alignItems: "center"
        }}>
          <Spinner size={64} />
        </Container>
      )
    }
    return (
      <Form style={{
        flex: 1,
        justifyContent: "center",
      }}>
        <FormItem floatingLabel>
          <Label>Username</Label>
          <Input value={this.state.username} onChangeText={(text) => this.setState({ username: text })} />
        </FormItem>
        <FormItem floatingLabel last>
          <Label>Password</Label>
          <Input value={this.state.password} onChangeText={(text) => this.setState({ password: text })} secureTextEntry={true} />
        </FormItem>
        <FormItem floatingLabel>
          <Label>Firstname</Label>
          <Input value={this.state.firstname} onChangeText={(text) => this.setState({ firstname: text })} />
        </FormItem>
        <FormItem floatingLabel>
          <Label>Lastname</Label>
          <Input value={this.state.lastname} onChangeText={(text) => this.setState({ lastname: text })} />
        </FormItem>
        <FormItem floatingLabel>
          <Label>Tel</Label>
          <Input value={this.state.tel} onChangeText={(text) => this.setState({ tel: text })} />
        </FormItem>
        <FormItem>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            placeholder="Select user role"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.role}
            onValueChange={(text) => this.setState({ role: text })}
          >
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="User" value="user" />
          </Picker>
        </FormItem>

        <Button onPress={() => this.handleFormSubmit()} full primary style={{ marginTop: 20 }}>
          <Text>Update</Text>
        </Button>
      </Form>
    )
  }
}

Edit = withRouter(Edit)

class Add extends React.Component {
  state = {
    id: 0,
    username: "",
    password: "",
    firstname: "",
    lastname: "",
    tel: "",
    role: "admin",
    img1: "123456789",
    img2: "123456789",
    img3: "123456789"
  }
  handleFormSubmit() {
    const {
      username,
      password,
      firstname,
      lastname,
      tel,
      role,
      img1,
      img2,
      img3
    } = this.state
    WebServices.addUser(username, password, firstname, lastname, tel, role, img1, img2, img3)
      .then(res => {
        console.log("then in handle submit" + res)
        alert("user created success")
      })
      .catch(err => {
        alert(err);
      })
  }
  render() {
    return (
      <Form style={{
        flex: 1,
        justifyContent: "center",
      }}>
        <FormItem floatingLabel>
          <Label>Username</Label>
          <Input value={this.state.username} onChangeText={(text) => this.setState({ username: text })} />
        </FormItem>
        <FormItem floatingLabel last>
          <Label>Password</Label>
          <Input value={this.state.password} onChangeText={(text) => this.setState({ password: text })} secureTextEntry={true} />
        </FormItem>
        <FormItem floatingLabel>
          <Label>Firstname</Label>
          <Input value={this.state.firstname} onChangeText={(text) => this.setState({ firstname: text })} />
        </FormItem>
        <FormItem floatingLabel>
          <Label>Lastname</Label>
          <Input value={this.state.lastname} onChangeText={(text) => this.setState({ lastname: text })} />
        </FormItem>
        <FormItem floatingLabel>
          <Label>Tel</Label>
          <Input value={this.state.tel} onChangeText={(text) => this.setState({ tel: text })} />
        </FormItem>
        <FormItem>
          <Picker
            mode="dropdown"
            iosIcon={<Icon name="arrow-down" />}
            style={{ width: undefined }}
            placeholder="Select user role"
            placeholderStyle={{ color: "#bfc6ea" }}
            placeholderIconColor="#007aff"
            selectedValue={this.state.role}
            onValueChange={(text) => this.setState({ role: text })}
          >
            <Picker.Item label="Admin" value="admin" />
            <Picker.Item label="User" value="user" />
          </Picker>
        </FormItem>

        <Button onPress={() => this.handleFormSubmit()} full primary style={{ marginTop: 20 }}>
          <Text>Create</Text>
        </Button>
      </Form>
    )
  }
}

class Users extends Component {
  state = {
    fabActive: false,
    users: []
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
            <Button onPress={() => this.props.history.goBack()} transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Users</Title>
          </Body>
          <Right />
        </Header>
        <Content>
          <Route exact path="/users" component={All} />
          <Route exact path="/users/add" component={Add} />
          <Route path="/users/edit/:id" component={Edit} />
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
          <Button onPress={() => this.props.history.push("/users/add")} style={{ backgroundColor: 'green' }}>
            <Icon name="add-circle" />
          </Button>
        </Fab>
      </Container>
    );
  }
}

export default withRouter(Users)