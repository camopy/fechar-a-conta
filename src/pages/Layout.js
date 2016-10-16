import React, { Component } from 'react';

import Header from "../components/layout/Header"
import Footer from "../components/layout/Footer"
import * as HeaderActions from "../actions/HeaderActions";

class Layout extends Component {
  constructor() {
    super()
    this.versao = "1.2.1";
  }

  getVersao(){
    return localStorage.getItem("versaoFecharConta");
  }

  setVersao(){
    localStorage.setItem("versaoFecharConta", this.versao);
  }

  render() {
    if(this.versao !== this.getVersao()){
      this.setVersao();
      HeaderActions.clearData();
    }

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