import React, { Component } from 'react';
import { withRouter } from "react-router-native"
import WebServices from './WebServices';
import {
  Spinner,
  Container
} from "native-base"


export default function withAuth(AuthComponent) {
  return withRouter(class AuthWrapped extends Component {
    constructor() {
      super();
      this.state = {
        user: null,
        loading: true
      }
    }
    async componentDidMount() {
      const token = await WebServices.getToken();
      WebServices.getProfile()
        .then((res) => {
          console.log("res" + res)
          res && this.setState({
            user: res.data
          })
        })
        .catch((err) => {
          //WebServices.logout()
          this.props.history.replace('/login')
        })
      this.setState({loading: false})
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
        <AuthComponent user={this.state.user} />
      )
    }
  });
}

