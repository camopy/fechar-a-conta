import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {Card, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import PessoaStore from '../stores/PessoaStore';
import PessoaItem from "./PessoaItem";
import * as ItemActions from "../actions/ItemActions";

class Item extends Component {
  constructor() {
    super();
    this.handleDelete = this.handleDelete.bind(this);
    this.getPessoas = this.getPessoas.bind(this);    
    this.state = {
      pessoas: PessoaStore.getAll(),
    }
  }  

  getPessoas() {
    this.setState({
      pessoas: PessoaStore.getAll()
    })
  }

  // createItem(nome) {
  //   ItemActions.createPessoa(nome);
  // }

  handleDelete(){
    ItemActions.deleteItem(this.props.id)
  }

  render() {
    const { id, nome, valorUnitario, quantidade } = this.props;
    const style = {
      width: '97%',
      margin: 5,
    };

    var stValorTotal = "Total: R$" + (quantidade*valorUnitario || 0);

    const { pessoas } = this.state;    
    const PessoasItemComponent = pessoas.map((pessoa) => {
      const item = pessoa.itens.find(function(item){
        return item === id
      })
      return <PessoaItem 
        key={pessoa.id} 
        pessoa={pessoa}
        checked={!!item}
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
              // fullWidth={true}
              // value={this.state.nome}
              // onChange={this.handleChange}
            />
            <TextField
              floatingLabelText="Valor"
              // fullWidth={true}
              // value={this.state.nome}
              // onChange={this.handleChange}
            />
            {PessoasItemComponent}
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default Item;