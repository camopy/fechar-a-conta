import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import RaisedButton from 'material-ui/RaisedButton';
import {Card, CardActions, CardHeader, CardText} from 'material-ui/Card';
import TextField from 'material-ui/TextField';
import VMasker from 'vanilla-masker';
import ItemStore from '../stores/ItemStore';
import ItemPessoa from './ItemPessoa';
import * as PessoaActions from "../actions/PessoaActions";
import * as ItemActions from "../actions/ItemActions";

class Pessoa extends Component {
  constructor(props){
    super(props);
    this.getItensPessoa = this.getItensPessoa.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleValorPago = this.handleValorPago.bind(this);
    this.state = {
      allItens: ItemStore.getAll(),
      valorPago: props.valorPago,
      itensPessoa: ItemStore.getItensPessoa(props.id)
    }
  }

  componentWillMount() {
    // ItemStore.on("change", this.getItensPessoa);
    ItemStore.on("changeItensPessoa", this.getItensPessoa);
  }

  componentWillUnmount() {
    // ItemStore.removeListener("change", this.getItensPessoa);
    ItemStore.removeListener("changeItensPessoa", this.getItensPessoa);
  }

  getItensPessoa(pessoaId) {
    this.setState({
      itensPessoa: ItemStore.getItensPessoa(pessoaId)
    })
  }

  handleDelete(){
    PessoaActions.deletePessoa(this.props.id)
    ItemActions.removePessoaFromAllItens(this.props.id)
  }

  handleValorPago(event) {
    this.setState({
      valorPago: VMasker.toMoney(event.target.value, {unit: 'R$'}),
    });
    PessoaActions.updateValorPago(this.props.id, VMasker.toMoney(event.target.value).replace(",", ".") || 0);
  };

  calcularValorTotal(id, allItens, itensPessoa){
    var valorTotal = 0;

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
    const { allItens, itensPessoa } = this.state;
    const ItemPessoaComponents = allItens.map((item) => {
      if(item.pessoas.indexOf(id)>=0)
        return <ItemPessoa
         key={item.id}
         id={item.id}
         nome={item.nome}
         valorUnitario={item.valorUnitario}
         quantidade={item.quantidade}
         pessoaId={id}
      />;
      return false;
    });
    var valorTotal = this.calcularValorTotal(id, allItens, itensPessoa).toFixed(2);
    var valorPagar = (valorTotal - parseFloat(valorPago)).toFixed(2);

    return (
      <div>
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
              <p>Consumo:</p>
              {ItemPessoaComponents}
              <CardActions>            
                <RaisedButton label="Excluir Pessoa" primary={true} fullWidth={true} onClick={this.handleDelete}/>
              </CardActions>
            </CardText>
          </Card>
        </MuiThemeProvider>        
      </div>
    );
  }
}

export default Pessoa;