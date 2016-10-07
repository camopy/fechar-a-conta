import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';

class Item extends Component {
  constructor(props) {
    super();
  }  

  render() {
    const { nome, valorUnitario, quantidade } = this.props;

    var valorTotal = "Valor Total: R$" + quantidade*valorUnitario;

    return (
      <ListItem
        primaryText={nome}
        secondaryText={valorTotal}
        rightIcon={<FontIcon className="material-icons">delete</FontIcon>}
      />
    );
  }
}

export default Item;