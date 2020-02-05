import { AsyncStorage } from "react-native"

class WebServices {
  constructor() {
    this.domain = 'http://192.168.43.142:8000/api' // API server domain
    this.user = null
  }

  setUser(user) {
    this.user = user
  }

  async login(username, password) {
    // Get a token from api server using the fetch api
    return this.fetch("auth/login", {
      method: 'POST',
      body: JSON.stringify({
        username,
        password
      })
    }).then(res => {
      this.setToken(res.data.token) // Setting the token in localStorage
      return Promise.resolve(res);
    })
  }

  async logout() {
    // Clear user token and profile data from localStorage
    await AsyncStorage.removeItem('id_token');
  }

  async setToken(id_token) {
    // Saves user token to localStorage
    await AsyncStorage.setItem('id_token', id_token)
    this.id_token = id_token
    console.log("setToken" + id_token)
  }

  async getToken() {
    // Retrieves the user token from localStorage
    const id_token = await AsyncStorage.getItem('id_token')
    console.log("getToken " + id_token)
    this.id_token = id_token
    return id_token
  }

  async getProfile() {
    // Using jwt-decode npm package to decode the token
    //console.log(decode(this.getToken()));
    //return decode(this.getToken());
    return this.fetch("auth/me", {
      method: 'GET'
    }).then(res => {
      this.setUser(res.data)
      return Promise.resolve(res);
    })
  }

  async getUsers() {
    // Using jwt-decode npm package to decode the token
    //console.log(decode(this.getToken()));
    //return decode(this.getToken());
    return this.fetch("auth/users", {
      method: 'GET'
    })
  }

  async getUser(id) {
    return this.fetch("auth/users/" + id, {
      method: 'GET'
    })
  }

  async deleteUser(id) {
    return this.fetch("auth/users/" + id, {
      method: 'DELETE'
    })
  }

  async addUser(username, password, firstname, lastname, tel, role, img1, img2, img3) {
    return this.fetch("auth/users", {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        firstname,
        lastname,
        tel,
        role,
        img1,
        img2,
        img3
      })
    }).then(res => {
      return Promise.resolve(res);
    })
  }

  async editUser(id, username, password, firstname, lastname, tel, role, img1, img2, img3) {
    return this.fetch("auth/users/" + id, {
      method: 'PUT',
      body: JSON.stringify({
        username,
        password,
        firstname,
        lastname,
        tel,
        role,
        img1,
        img2,
        img3
      })
    }).then(res => {
      this.setToken(res.data.token) // Setting the token in localStorage
      return Promise.resolve(res);
    })
  }

  fetch(url, options) {
    // performs api calls sending the required authentication headers
    const headers = {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + this.id_token
    }

    return fetch(`${this.domain}/${url}`, {
      headers,
      ...options
    })
      .then(this._checkStatus)
      .then(response => response.json())
  }

  _checkStatus(response) {
    // raises an error in case response status is not a success
    if (response.status >= 200 && response.status < 300) { // Success status lies between 200 to 300
      return response
    } else {
      var error = new Error(response.statusText)
      error.response = response
      throw error
    }
  }
}

const WebServicesInstance = new WebServices()
export default WebServicesInstance