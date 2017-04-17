import React, {PropTypes} from 'react';
import axios from 'axios'
import AccountInput from './AccountInput'

export default class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      token: window.localStorage.getItem('current user')
    }
  }

  logOut(){
    window.localStorage.removeItem("current user")
    this.setState({
      token: ''
    })
  }

  render() {
    return (
      <div>
        {(!!window.localStorage.getItem("current user")) ? <button onClick={this.logOut.bind(this)}>Log Out</button> : <AccountInput />}
      </div>);
  }
}
