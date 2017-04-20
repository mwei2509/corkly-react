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
      boardTitle: ''
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
     if(this.props.account.updated_at !== prevProps.account.updated_at){
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

// onClick={this.handleButtonClick.bind(this, board.id)
  render() {
    return (
      <div style={{paddingBottom: 50}}>
        {(!!this.props.token) ? <Route path="/boards" component={AccountInfo} /> :
          <div>
            <AccountInput register={this.props.register} />
            <Login login={this.props.login} />
           </div>
         }
        <Link to="/boards"><h1>CLICK ME</h1></Link>
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
