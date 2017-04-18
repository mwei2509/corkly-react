import React, { Component } from 'react';
import Corkboard from './components/Corkboard'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Account from './components/Account'
import './App.css';

class App extends Component {
  constructor(){
    super()

  }

  render() {
    // const corkboard = <Corkboard elements={this.state.elements}/>
    // const test = function(){return <div>hello</div>}
    return (
      <Router>
        <div className="App">
          <Route path="/accounts" component={Account}/>
          <Route exact path="/" component={Corkboard}/>
        </div>
      </Router>
    );
  }
}

export default App;
