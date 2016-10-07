import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

class Pessoa extends Component {
  render() {
    const { nome, valorPago } = this.props;

    var valorTotal = "Valor Total: R$14,00"
    var stValorPago = "Valor Pago: R$" + valorPago

    return (
      <ListItem              
        primaryText={nome}
        secondaryText={valorTotal + " - " + stValorPago}
        rightIcon={<FontIcon className="material-icons">delete</FontIcon>}
      />
    );
  }
}

export default Pessoa;