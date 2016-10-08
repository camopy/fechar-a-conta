import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List} from 'material-ui/List';
import TextField from 'material-ui/TextField';
import Pessoa from '../components/Pessoa';
import PessoaStore from '../stores/PessoaStore';
import * as PessoaActions from "../actions/PessoaActions";

class PessoaDetails extends Component {
  constructor() {
    super();
    // this.getPessoas = this.getPessoas.bind(this);
    // this.handleSubmit = this.handleSubmit.bind(this);
    // this.handleChange = this.handleChange.bind(this);
    // this.state = {
    //   pessoas: PessoaStore.getAll(),
    //   nome: ''
    // }
  }

  // componentWillMount() {
  //   PessoaStore.on("change", this.getPessoas);
  // }

  // componentWIllUnmount() {
  //   PessoaStore.removeListener("change", this.getPessoas);
  // }

  render() {
    return (
      <div>        
        <MuiThemeProvider>
          <TextField
            hintText="Nome"
            floatingLabelText="Adicionar pessoa"
            fullWidth={true}
          />
        </MuiThemeProvider>
      </div>
    );
  }
}

export default PessoaDetails;
