import React from 'react';
import AccountInput from './AccountInput'
import Login from './Login'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { setUser, setCurrentBoard, newBoard, login, logout, register, clearUser} from '../actions'

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      boardTitle: ''
    }
  }

  componentWillMount(){
    if (this.props.token){
      this.props.setUser(this.props.token)
    }
  }

  componentDidUpdate(){
    if(this.props.token){
      this.props.setUser(this.props.token)
    }
  }

  logOut(){
    this.props.logout()
    this.props.clearUser()
    this.props.newBoard()
  }

  handleChange(event){
    this.setState({
      boardTitle: event.target.value
    })
  }

  handleButtonClick(id, e){
    this.props.setCurrentBoard(this.props.token, id)
  }

  render() {
    const {account} = this.props
    const AccountInfo =
      <div>welcome, {account.username} <button onClick={this.logOut.bind(this)}>Log Out</button>
      <hr />
      <h2>Your Boards</h2>
        {account.boards.map((board, index)=>{
          return (
            <div style={{borderRadius: 5, margin: 15, height: 100, background: "#fff", color: "#000"}} key={index} onClick={this.handleButtonClick.bind(this, board.id)}>
              {board.title}<br />
            Created at:{board.created_at}<br />
          Updated at:{board.created_at}
            </div>)
        })}
      </div>

    return (
      <div style={{paddingBottom: 50}}>
        {(!!this.props.token) ? AccountInfo :
          <div>
            <AccountInput register={this.props.register} />
            <Login login={this.props.login} />
           </div>
         }
        <button onClick={this.props.newBoard}>New Board</button>
      </div>);
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

const ConnectedAccount = connect(mapStateToProps, mapDispatchToProps)(Account)

export default ConnectedAccount
