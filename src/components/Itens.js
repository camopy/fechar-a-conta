import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

class Itens extends Component {
  render() {
    var itens = [
      {nome: "Cerveja", valorUnitario: 6, quantidade: 6},
      {nome: "Catuaba", valorUnitario: 12, quantidade: 2},
      {nome: "Vodka", valorUnitario: 22, quantidade: 1},
    ]
    var indents = [];
    itens.forEach(function(element, key) {
      var valorTotal = "Valor Total: R$" + element.quantidade*element.valorUnitario
      
      indents.push(
        <ListItem
          key={key}
          primaryText={element.nome}
          secondaryText={valorTotal}
          rightIcon={<FontIcon className="material-icons">delete</FontIcon>}
        />    
      );
    }, this);

    return (
      <div className="Itens">
        <MuiThemeProvider>    
          <List>            
            {indents}
          </List>          
        </MuiThemeProvider>
      </div>
    );
  }
}

export default Itens;
