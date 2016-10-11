import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import ItemStore from '../stores/ItemStore';
import ItemPessoa from './ItemPessoa';
import * as PessoaActions from "../actions/PessoaActions";

class Pessoa extends Component {
  constructor(props){
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleValorPago = this.handleValorPago.bind(this);
    this.state = {
      allItens: ItemStore.getAll(),
      valorPago: props.valorPago
    }
  }

  handleDelete(){
    PessoaActions.deletePessoa(this.props.id)
  }

  handleValorPago(event) {
    this.setState({
      valorPago: event.target.value,
    });
    PessoaActions.updateValorPago(this.props.id, event.target.value || 0);
  };

  calcularValorTotal(id, allItens){
    var valorTotal = 0;

    const itensPessoa = allItens.filter(function(item){
      return item.pessoas.indexOf(id) >= 0;
    });

    itensPessoa.forEach(function(item){
      valorTotal += (item.quantidade*item.valorUnitario)/item.pessoas.length;
    });
    return valorTotal;
  }
  
  render() {
    const { id, nome, valorPago } = this.props;
    const style = {
      width: '97%',
      margin: 5,
    };
    const { allItens } = this.state;
    const ItemPessoaComponents = allItens.map((item) => {
      if(item.pessoas.indexOf(id)>=0)
        return <ItemPessoa key={item.id} {...item}/>;
      return false;
    });

    var valorTotal = this.calcularValorTotal(id, allItens);
    var valorPagar = valorTotal - valorPago


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
              value={this.state.valorPago}
              onChange={this.handleValorPago}
            />
            {ItemPessoaComponents}
          </CardText>
        </Card>
      </MuiThemeProvider>      
    );
  }
}

export default Pessoa;