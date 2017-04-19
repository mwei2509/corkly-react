import React, { Component } from 'react';
import Corkboard from './components/Corkboard'
import Account from './components/Account'
import './App.css';

class App extends Component {
  constructor(){
    super()

  }


  render() {
    // <div className="App">
    //   <Account />
    //   <Corkboard />
    // </div>
    // const corkboard = <Corkboard elements={this.state.elements}/>
    // const test = function(){return <div>hello</div>}
    return (
        <div className="App">

          <Corkboard />
        </div>
    );
  }
}

export default App;
