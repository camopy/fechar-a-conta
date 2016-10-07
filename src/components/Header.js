import React, { Component } from 'react';
import "./Header.css";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import AppBar from 'material-ui/AppBar';

class Header extends Component {
  render() {
    const iconStyleRight = {position: "absolute",right: "30px",top: "10px"};

    return (
      <div className="Header">
        <MuiThemeProvider>
          <AppBar
            title="Fechar a Conta"
            showMenuIconButton={false}
            iconElementRight={<FontIcon className="material-icons">delete</FontIcon>}
            iconStyleRight={iconStyleRight}
          />        
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Header;
