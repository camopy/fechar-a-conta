import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import TextField from 'material-ui/TextField';
import Item from '../components/Item';
import ItemStore from '../stores/ItemStore';
import * as ItemActions from "../actions/ItemActions";

class Itens extends Component {
  constructor() {
    super();
    this.getItens = this.getItens.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleAddItem = this.handleAddItem.bind(this);
    this.state = {
      itens: ItemStore.getAll(),
      nome: ''
    }
  }

  componentWillMount() {
    ItemStore.on("change", this.getItens);
    ItemStore.on("changePessoasItem", this.getItens);
  }

  componentWillUnmount() {
    ItemStore.removeListener("change", this.getItens);
    ItemStore.removeListener("changePessoasItem", this.getItens);
  }

  getItens() {
    this.setState({
      itens: ItemStore.getAll()
    })
  }

  createItem(nome) {
    ItemActions.createItem(nome);
  }

  handleAddItem(event) {
    this.setState({
      nome: event.target.value,
    });
  };

  handleSubmit() {
    if(/\S/.test(this.state.nome)){
      this.createItem(this.state.nome);
    }
    this.setState({
      nome: ''
    })
  }

  render() {
    const { itens } = this.state;

    const ItemComponents = itens.map((item) => {
        return <Item key={item.id} {...item}/>;
    });
    const style = {
      height: 70,
      width: '97%',
      margin: 5,
    };

    return (
      <div>
        <div>
          <form onSubmit={this.handleSubmit}>
            <MuiThemeProvider>
              <div style={style}>
                <TextField
                  hintText="Nome"
                  floatingLabelText="Adicionar item"
                  fullWidth={true}
                  value={this.state.nome}
                  onChange={this.handleAddItem}
                />
              </div>
            </MuiThemeProvider>
          </form>
        </div>
        <div>
          {ItemComponents}
        </div>
      </div>
    );
  }
}

export default Itens;