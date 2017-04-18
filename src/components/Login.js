import React, {PropTypes} from 'react';
import axios from 'axios'

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
    axios
    .post('http://localhost:4000/login', {
      account: { username: this.state.username, password: this.state.password}
    }).then(({data}) => {
      window.localStorage.setItem("current user", data.jwt)
      this.props.onSubmit()
    }).catch((errors) => {
      debugger
    })
  }

  handleChange(field, e){
    this.setState({
      [field]: e.target.value
    })
  }

  render() {
    return (
      <div>
        <h3>Log In</h3>
        <form onSubmit={this.handleSubmit.bind(this)}>
          Username:
          <input type="text" value={this.state.username} onChange={this.handleChange.bind(this, "username")}  /><br />
          Password:
          <input type="password" value={this.state.password} onChange={this.handleChange.bind(this, "password")} /><br />
          <button type="submit">Log In</button>
        </form>
      </div>);
  }
}

Login.propTypes = {
};
