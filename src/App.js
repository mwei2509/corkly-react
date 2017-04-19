import React, { Component } from 'react';
import Corkboard from './components/Corkboard'
import FontAwesome from 'react-fontawesome';
import AlertContainer from 'react-alert';
import Account from './components/Account'
import './App.css';
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link, Route } from 'react-router-dom'
import { newBoard, changeBoardAttributes } from './actions'
import {CirclePicker} from 'react-color'



class App extends Component {
  constructor(){
    super()

    this.state={
      sidebarActive: false,
      colorOn: false
    }

    this.alertOptions = {
     offset: 14,
     position: 'bottom left',
     theme: 'dark',
     time: 5000,
     transition: 'scale'
   };
  }


    toggleColorPicker(){
      this.setState({
        colorOn: !this.state.colorOn
      })
    }

    pickColor(color){
      this.props.changeBoardAttributes({currentColor: color.hex})
      this.setState({
        colorOn: false
      })
    }

  closeSidebar(){
    this.setState({
      sidebarActive: false
    })
  }

  toggleSidebar(){
    this.setState({
      sidebarActive: !this.state.sidebarActive
    })
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

    const mainSidebarActive={
      position: "relative",
      left: 300
    }

    const mainSidebarInactive={
      position: "relative",
      left: 0
    }


    const colorPicker=(
      <div style={{position: "absolute", top: 50, left: 50}}>
        <CirclePicker
          width={100}
          circleSize={15}
          disableAlpha={true}
          onChange={ this.pickColor.bind(this) }
         />
      </div>
    )

    return (
        <div className="App">
          {this.state.colorOn ? colorPicker : null}
          <div id="sidebar-wrapper" style={this.state.sidebarActive ? sidebarActive : sidebarInactive}>
            <div style={{width: 40, textAlign:"center", padding: 0, margin: 0, float: "right", color: "#000"}} >
              <span className="operation-buttons" onClick={this.toggleSidebar.bind(this)}>
                <FontAwesome name="reorder" />
              </span>
              <span className="operation-buttons" onClick={this.props.newBoard.bind(this)}>
                <FontAwesome name="plus" />
              </span>
              <span className="operation-buttons" >
                <FontAwesome name="floppy-o" />
              </span>
              <span
                className="operation-buttons" style={{color: this.props.boardAttributes.currentColor}}
                onClick={this.toggleColorPicker.bind(this)} >
                <FontAwesome name="circle" />
              </span>
              {this.props.boardId ? "save" : "create"}<br />
              {this.props.token ? "logged in" : "not logged in"}
            </div>
            <div id="sidebar">
              <Account />
            </div>

          </div>
          <div id="corkboard-container">
            <Route exact path="/boards" component={Corkboard}/>
            <Route path="/boards/:corkboardId" component={Corkboard}/>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    boardId: state.board.boardId,
    token: state.manageLogin.token,
    boardAttributes: state.boardAttributes
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    newBoard: newBoard,
    changeBoardAttributes: changeBoardAttributes
  }, dispatch)
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
