import React from "react"
import { withRouter } from "react-router-native"
import { Footer, FooterTab, Button, Text } from 'native-base';


export default withRouter(({ history, location }) => (
  <Footer>
    <FooterTab>
      <Button active={location.pathname === "/"} onPress={() => history.push("/")}>
        <Text>Home</Text>
      </Button>
      <Button active={location.pathname === "/about"} onPress={() => history.push("/about")}>
        <Text>About</Text>
      </Button>
      
    </FooterTab>
  </Footer>
))
