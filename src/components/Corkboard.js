import React from 'react';
import CorkboardElement from './CorkboardElement'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Image from 'react-image-file'

import { push } from 'react-router-redux'
import {
  changeBoardAttributes,
  publish,
  addBoardElement,
  updateElement,
  createBoard,
  deleteElement,
  updateBoard,
  updateTitle,
  deleteBoard,
  setCurrentBoard,
  newBoard,
  setPublicBoard
} from '../actions'
import Collaborator from './Collaborator'
import ReactTooltip from 'react-tooltip'
import FontAwesome from 'react-fontawesome';
import corkboardImage from '../imgs/corkboard.jpg'
import CopyToClipboard from 'react-copy-to-clipboard';

class Corkboard extends React.Component {
  constructor(){
    super()
    this.addSticky = this.addSticky.bind(this)
    this.contentChange = this.contentChange.bind(this)
    this.createBoard = this.createBoard.bind(this)
    this.saveBoard = this.saveBoard.bind(this)
    this.handleDelete = this.handleDelete.bind(this)

    this.state={
      boardTitle: ''
    }
  }

  addSticky(e){
    if(e.target.className === "corkboard-container"){
      this.props.addBoardElement({
        x: e.clientX,
        y: e.clientY,
        width: "150px",
        height: "100px",
        bgcolor: this.props.board.currentColor,
        content: '',
        EID: this.props.boardElements.length,
        zIndex: this.props.boardElements.length,
        is_image: false,
        image_blob: null
      })
    }
  }

  componentWillMount(){
    let {corkboardId} = this.props.match.params
    if (corkboardId){
      this.props.setCurrentBoard(this.props.token, corkboardId)
    }
  }

  componentWillReceiveProps(nextProps){
    let {corkboardId} = nextProps.match.params
    //check logged in
    if(nextProps.token){
      //logged in
      //check board exists
      if(nextProps.boardId){
        //board exists
        //check params
        if (corkboardId && corkboardId === "new" && corkboardId !== this.props.match.params.corkboardId){
          // routes == /:user/b/new && you JUST navigated there
          this.props.newBoard()
        } else if (!this.props.boardAttributes.error && nextProps.boardAttributes.error) {
          // if there are errors, take you to a new board. ie: you don't have permission to access the board?
            this.props.push(`/${this.props.account.username}/b/new`)
        } else if (corkboardId && corkboardId !== this.props.match.params.corkboardId){
          // routes == /:users/b/:boardId && if you just clicked on a link to a board
          this.props.setCurrentBoard(this.props.token, corkboardId)
        } else if (this.props.match.params.corkboardId !== nextProps.boardId && nextProps.boardId && this.props.boardId !== nextProps.boardId){
          // both a new route && new data. Saving a new board triggers this.
            this.props.push(`/${this.props.account.username}/b/${nextProps.boardId}`)
          }
      }else{
        //board doesn't exist
        if (this.props.match.params.corkboardId === "new" && corkboardId !== "new") {
          // going from /:user/b/new to :user/b/:boardId will set board correctly
          this.props.setCurrentBoard(this.props.token, corkboardId)
        } else if (this.props.account.id === '' && nextProps.account.id !== ''){
          // logging in redirects to /:user
          this.props.push(`/${nextProps.account.username}`)
        }
      }
    }else{
      //not logged in
      // DO A THING redirect to home page unless going to public board.
    }
  }

  componentWillUpdate(nextProps){
    if (!nextProps.token && this.props.match.params.corkboardId) {
      this.props.history.push(`/${this.props.account.username}`)
    }
  }

