import React, { Component } from 'react';

import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"

class Layout extends Component {
  render() {
    return (
      <div>                
        <Header/>
        {this.props.children}   
        <Footer/>
      </div>
    );
  }
}

export default Layout;