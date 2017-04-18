import React, {Component} from 'react';
import axios from 'axios'

export default class AccountInput extends Component {
  constructor(props) {
    super(props);

    this.state={
      email: '',
      username: '',
      password: ''
    }
  }

  handleSubmit(event){
    event.preventDefault()
    axios
    .post('http://localhost:4000/register', {
      account: { username: this.state.username, email: this.state.email,password: this.state.password}
    })
    .then(({data})=>{
      window.localStorage.setItem("current user", data.jwt)
      this.props.onSubmit()
    })
    .catch((errors)=>{
      debugger
    })
  }

  handleChange(field, event){
    this.setState({
      [field]: event.target.value
    })
  }

  render() {
    return (
      <div className="account-input">
        <h3>Sign Up</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          Username:
          <input type="text" value={this.state.username} onChange={this.handleChange.bind(this, "username")}  /><br />
          Email:
          <input type="text" value={this.state.email} onChange={this.handleChange.bind(this, "email")} /><br />
          Password:
          <input type="password" value={this.state.password} onChange={this.handleChange.bind(this, "password")} /><br />
          <button type="submit">Register</button>
        </form>
      </div>);
  }
}
