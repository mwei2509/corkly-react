import React from 'react';
import PublicCorkboardElement from './PublicCorkboardElement'
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import Image from 'react-image-file'
import { Link} from 'react-router-dom'
import { push } from 'react-router-redux'

import { changeBoardAttributes, publish, addBoardElement, updateElement, createBoard, deleteElement, updateBoard, updateTitle, deleteBoard, setCurrentBoard, newBoard, setPublicBoard } from '../actions'
import Collaborator from './Collaborator'

import FontAwesome from 'react-fontawesome';
import corkboardImage from '../imgs/corkboard.jpg'
import CopyToClipboard from 'react-copy-to-clipboard';
import ReactTooltip from 'react-tooltip'
import { CorklyReact } from './constants'

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
    const shareLink=<span data-tip="Share public board link"  style={{ borderRadius: 5, fontSize: 12, padding: 4, paddingLeft: 5,
      background: "rgba(255,255,255,0.3)", top: -10 }}><input type="text"
      style={{border: 0, outline: 0, background: "none", width: 275}}
      value={`${CorklyReact}${this.props.board.url}`} />
    <CopyToClipboard text={`${CorklyReact}${this.props.board.url}`}>
        <button className="icon-button"><FontAwesome name="clipboard" /></button>
      </CopyToClipboard>
    </span>
    const viewPrivate = <Link data-tip="View private board to edit" to={`/${this.props.account.username}/b/${this.props.boardId}`}>
      <button data-tip="View private board to edit" style={{fontSize: 20}} className="icon-button">
      <FontAwesome name="edit" /></button></Link>

    const corkboardStyle={
      background: `url(${corkboardImage})`,
    }

    return (
      <div style={corkboardStyle} className="corkboard-container">
        <input
          className="title-text"
          placeholder="title your corkly"
          type="text" value={this.props.board.title}
          />
        <span style={{display: "block", position: "relative"}}>{this.props.token ? (this.props.boardAccounts.filter((account)=>{return account.id==this.props.account.id}).length>0 ? <span>{viewPrivate}</span>:null):null}{shareLink}</span>
        <ReactTooltip place="bottom" type="dark" effect="float"/>

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
