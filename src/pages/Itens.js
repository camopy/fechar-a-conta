import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Item from '../components/Item';
import ItemStore from '../stores/ItemStore';
import * as ItemActions from "../actions/ItemActions";

class Itens extends Component {
  constructor() {
    super();
    this.getItens = this.getItens.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      itens: ItemStore.getAll(),
      nome: ''
    }
  }

  componentWillMount() {
    ItemStore.on("change", this.getItens);
  }

  componentWillUnmount() {
    ItemStore.removeListener("change", this.getItens);
  }

  getItens() {
    this.setState({
      itens: ItemStore.getAll()
    })
  }

  createItem(nome) {
    ItemActions.createItem(nome);
  }

  handleChange(event) {
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
                  onChange={this.handleChange}
                />
              </div>
            </MuiThemeProvider>
          </form>
        </div>
        <div>
          <MuiThemeProvider>    
            <List>            
              {ItemComponents}
            </List>          
          </MuiThemeProvider>
        </div>
      </div>
    );
  }
}

export default Itens;
