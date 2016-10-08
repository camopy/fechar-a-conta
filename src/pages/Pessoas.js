import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Pessoa from '../components/Pessoa';
import PessoaStore from '../stores/PessoaStore';
import * as PessoaActions from "../actions/PessoaActions";

class Pessoas extends Component {
  constructor() {
    super();
    this.getPessoas = this.getPessoas.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.state = {
      pessoas: PessoaStore.getAll(),
      nome: ''
    }
  }

  componentWillMount() {
    PessoaStore.on("change", this.getPessoas);
  }

  componentWillUnmount() {
    PessoaStore.removeListener("change", this.getPessoas);
  }

  getPessoas() {
    this.setState({
      pessoas: PessoaStore.getAll()
    })
  }

  createPessoa(nome) {
    PessoaActions.createPessoa(nome);
  }

  handleChange(event) {
    this.setState({
      nome: event.target.value,
    });
  };

  handleSubmit() {
    if(/\S/.test(this.state.nome)){
      this.createPessoa(this.state.nome);
    }
    this.setState({
      nome: ''
    })
  }

  render() {
    const { pessoas } = this.state;
    const PessoaComponents = pessoas.map((pessoa) => {
        return <Pessoa key={pessoa.id} {...pessoa}/>;
    });
    const style = {
      height: 70,
      width: '97%',
      margin: 5,
    };
    const formStyle = {
      // margin: 5,
      // position: 'relative'
    }
    const pessoasStyle = {
      // overflow: 'auto',
      // overflow: 'hidden',
      // height: '500px' 
      // minHeight: '100%'
    }
    const widgetStyle = {
      // overflow: 'auto',
      // height: '500px',
      // position: 'relative'
      // minHeight: '100%',
      // paddingBottom: '180px',
    }

    return (
      <div style={widgetStyle}>
        <div style={formStyle}>
          <form onSubmit={this.handleSubmit}>
            <MuiThemeProvider>
              <div style={style}>
                <TextField
                  hintText="Nome"
                  floatingLabelText="Adicionar pessoa"
                  fullWidth={true}
                  value={this.state.nome}
                  onChange={this.handleChange}
                />
              </div>
            </MuiThemeProvider>
          </form>
        </div>
        <div style={pessoasStyle}>
          <MuiThemeProvider>                  
            <List>            
              {PessoaComponents}
            </List>       
          </MuiThemeProvider>   
        </div>
      </div>
    );
  }
}

export default Pessoas;
