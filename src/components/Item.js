import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';

class Item extends Component {
  constructor(props) {
    super();
  }  

  render() {
    const { nome, valorUnitario, quantidade } = this.props;
    const style = {
      height: 70,
      width: '97%',
      margin: 5,
    };

    var valorTotal = "Valor Total: R$" + quantidade*valorUnitario;

    return (
      <Paper style={style} zDepth={1}>
        <ListItem
          primaryText={nome}
          secondaryText={valorTotal}
          rightIcon={<FontIcon className="material-icons">delete</FontIcon>}
        />
      </Paper>
    );
  }
}

export default Item;