import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import PessoaStore from '../stores/PessoaStore';
import PessoaItem from "./PessoaItem";
import * as ItemActions from "../actions/ItemActions";

class Item extends Component {
  constructor(props) {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.handleQuantidade = this.handleQuantidade.bind(this);
    this.handleValorUnitario = this.handleValorUnitario.bind(this);    
    this.state = {
      allPessoas: PessoaStore.getAll(),
      quantidade: props.quantidade,
      valorUnitario: props.valorUnitario
    }
  }  

  handleDelete(){
    ItemActions.deleteItem(this.props.id)
  }

  handleQuantidade(event) {
    this.setState({
      quantidade: event.target.value,
    });
    ItemActions.updateQuantidade(this.props.id, event.target.value || 0);
  };

  handleValorUnitario(event) {
    this.setState({
      valorUnitario: event.target.value,
    });
    ItemActions.updateValorUnitario(this.props.id, event.target.value || 0);
  };

  render() {
    const { id, nome, valorUnitario, quantidade, pessoas } = this.props;
    const style = {
      width: '97%',
      margin: 5,
    };

    var stValorTotal = "Total: R$" + (quantidade*valorUnitario || 0);

    const { allPessoas } = this.state;    
    const PessoasItemComponent = allPessoas.map((pessoa) => {
        return <PessoaItem
          key={pessoa.id} 
          pessoa={pessoa}
          checked={pessoas.indexOf(pessoa.id) >= 0 ? true : false}
          itemId={id}
        />;
    });

    return (
      <MuiThemeProvider>
        <Card style={style}>
          <CardHeader
            title={nome}
            subtitle={stValorTotal}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>
            <TextField
              floatingLabelText="Quantidade"
              fullWidth={true}
              value={this.state.quantidade}
              onChange={this.handleQuantidade}
            />
            <TextField
              floatingLabelText="Valor"
              fullWidth={true}
              value={this.state.valorUnitario}
              onChange={this.handleValorUnitario}
            />
            {PessoasItemComponent}
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default Item;