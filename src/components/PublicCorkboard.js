import React from 'react';
import PublicCorkboardElement from './PublicCorkboardElement'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Image from 'react-image-file'

import { push } from 'react-router-redux'

import { changeBoardAttributes, publish, addBoardElement, updateElement, createBoard, deleteElement, updateBoard, updateTitle, deleteBoard, setCurrentBoard, newBoard, setPublicBoard } from '../actions'
import Collaborator from './Collaborator'

import FontAwesome from 'react-fontawesome';
import corkboardImage from '../imgs/corkboard.jpg'
import CopyToClipboard from 'react-copy-to-clipboard';

class PublicCorkboard extends React.Component {


  componentWillMount(){
    let {slug} = this.props.match.params
    if (slug){
      this.props.setPublicBoard(this.props.token, slug)
    }
  }

  render() {
    let showElements = this.props.boardElements.map((element) => {
        return(<PublicCorkboardElement
            key={element.EID}
            element={element}
            resizeSticky={null}
            deleteSticky={null}
            contentChange={null}
            zIndex={element.zIndex ? element.zIndex : 1}/>)
    })
    const shareLink=<span style={{ borderRadius: 5, fontSize: 12, padding: 4, paddingLeft: 5,
      background: "rgba(255,255,255,0.3)", top: -10 }}><input type="text"
      style={{border: 0, outline: 0, background: "none"}}
      value={`http://localhost:3000${this.props.board.url}`} />
    <CopyToClipboard text={`http://localhost:3000${this.props.board.url}`}>
        <button className="icon-button"><FontAwesome name="clipboard" /></button>
      </CopyToClipboard>
    </span>

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
      <div style={corkboardStyle} className="corkboard-container">
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
          />

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

const ConnectedPublicCorkboard = connect(mapStateToProps, mapDispatchToProps)(PublicCorkboard)

export default ConnectedPublicCorkboard
