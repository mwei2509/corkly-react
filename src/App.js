import React, { Component } from 'react';
import Corkboard from './components/Corkboard'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import AlertContainer from 'react-alert';
import Account from './components/Account'
import './App.css';

let msg

class App extends Component {
  constructor(){
    super()
    this.alertOptions = {
     offset: 14,
     position: 'bottom left',
     theme: 'dark',
     time: 5000,
     transition: 'scale'
   };
  }

  showAlert(){
      msg.show('Some text or component', {
        time: 2000,
        type: 'success',
        icon: <img src="path/to/some/img/32x32.png" />
      });
    }

  render() {
    // const corkboard = <Corkboard elements={this.state.elements}/>
    // const test = function(){return <div>hello</div>}
    return (
      <Router>
        <div className="App">
          <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
          <Route path="/accounts" component={Account}/>
          <Route exact path="/" component={Corkboard}/>
        </div>
      </Router>
    );
  }
}

export default App;
