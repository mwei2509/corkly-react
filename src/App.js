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

    toggleSidebar(){
      console.log(this.props.boardAttributes.sidebarActive)
      this.props.changeBoardAttributes({
        sidebarActive: !this.props.boardAttributes.sidebarActive
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
      <div id="color-picker"
        style={{position: "absolute",
          top: 50, borderLeft: "2px solid #fff",
          paddingLeft: 10,
          left: this.props.boardAttributes.sidebarActive? 300 : 50}}>
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
          <div id="sidebar-wrapper" style={this.props.boardAttributes.sidebarActive ? sidebarActive : sidebarInactive}>
            <div style={{width: 40, textAlign:"center", padding: 0, margin: 0, float: "right", color: "#000"}} >
              <span className="operation-buttons" onClick={this.toggleSidebar.bind(this)}>
                <FontAwesome name="reorder" />
              </span>
              <Link to="/boards/new" >
                <span className="operation-buttons">
                  <FontAwesome name="file" />
                </span>
              </Link>
              <span
                className="operation-buttons"
                onClick={this.toggleColorPicker.bind(this)} >
                <button style={{background: this.props.boardAttributes.currentColor,
                  width: 14, height: 14, borderRadius: 7,
                  border: "1px solid #000", outline: 0}}/>
              </span>
              <span className="operation-buttons">
                <FontAwesome name="font" />
              </span>
              <span className="operation-buttons">
                <FontAwesome name="users" />
              </span>
              <span className="operation-buttons">
                <FontAwesome name="address-book" />
              </span>
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
