import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import VMasker from 'vanilla-masker';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import * as ItemActions from "../actions/ItemActions";

class ItemPessoa extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }  

  handleDelete(){
    ItemActions.deleteItem(this.props.id)
  }

  render() {
    const { nome, valorUnitario, quantidade } = this.props;
    const style = {
      height: 70,
      width: '97%',
      margin: 5,
    };

    var valorTotal = "Valor Total: " + VMasker.toMoney(((quantidade*valorUnitario).toFixed(2) || 0), {unit: 'R$'});

    return (
      <Paper style={style} zDepth={1}>
        <ListItem
          primaryText={nome}
          secondaryText={valorTotal}
          rightIcon={<FontIcon className="material-icons" onClick={this.handleDelete}>delete</FontIcon>}
        />
      </Paper>
    );
  }
}

export default ItemPessoa;