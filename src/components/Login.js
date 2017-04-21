import React from 'react';

export default class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  handleSubmit(e){
    e.preventDefault()
    this.props.login(this.state.username, this.state.password)
  }

  handleChange(field, e){
    this.setState({
      [field]: e.target.value
    })
  }

  render() {
    return (
      <div className="account-input">
        <h3>Log In</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <label>Email (or Username):</label>
          <input placeholder="Username or Email" type="text" value={this.state.username} onChange={this.handleChange.bind(this, "username")}  /><br />
          <label>Password:</label>
          <input placeholder="Password" type="password" value={this.state.password} onChange={this.handleChange.bind(this, "password")} /><br />
          <button type="submit">Log In</button>
        </form>
      </div>);
  }
}
