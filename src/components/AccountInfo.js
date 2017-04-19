import React from 'react';
import { Link } from 'react-router-dom'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import { setUser, setCurrentBoard, newBoard, login, logout, register, clearUser} from '../actions'


class AccountInfo extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount(){
    if (this.props.token){
      this.props.setUser(this.props.token)
    }
  }

  componentDidUpdate(prevProps, prevState){
     if(this.props.token && prevProps.token !== this.props.token){
       this.props.setUser(this.props.token)
     }
   }

  logOut(){
    this.props.logout()
    this.props.clearUser()
    this.props.newBoard()
  }

  render() {
    let account = this.props.account
    if (account){
      return (
      <div>welcome, {account.username} <button onClick={this.logOut.bind(this)}>Log Out</button>
      <hr />
      <h2>Your Boards</h2>
        {account.boards.map((board, index)=>{
          let boardUrl = `/boards/${board.id}`
          return (
            <Link to={boardUrl}>
              <div style=
                {{borderRadius: 5, margin: 15, height: 100, background: "#fff", color: "#000"}}
                key={index}>
                {board.title}<br />
                Created at:{board.created_at}<br />
                Updated at:{board.created_at}
              </div>
            </Link>
          )
        })}
      </div>)
  } else {
    return null
  }
}
}

const mapStateToProps = (state) => {
  return ({
    token: state.manageLogin.token,
    account: state.account
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setUser: setUser,
    newBoard: newBoard,
    setCurrentBoard: setCurrentBoard,
    login: login,
    logout: logout,
    register: register,
    clearUser: clearUser
  }, dispatch)
}

const ConnectedAccountInfo = connect(mapStateToProps, mapDispatchToProps)(AccountInfo)

export default ConnectedAccountInfo
