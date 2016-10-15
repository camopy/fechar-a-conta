import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import VMasker from 'vanilla-masker';
import ItemStore from '../stores/ItemStore';
import ItemPessoa from './ItemPessoa';
import * as PessoaActions from "../actions/PessoaActions";

class Pessoa extends Component {
  constructor(props){
    super(props);
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
      valorPago: VMasker.toMoney(event.target.value, {unit: 'R$'}),
    });
    PessoaActions.updateValorPago(this.props.id, VMasker.toMoney(event.target.value).replace(",", ".") || 0);
  };

  calcularValorTotal(id, allItens){
    var valorTotal = 0;

    const itensPessoa = allItens.filter(function(item){
      return item.pessoas.indexOf(id) >= 0;
    });

    itensPessoa.forEach(function(item){
      valorTotal += (item.quantidade*parseFloat(item.valorUnitario))/item.pessoas.length;
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
    var valorTotal = this.calcularValorTotal(id, allItens).toFixed(2);
    var valorPagar = (valorTotal - parseFloat(valorPago)).toFixed(2);

    return (
      <MuiThemeProvider>
        <Card style={style}>
          <CardHeader
            title={nome}
            subtitle={"Total: " + VMasker.toMoney(valorTotal, {unit: 'R$'}) + " - Restante: " + VMasker.toMoney(valorPagar, {unit: 'R$'})}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <TextField
              floatingLabelText="Valor pago"
              fullWidth={true}
              // type="number"
              value={VMasker.toMoney(this.state.valorPago, {unit: 'R$'})}
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