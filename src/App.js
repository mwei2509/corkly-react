import React, { Component } from 'react';
import Corkboard from './components/Corkboard'
import corkboardImage from './imgs/corkboard.jpg'
import FontAwesome from 'react-fontawesome';
import AlertContainer from 'react-alert';
import Account from './components/Account'
import './App.css';
import {  bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { newBoard } from './actions'


let msg

class App extends Component {
  constructor(){
    super()

    this.state={
      sidebarActive: false
    }
    this.alertOptions = {
     offset: 14,
     position: 'bottom left',
     theme: 'dark',
     time: 5000,
     transition: 'scale'
   };
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

  showAlert(){
      msg.show('Some text or component', {
        time: 2000,
        type: 'success',
        icon: <img src="path/to/some/img/32x32.png" />
      });
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

    const mainSidebarActive={
      position: "relative",
      left: 300
    }

    const mainSidebarInactive={
      position: "relative",
      left: 0
    }

    // <div className="App">
    //   <Account />
    //   <Corkboard />
    // </div>
    // <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
    // const corkboard = <Corkboard elements={this.state.elements}/>
    // const test = function(){return <div>hello</div>}
    return (
        <div className="App">
          <div id="sidebar-wrapper" style={this.state.sidebarActive ? sidebarActive : sidebarInactive}>
            <div style={{width: 40, textAlign:"center", padding: 0, margin: 0, float: "right", color: "#000"}} >
              <span style={{display: "block"}} onClick={this.toggleSidebar.bind(this)}>
                <FontAwesome name="reorder" />
              </span>
              <span style={{display: "block"}} onClick={this.props.newBoard.bind(this)}>
                <FontAwesome name="plus" />
              </span>
              <span style={{display: "block"}} >
                <FontAwesome name="floppy-o" />
              </span>
              {this.props.boardId ? "save" : "create"}<br />
              {this.props.token ? "logged in" : "not logged in"}
            </div>
            <div id="sidebar">
              <Account />
            </div>
          </div>
          <div id="corkboard-container">
            <Corkboard corkboardStyle={corkboardStyle}/>
          </div>
        </div>
    );
  }
}

const mapStateToProps = (state) => {
  return ({
    boardId: state.board.boardId,
    token: state.manageLogin.token
  })
}

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators({
    newBoard: newBoard
  }, dispatch)
}

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App)

export default ConnectedApp
