import React, { Component } from 'react';
import Corkboard from './components/Corkboard'
import PublicCorkboard from './components/PublicCorkboard'
import About from './components/about'
import FontAwesome from 'react-fontawesome';
import Account from './components/Account'
import './App.css';
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route, Redirect, Switch} from 'react-router-dom'
import { newBoard, changeBoardAttributes, changeBoardColor } from './actions'
import {push} from 'react-router-redux'
import ReactTooltip from 'react-tooltip'
import {CirclePicker} from 'react-color'
import marbleImage from './imgs/marble.jpg'



class App extends Component {
  constructor(props){
    super(props)

    this.state={
      colorOn: false
    }
  }

  componentWillMount(){
    // if(this.props.token && !this.props.match){
    //   this.props.history.push(`/${this.props.account.username}`)
    // }

  }

    toggleColorPicker(){
      this.setState({
        colorOn: !this.state.colorOn
      })
    }

    pickColor(color){
      let board = this.props.board
      board.currentColor = color.hex
      this.props.changeBoardAttributes({currentColor: color.hex})
      this.setState({
        colorOn: false
      })
      this.props.changeBoardColor(this.props.token, board)
    }

    toggleSidebar(){
      this.props.changeBoardAttributes({
        sidebarActive: !this.props.boardAttributes.sidebarActive
      })
    }

  newBoard(){
    this.props.newBoard()
    if(this.props.token){
      this.props.push(`/${this.props.account.username}/b/new`)
    }else{
      this.props.push('/')
    }
  }
  render() {
    const sidebarActive={
      color: "#fff",
      position: "absolute",
      top: 0,
      left: 0,
      width: 300,
      zIndex: 1000
    }

    const sidebarInactive={
      color: "#fff",
      position: "absolute",
      top: 0,
      left: -260,
      width: 300,
      zIndex: 1000
    }


    const colorPicker=(
      <div id="color-picker"
        style={{position: "absolute",
          top: 50, borderLeft: "2px solid #fff",
          paddingLeft: 10,
          left: this.props.boardAttributes.sidebarActive? 300 : 50}}>
        <CirclePicker
          width={100}
          circleSize={15}
          disableAlpha={true}
          colors={["#f44336", "#e91e63", "#9c27b0",
            "#03a9f4", "#009688", "#4caf50",
            "#8bc34a", "#cddc39", "#ffeb3b",
            "#ffc107", "#ff9800", "#ff5722"]}
          onChange={ this.pickColor.bind(this) }
         />
      </div>
    )
    let errorDiv=<div className="error-div">
      {this.props.boardAttributes.error}
      </div>

    return (
        <div className="App">
          <ReactTooltip id="sidebar-operations" place="right" type="dark" effect="solid"/>
          <ReactTooltip id="corkboard-operations" place="bottom" type="dark" effect="solid"/>
          {this.props.boardAttributes.error ? errorDiv : null}
          {this.state.colorOn ? colorPicker : null}
          <div id="sidebar-wrapper" style={this.props.boardAttributes.sidebarActive ? sidebarActive : sidebarInactive}>
            <div style={{width: 40, textAlign:"center", padding: 0, margin: 0, float: "right", color: "#000"}} >
              <span data-tip="View Menu" data-for="sidebar-operations" className="operation-buttons" onClick={this.toggleSidebar.bind(this)}>
                <FontAwesome name="reorder" />
              </span>
              <span data-tip="New Board" data-for="sidebar-operations" className="operation-buttons" onClick={this.newBoard.bind(this)}>
                <FontAwesome name="file" />
              </span>
              <span
                className="operation-buttons"
                onClick={this.toggleColorPicker.bind(this)} >
                <button data-tip="Change default sticky color" data-for="sidebar-operations" className="highlight-button" style={{background: this.props.board.currentColor,
                  width: 14, height: 14, borderRadius: 7,
                  border: "1px solid #000", outline: 0}}/>
              </span>
            </div>
            <div id="sidebar" style={{background: `url(${marbleImage})`}}>
              <Account />
              <Link to="/about">
                <span className="meta" style={{fontFamily: "Lobster", color: "#fff"}}>Behind the Cork</span>
              </Link>
            </div>

          </div>
          <div id="corkboard-container">
            <Switch>
              <Route exact path="/" component={Corkboard}/>
              <Route path="/about" component={About}/>
              <Route path="/:username" component={Corkboard}/>
              <Route path="/:username/b/:corkboardId" component={Corkboard}/>
              <Route path="/:username/:slug" component={PublicCorkboard}/>
            </Switch>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    account: state.account,
    boardId: state.board.boardId,
    token: state.manageLogin.token,
    boardAttributes: state.boardAttributes,
    board: state.board
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    newBoard: newBoard,
    changeBoardAttributes: changeBoardAttributes,
    changeBoardColor: changeBoardColor,
    push: push
  }, dispatch)
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
