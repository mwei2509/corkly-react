import React from 'react';
import CorkboardElement from './CorkboardElement'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { addBoardElement, updateElement, createBoard, deleteElement, updateBoard, addOwner, updateTitle, setCurrentBoard } from '../actions'

import Account from './Account'
import FontAwesome from 'react-fontawesome';
import corkboardImage from '../imgs/corkboard.jpg'

class Corkboard extends React.Component {
  constructor(){
    super()
    this.deleteSticky = this.deleteSticky.bind(this)
    this.addSticky = this.addSticky.bind(this)
    this.contentChange = this.contentChange.bind(this)
    this.createBoard = this.createBoard.bind(this)
    this.saveBoard = this.saveBoard.bind(this)
    this.addCoOwner = this.addCoOwner.bind(this)
    this.handleChange = this.handleChange.bind(this)

    this.state={
      boardTitle: '',
      coOwnerText: ''
    }
  }

  deleteSticky(EID){
    this.props.deleteElement(EID)
  }

  addSticky(e){
    this.props.addBoardElement({
      x: e.clientX,
      y: e.clientY,
      width: "150px",
      height: "100px",
      bgcolor: "#fff",
      content: '',
      EID: this.props.boardElements.length
    })
  }

  componentWillMount(){
    let {corkboardId} = this.props.match.params
    if (corkboardId){
      this.props.setCurrentBoard(this.props.token, corkboardId)
    }
  }

  componentWillReceiveProps(nextProps){
    let {corkboardId} = nextProps.match.params
    if (corkboardId && corkboardId !== this.props.match.params.corkboardId){
      this.props.setCurrentBoard(this.props.token, corkboardId)
    }
  }

  componentDidUpdate(prevProps, prevState){
     if(this.props.token && prevProps.token !== this.props.token){
       this.props.setCurrentBoard(this.props.token, this.props.match.params.corkboardId)
     }
   }

  contentChange(e, EID){
    this.props.updateElement({element: {EID: EID, content: e.target.value}})
  }

  titleChange(event){
    this.props.updateTitle(event.target.value)
  }

  createBoard(event){
    event.preventDefault()
    this.props.createBoard(this.props.token, {board: {title: this.props.title, elements_attributes: this.props.boardElements, id: this.props.boardId}})
  }

  saveBoard(){
    this.props.updateBoard(this.props.token, {board: {title: this.props.title, id: this.props.boardId, elements_attributes: this.props.boardElements}})
  }

  addCoOwner(id, e){
    e.preventDefault()
    this.props.addOwner(this.props.token, {id: id, username: this.state.coOwnerText})
  }

  handleChange(e){
    this.setState({
      coOwnerText: e.target.value
    })
  }

  render() {

    let showElements = this.props.boardElements.map((element) => {
        return(<CorkboardElement
            key={element.EID}
            element={element}
            resizeSticky={this.resizeSticky}
            deleteSticky={() => this.deleteSticky(element.EID)}
            contentChange={this.contentChange} />)
    })

    const saveButton = <span style={{display: "block"}}><button style={{fontSize: "20px"}} className="icon-button" onClick={this.saveBoard}>
      <FontAwesome name="floppy-o" /></button></span>
    const createButton = <span style={{display: "block"}}><button style={{fontSize: "20px"}} className="icon-button" onClick={this.createBoard}>
      <FontAwesome name="floppy-o" /></button></span>
    const enterTitle=<span style={{display: "block"}}>Pleae enter a title to save this board</span>

    const corkboardStyle={
      width: "100vw",
      height: "100vh",
      position: "absolute",
      top: 0,
      left: 0,
      padding: 0,
      margin: 0,
      background: `url(${corkboardImage})`,
      overflow: 'hidden',
      userSelect: 'none',
      zIndex: -1
    }

    return (
      <div onDoubleClick={this.addSticky} style={corkboardStyle} className="corkboard-container">
        <input
          style={{
            fontSize: "30px",
            background: "none",
            border: "none",
            outline: "none",
            color: "#fff",
            borderBottom: "2px solid #000",
            fontFamily: "Lobster",
            textShadow: "1px 1px 1px #000",
            textAlign: "center"
          }}
          placeholder="title your corkly"
          type="text" value={this.props.title}
          onChange={this.titleChange.bind(this)}
          />
        {this.props.boardId ? saveButton : (this.props.title ? createButton: enterTitle )}


          <form onSubmit={this.addCoOwner.bind(null, this.props.boardId)} >
            <label>Co-owner's name</label>
            <input type="text" onChange={this.handleChange} />
            <input type="submit" />
          </form>

        {showElements}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    boardElements: state.board.boardElements,
    boardId: state.board.boardId,
    title: state.board.title,
    token: state.manageLogin.token
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    addBoardElement: addBoardElement,
    updateElement: updateElement,
    createBoard: createBoard,
    deleteElement: deleteElement,
    updateBoard: updateBoard,
    updateTitle: updateTitle,
    addOwner: addOwner,
    setCurrentBoard: setCurrentBoard
  }, dispatch)
}

const ConnectedCorkboard = connect(mapStateToProps, mapDispatchToProps)(Corkboard)

export default ConnectedCorkboard
