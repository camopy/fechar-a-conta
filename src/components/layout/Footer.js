import React, { Component } from 'react';
import "./Footer.css";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';

class Footer extends Component {

  constructor() {
    super();
    this.state = {
      selectedIndex: 0,
    };

    this.select = (index) => this.setState({selectedIndex: index}); 
  }

  navigate(pos, route) {
    this.select(pos);
    this.context.router.push({pathname: route});
  }

  render() {
    const recentsIcon = <FontIcon className="material-icons">people</FontIcon>;
    const favoritesIcon = <FontIcon className="material-icons">receipt</FontIcon>;    
    
    return (
      <div className="Footer">
        <MuiThemeProvider>
          <Paper zDepth={1}>
            <BottomNavigation selectedIndex={this.state.selectedIndex}>
              <BottomNavigationItem
                label="Pessoas"
                icon={recentsIcon}
                onTouchTap={() => this.navigate.bind(this)(0, "/pessoas")}
              />
              <BottomNavigationItem
                label="Itens"
                icon={favoritesIcon}
                onTouchTap={() => this.navigate.bind(this)(1, "/itens")}              
              />
            </BottomNavigation>
          </Paper>
        </MuiThemeProvider>
      </div>
    );
  }
}

Footer.contextTypes = {
  router: React.PropTypes.object.isRequired
};

export default Footer;
