import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List} from 'material-ui/List';
import Item from '../components/Item';

class Itens extends Component {
  render() {
    var itens = [
      {id: "1", nome: "Cerveja", valorUnitario: 6, quantidade: 6},
      {id: "2", nome: "Catuaba", valorUnitario: 12, quantidade: 2},
      {id: "3", nome: "Vodka", valorUnitario: 22, quantidade: 1},
    ]

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
