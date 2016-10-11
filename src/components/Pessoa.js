import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import ItemStore from '../stores/ItemStore';
import ItemPessoa from './ItemPessoa';
import * as PessoaActions from "../actions/PessoaActions";

class Pessoa extends Component {
  constructor(){
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.getItens = this.getItens.bind(this);    
    this.state = {
      itens: ItemStore.getAll(),
    }
  }

  getItens() {
    this.setState({
      itens: ItemStore.getAll()
    })
  }

  handleDelete(){
    PessoaActions.deletePessoa(this.props.id)
  }
  
  render() {
    const { nome, valorPago } = this.props;
    const style = {
      width: '97%',
      margin: 5,
    };

    var valorTotal = 14
    var valorPagar = valorTotal - valorPago

    const { itens } = this.state;
    const ItemPessoaComponents = itens.map((item) => {
        return <ItemPessoa key={item.id} {...item}/>;
    });

    return (
      <MuiThemeProvider>
        <Card style={style}>
          <CardHeader
            title={nome}
            subtitle={"Total: R$" + valorTotal + " - Restante: R$" + valorPagar}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
          <TextField
              floatingLabelText="Valor pago"
              fullWidth={true}
              // value={this.state.nome}
              // onChange={this.handleChange}
            />
            {ItemPessoaComponents}
          </CardText>
        </Card>
      </MuiThemeProvider>      
    );
  }
}

export default Pessoa;