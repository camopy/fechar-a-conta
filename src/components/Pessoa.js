import React, { Component } from 'react';
import {ListItem} from 'material-ui/List';
import FontIcon from 'material-ui/FontIcon';
import Paper from 'material-ui/Paper';
import * as PessoaActions from "../actions/PessoaActions";

class Pessoa extends Component {
  constructor(){
    super();
    this.handleDelete = this.handleDelete.bind(this);
  }

  createPessoa(nome) {
    PessoaActions.createPessoa(nome);
  }

  handleDelete(){
    PessoaActions.deletePessoa(this.props.id)
  }
  
  render() {
    const { nome, valorPago } = this.props;
    const style = {
      height: 70,
      width: '97%',
      margin: 5,
    };

    var valorTotal = "Valor Total: R$14,00"
    var stValorPago = "Valor Pago: R$" + valorPago

    return (
      <Paper style={style} zDepth={1}>
        <ListItem              
          primaryText={nome}
          secondaryText={valorTotal + " - " + stValorPago}
          rightIcon={<FontIcon className="material-icons" onClick={this.handleDelete}>delete</FontIcon>}
        />
      </Paper>
    );
  }
}

export default Pessoa;