import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import VMasker from 'vanilla-masker';
import PessoaStore from '../stores/PessoaStore';
import PessoaItem from "./PessoaItem";
import * as ItemActions from "../actions/ItemActions";

class Item extends Component {
  constructor(props) {
    super(props);
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
      valorUnitario: VMasker.toMoney(event.target.value, {unit: 'R$'}),
    });    
    ItemActions.updateValorUnitario(this.props.id, VMasker.toMoney(event.target.value).replace(",", ".") || 0);
  };

  render() {
    const { id, nome, valorUnitario, quantidade, pessoas } = this.props;
    const cardStyle = {
      width: '97%',
      margin: 5,
    };

    const vrUnitStyle = {
      // margin: 0,
      width: '49%'
    }

    const quantidadeStyle = {
      // margin: 0,
      marginRight: '2%',
      width: '49%'
    }

    var stValorTotal = "Total: " + VMasker.toMoney(((quantidade*valorUnitario).toFixed(2) || 0), {unit: 'R$'});

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
        <Card style={cardStyle}>
          <CardHeader
            title={nome}
            subtitle={stValorTotal}
            actAsExpander={true}
            showExpandableButton={true}
          />
          <CardText expandable={true}>          
            <TextField style={quantidadeStyle}
              floatingLabelText="Quantidade"
              // fullWidth={true}
              value={this.state.quantidade}
              onChange={this.handleQuantidade}
            />
            <TextField style={vrUnitStyle}
              floatingLabelText="Valor"
              // fullWidth={true}
              value={VMasker.toMoney(this.state.valorUnitario, {unit: 'R$'})}
              onChange={this.handleValorUnitario}
            />
            <p>Dividir com:</p>
            {PessoasItemComponent}
            <CardActions>            
              <RaisedButton label="Excluir Item" primary={true} fullWidth={true} onClick={this.handleDelete}/>
            </CardActions>
          </CardText>
        </Card>
      </MuiThemeProvider>
    );
  }
}

export default Item;