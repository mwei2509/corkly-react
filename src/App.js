import React, { Component } from 'react';
import Corkboard from './components/Corkboard'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import Account from './components/Account'
import logo from './logo.svg';
import './App.css';

class App extends Component {
  constructor(){
    super()
    this.state = {
      elements: [{content: "Foo", posX: "100px", posY: "150px"},
    {content: "Butts", posX: "300px", posY: "50px"},
  {content: "Yikes", posX: "400px", posY: "500px"}]
    }
  }

  render() {
    // const corkboard = <Corkboard elements={this.state.elements}/>
    // const test = function(){return <div>hello</div>}
    return (
      <Router>
        <div className="App">
          <Link to="/accounts">Accounts</Link>
          <Link to="/corkboard">Corkboard</Link>
          <Route path="/accounts" component={Account}/>
          <Route path="/corkboard" component={Corkboard}/>
        </div>
      </Router>
    );
  }
}

export default App;
