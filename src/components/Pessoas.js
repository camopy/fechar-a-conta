import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List, ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

class Pessoas extends Component {
  render() {
    var pessoas = [
      {nome: "Paulo", valorPago: 0},
      {nome: "Fran", valorPago: 0},
      {nome: "Stones", valorPago: 0},
      {nome: "Diego", valorPago: 0},
      {nome: "Ligia", valorPago: 0},
      {nome: "Foca", valorPago: 0},
    ]
    var indents = [];
    pessoas.forEach(function(element, key) {
      var valorTotal = "Valor Total: R$14,00"
      var valorPago = "Valor Pago: R$" + element.valorPago
      
      indents.push(
        <ListItem    
          key={key}       
          primaryText={element.nome}
          secondaryText={valorTotal + " - " + valorPago}
          rightIcon={<FontIcon className="material-icons">delete</FontIcon>}
        />    
      );
    }, this);

    return (
      <div className="Pessoas">
        <MuiThemeProvider>        
          <List>            
            {indents}
          </List>       
        </MuiThemeProvider>   
      </div>
    );
  }
}

export default Pessoas;
