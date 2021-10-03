import React, { Component } from "react";
import "./App.css";
import {View, Switch, StyleSheet} from 'react-native';
export default class App extends Component {
  constructor(props) {
    super(props);

    this.state = { isSessionActive: true };
    this.events = [
      "load",
      "mousemove",
      "mousedown",
      "click",
      "scroll",
      "keypress",
    ];

    this.logout = this.logout.bind(this);
    this.resetTimeout = this.resetTimeout.bind(this);

    for (var i in this.events) {
      window.addEventListener(this.events[i], this.resetTimeout);
    }
    this.setTimeout();
  }

  clearTimeout() {
    if (this.logoutTimeout) clearTimeout(this.logoutTimeout);
  }

  setTimeout() {
    this.logoutTimeout = setTimeout(this.logout, 10 * 60000);
  }

  resetTimeout() {
    this.clearTimeout();
    this.setTimeout();
  }

  warn() {
    alert("You are loggedout.");
  }

  logout() {
    this.setState({ isSessionActive: false });
    this.warn();
  }

  toogleButton() {
    this.state.isSessionActive ? this.logout() : window.location.reload(true);
  }

  render() {
    return (
      <View className="App">
        <h1>Session auto logout after 10 mins automatically!!</h1>
        <h2>Status :{this.state.isSessionActive ? "Logged In" : "Logged Out"}</h2>
         <Switch
          trackColor={{false: 'gray', true: 'teal'}}
          thumbColor="white"
          ios_backgroundColor="gray"
          onValueChange={() => this.toogleButton()}
          value={this.state.isSessionActive}
        />
      </View>
    );
  }
}
