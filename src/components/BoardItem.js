import React from 'react'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class BoardItem extends React.Component{
  constructor(){
    super()

    this.state={
      hoverState: false
    }
  }

  hoverOn(){
    this.setState({
      hoverState: true
    })
  }

  hoverOff(){
    this.setState({
      hoverState: false
    })
  }

  render(){
    const {board} = this.props
    return(
      <div style={{background: board.currentcolor,
          opacity: (this.state.hoverState || this.props.boardId === board.id) ? 1: .4,}}
        className="board-list-items"
        onMouseEnter={this.hoverOn.bind(this)}
        onMouseLeave={this.hoverOff.bind(this)}>
        <span>{board.public ? "public":"private"}</span>
        <h4>{board.title}</h4>
        <p>Created: {board.created_at}<br />
        Updated: {board.updated_at}</p>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return ({
    token: state.manageLogin.token,
    account: state.account,
    boardId: state.board.boardId
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({

  }, dispatch)
}

const ConnectedBoardItem = connect(mapStateToProps, mapDispatchToProps)(BoardItem)

export default ConnectedBoardItem
