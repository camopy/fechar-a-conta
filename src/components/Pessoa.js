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
    this.getItens = this.getItens.bind(this);
    this.state = {
      allItens: ItemStore.getAll(),
      valorPago: props.valorPago
    }
  }

  getItens() {
    this.setState({
      allItens: ItemStore.getAll()
    })
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

  calcularValorTotal(){
    // console.log(this);
    return 14;
  }
  
  render() {
    const { nome, valorPago, itens } = this.props;
    const style = {
      width: '97%',
      margin: 5,
    };

    var valorTotal = this.calcularValorTotal();
    var valorPagar = valorTotal - valorPago

    const { allItens } = this.state;
    const ItemPessoaComponents = allItens.map((item) => {
      if(itens.indexOf(item.id)>=0)
        return <ItemPessoa key={item.id} {...item}/>;
      return false;
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