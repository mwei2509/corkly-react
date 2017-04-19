import React, { Component } from 'react';
import Corkboard from './components/Corkboard'
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
    // <div className="App">
    //   <Account />
    //   <Corkboard />
    // </div>
    // const corkboard = <Corkboard elements={this.state.elements}/>
    // const test = function(){return <div>hello</div>}
    return (
        <div className="App">
          <Corkboard />
          <AlertContainer ref={(a) => global.msg = a} {...this.alertOptions} />
        </div>
    );
  }
}

export default App;
