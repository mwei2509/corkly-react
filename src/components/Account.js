import React, {PropTypes} from 'react';
import axios from 'axios'
import AccountInput from './AccountInput'
import Login from './Login'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { getBoards, createBoard, setCurrentBoard } from '../actions'

class Account extends React.Component {
  constructor(props) {
    super(props);

    this.state={
      token: window.localStorage.getItem('current user'),
      boardTitle: ''
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

  handleChange(event){
    this.setState({
      boardTitle: event.target.value
    })
  }

  handleButtonClick(id, e){
    this.props.setCurrentBoard(id)
  }

  createBoard(event){
    event.preventDefault()
    this.props.createBoard({title: this.state.boardTitle})
    this.setState({
      boardTitle: ''
    })
  }



  render() {
    const {account} = this.props
    const AccountInfo =
      <div>
        <button onClick={this.logOut.bind(this)}>Log Out</button><br />
      id: {account.id}, email: {account.email}
      <hr />
        {account.boards.map((board, index)=>{
          return <li key={index}>{board.title}<button onClick={this.handleButtonClick.bind(this, board.id)}>RANDOM BUTTON</button></li>
        })}
      </div>

    return (
      <div>
        {(!!window.localStorage.getItem("current user")) ? AccountInfo :
          <div>
            <AccountInput onSubmit={this.props.getBoards.bind(this)} />
            <Login onSubmit={this.props.getBoards.bind(this)}/>
           </div>
         }
        <form onSubmit={this.createBoard.bind(this)}>
          Title: <input type="text" value={this.state.boardTitle} onChange={this.handleChange.bind(this)}/>
          <button type="submit">Create Board</button>
        </form>
      </div>);
  }
}



const mapStateToProps = (state) => {
  return ({
    account: state.account
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    getBoards: getBoards,
    createBoard: createBoard,
    setCurrentBoard: setCurrentBoard
  }, dispatch)
}

const ConnectedAccount = connect(mapStateToProps, mapDispatchToProps)(Account)

export default ConnectedAccount
