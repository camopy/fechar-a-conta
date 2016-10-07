import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List} from 'material-ui/List';
import Item from '../components/Item';
import ItemStore from '../stores/ItemStore';

class Itens extends Component {
  constructor() {
    super();
    this.state = {
      itens: ItemStore.getAll()
    }
  }
  render() {
    const { itens } = this.state;

    const ItemComponents = itens.map((item) => {
        return <Item key={item.id} {...item}/>;
    });

    return (
      <div className="Itens">
        <MuiThemeProvider>    
          <List>            
            {ItemComponents}
          </List>          
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Itens;
