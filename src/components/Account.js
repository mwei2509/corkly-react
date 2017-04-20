import React from 'react';
import AccountInput from './AccountInput'
import Login from './Login'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { setUser, setCurrentBoard, newBoard, login, logout, register, clearUser} from '../actions'

import AccountInfo from './AccountInfo'

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      boardTitle: '',
      showLogin: false
    }
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
     if(this.props.account.update_me !== prevProps.account.update_me){
       this.props.setUser(this.props.token)
     }
   }

  toggleLogin(){
    this.setState({
      showLogin: !this.state.showLogin
    })
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

// onClick={this.handleButtonClick.bind(this, board.id)
  render() {
    const buttonStyle={
      background: "#00bcd4",
      border: 0,
      outline: 0,
      padding: 5,
      paddingLeft: 15,
      paddingRight: 15,
      borderRadius: 5,
      marginLeft: 5,
      color: "#fff"
    }
    let usernameUrl = `/${this.props.account.username}`
    return (
      <div style={{paddingBottom: 50}}>
        {(!!this.props.token) ? <Route path="/:username" component={AccountInfo} /> :
          <div>
            <button style={buttonStyle} onClick={this.toggleLogin.bind(this)}>
              {this.state.showLogin? "Register":"Log in!"}</button>
            {this.state.showLogin ? <Login login={this.props.login} />:<AccountInput register={this.props.register} />}
           </div>
         }
        <Link to={usernameUrl}><h1>CLICK ME</h1></Link>
      </div>);
  }
}



const mapStateToProps = (state) => {
  return ({
    token: state.manageLogin.token,
    account: state.account,
    boardAttributes: state.boardAttributes
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
