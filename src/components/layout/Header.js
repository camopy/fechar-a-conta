import React, { Component } from 'react';
import "./Header.css";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';
import * as HeaderActions from "../../actions/HeaderActions";

class Header extends Component {
  constructor(){
    super();
    this.handleClearData = this.handleClearData.bind(this);
  }

  handleClearData() {
    HeaderActions.clearData();
  }

  render() {
    const iconStyleRight = {position: "absolute",right: "30px",top: "10px"};

    return (
      <div className="Header">
        <MuiThemeProvider>
          <AppBar
            title="Fechar a Conta"
            showMenuIconButton={false}
            iconElementRight={<FontIcon className="material-icons" onClick={this.handleClearData}>delete</FontIcon>}
            iconStyleRight={iconStyleRight}
          />        
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Header;
