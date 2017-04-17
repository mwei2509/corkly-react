import React, {PropTypes} from 'react';
import axios from 'axios'
import AccountInput from './AccountInput'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getBoards } from '../actions'

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      token: window.localStorage.getItem('current user')
    }
  }

  componentWillMount(){
    if (window.localStorage.getItem('current user')){
      this.props.getBoards()
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



// const mapStateToProps = (state) => {
//   return ({
//     account: state.account
//   })
// }

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getBoards: getBoards
  }, dispatch)
}

const ConnectedAccount = connect(null, mapDispatchToProps)(Account)

export default ConnectedAccount
