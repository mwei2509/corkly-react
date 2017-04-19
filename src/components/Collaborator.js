import React from 'react'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addCollaborator } from '../actions'

class Collaborator extends React.Component{
  constructor(props){
    super(props)

    this.state={
      collaborator: ''
    }
  }

  handleChange(e){
    this.setState({
      collaborator: e.target.value
    })
  }

  handleSubmit(e){
    e.preventDefault()
  }

  render(){
    const style={
      div: {
        background: "#000"
      }, form: {
        background: "#fff"
      }
    }
    return (
      <div style={style.div}>
        <form style={style.form} onSubmit={this.handleSubmit.bind(this)}>
          <label>Collaborator Email:</label>
          <input type="email" onChange={this.handleChange.bind(this)} />
          <input type="submit" />
        </form>
      </div>)
  }
}

const mapStateToProps=(state)=>{
  return({
    boardId: state.board.boardId
  })
}

const mapDispatchToProps=(dispatch)=>{
  return bindActionCreators({
    addCollaborator: addCollaborator
  })
}

const ConnectedCollaborator = connect(mapStateToProps, mapDispatchToProps)(Collaborator)

export default ConnectedCollaborator
