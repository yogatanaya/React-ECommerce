import React, { Component } from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import HomePage from './components/HomePage';
import CartPage from './components/CartPage';
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar/>
          <Switch>
  
            <Route exact path="/" component={HomePage} />
            <Route path="/cart" component={CartPage} />
  
          </Switch>
        </div>
      </BrowserRouter>)
  }
}

export default App;