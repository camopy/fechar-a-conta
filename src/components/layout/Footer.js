import React, { Component } from 'react';
import "./Footer.css";
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Toggle from 'material-ui/Toggle';
import Divider from 'material-ui/Divider';
import FontIcon from 'material-ui/FontIcon';
import {BottomNavigation, BottomNavigationItem} from 'material-ui/BottomNavigation';
import Paper from 'material-ui/Paper';
import VMasker from 'vanilla-masker';
import ItemStore from '../../stores/ItemStore';

class Footer extends Component {

  constructor() {
    super();
    this.getValorTotalMesa = this.getValorTotalMesa.bind(this);
    this.state = {
      selectedIndex: 0,
      valorTotalMesa: ItemStore.getValorTotalMesa()
    };

    this.select = (index) => this.setState({selectedIndex: index}); 
  }

  componentWillMount() {
    ItemStore.on("updateValorTotalMesa", this.getValorTotalMesa);
  }

  componentWillUnmount() {
    ItemStore.removeListener("updateValorTotalMesa", this.getValorTotalMesa);
  }

  getValorTotalMesa() {
    this.setState({
      valorTotalMesa: ItemStore.getValorTotalMesa()
    })
  }

  navigate(pos, route) {
    this.select(pos);
    this.context.router.push({pathname: route});
  }

  render() {
    const recentsIcon = <FontIcon className="material-icons">people</FontIcon>;
    const favoritesIcon = <FontIcon className="material-icons">receipt</FontIcon>;
    const { valorTotalMesa } = this.state;    

    const valorTotalMesaStyle = {
      height: 40,
      width: '97%',
      margin: 5,
      display: 'inline-block',
    }
    const vrTotalStyle = {
      // marginRight: '2%',
      width: '40%'
    }
    const toggleStyle = {
      width: '40%',
      textAlign: 'right',
    }

    return (
      <div className="Footer">
        <MuiThemeProvider>
          <Paper zDepth={1}>
            <div style={valorTotalMesaStyle}>
              <div style={vrTotalStyle}>Valor total: {VMasker.toMoney(valorTotalMesa.toFixed(2), {unit: 'R$'})}</div>      
              <div style={toggleStyle}>
                <Toggle
                  label="10%"
                  labelPosition='left'
                  defaultToggled={true}
                />
              </div>
            </div>
            <Divider />
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