  componentDidUpdate(prevProps, prevState){
    let {corkboardId} = this.props.match.params
    if(corkboardId && corkboardId!=="new" && this.props.token && prevProps.token !== this.props.token){
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
    let boardElements = this.props.boardElements
    boardElements.sort((elA, elB) => elA.zIndex - elB.zIndex)
    let zSort = boardElements.map((el, index) => Object.assign({}, el, {zIndex: index}))
    this.props.createBoard(this.props.token, {board: {title: this.props.board.title, currentcolor: "#FFEB3B", elements_attributes: zSort, id: this.props.boardId, currentColor: this.props.board.currentColor}})
  }

  publish(event){
    this.props.publish(this.props.token, {board: {id: this.props.boardId}})
  }

  handleDelete(id){
    this.props.deleteBoard(this.props.token, {id: id})
    this.props.history.push(`/${this.props.account.username}`)
  }

  saveBoard(){
    let boardElements = this.props.boardElements
    boardElements.sort((elA, elB) => elA.zIndex - elB.zIndex)
    let zSort = boardElements.map((el, index) => Object.assign({}, el, {zIndex: index}))
    this.props.updateBoard(this.props.token, {board: {title: this.props.board.title, currentcolor: this.props.board.currentColor, id: this.props.boardId, elements_attributes: zSort, color: this.props.boardAttributes.currentColor}})
  }

  render() {
    let showElements = this.props.boardElements.map((element) => {
        return(<CorkboardElement
            key={element.EID}
            element={element}
            resizeSticky={this.resizeSticky}
            deleteSticky={this.props.deleteElement.bind(this, element.EID)}
            contentChange={this.contentChange}
            zIndex={element.zIndex ? element.zIndex : 1}/>)
    })

    const saveButton = <button data-tip="Save board" data-for="corkboard-operations" style={{fontSize: "20px"}} className="icon-button" onClick={this.saveBoard}>
      <FontAwesome name="floppy-o" /></button>
    const createButton = <span data-tip="Create board" data-for="corkboard-operations" style={{display: "block"}}><button style={{fontSize: "20px"}} className="icon-button" onClick={this.createBoard}>
      <FontAwesome name="floppy-o" /></button></span>
    const deleteButton =<button data-tip="Delete board" data-for="corkboard-operations" style={{fontSize: "20px"}} className="icon-button" onClick={this.handleDelete.bind(null, this.props.boardId)}>
      <FontAwesome name="trash" /></button>
    const addUser=<button data-tip="Add a Collaborator" data-for="corkboard-operations" style={{fontSize: "20px"}} className="icon-button"
      onClick={this.props.changeBoardAttributes.bind(this, {showCollabForm: !this.props.boardAttributes.showCollabForm})}>
      <FontAwesome name="user" /></button>
    const publishButton=<button data-tip="Publish board!" data-for="corkboard-operations" style={{fontSize: "20px"}} className="icon-button" onClick={this.publish.bind(this)}>
      <FontAwesome name="share" /></button>
    const shareLink=<span style={{ borderRadius: 5, fontSize: 12, padding: 4, paddingLeft: 5,
      background: "rgba(255,255,255,0.3)", top: -10 }}><input type="text"
      style={{border: 0, outline: 0, background: "none"}}
      value={`http://troubled-offer.surge.sh${this.props.board.url}`} />
    <CopyToClipboard text={`http://troubled-offer.surge.sh${this.props.board.url}`}>
        <button data-tip="Share link to public board!" data-for="corkboard-operations" className="icon-button"><FontAwesome name="clipboard" /></button>
      </CopyToClipboard>
    </span>

    const enterTitle=<span style={{display: "block"}}><strong>Please enter a title to save this board</strong></span>
    const pleaseLogin=<span style={{display: "block"}}><strong>Must be logged in to save or edit this board</strong></span>

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
            textAlign: "center",
            position: "relative",
            zIndex: "1000"
          }}
          className="title-text"
          placeholder="title your corkly"
          type="text" value={this.props.board.title}
          onChange={this.titleChange.bind(this)}
          />
        {this.props.token ? (this.props.boardId ? <span style={{display: "block", position: "relative"}}>{saveButton}{deleteButton}{addUser}{this.props.board.public ? shareLink : publishButton}</span> : (this.props.board.title ? createButton : enterTitle)) : pleaseLogin}
        {this.props.boardAttributes.showCollabForm ? <Collaborator /> : null}
        {showElements}
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    account: state.account,
    board: state.board,
    boardElements: state.board.boardElements,
    boardAccounts: state.board.accounts,
    boardId: state.board.boardId,
    token: state.manageLogin.token,
    boardAttributes: state.boardAttributes
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    setPublicBoard: setPublicBoard,
    addBoardElement: addBoardElement,
    updateElement: updateElement,
    createBoard: createBoard,
    deleteElement: deleteElement,
    updateBoard: updateBoard,
    updateTitle: updateTitle,
    setCurrentBoard: setCurrentBoard,
    deleteBoard: deleteBoard,
    newBoard: newBoard,
    changeBoardAttributes: changeBoardAttributes,
    publish: publish,
    push: push
  }, dispatch)
}

const ConnectedCorkboard = connect(mapStateToProps, mapDispatchToProps)(Corkboard)

export default ConnectedCorkboard
