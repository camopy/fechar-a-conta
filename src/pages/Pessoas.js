import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List} from 'material-ui/List';
import Pessoa from '../components/Pessoa';
import PessoaStore from '../stores/PessoaStore';

class Pessoas extends Component {
  constructor() {
    super();
    this.state = {
      pessoas: PessoaStore.getAll()
    }
  }
  render() {
    const { pessoas } = this.state;
    const PessoaComponents = pessoas.map((pessoa) => {
        return <Pessoa key={pessoa.id} {...pessoa}/>;
    });

    return (
      <div className="Pessoas">
        <MuiThemeProvider>        
          <List>            
            {PessoaComponents}
          </List>       
        </MuiThemeProvider>   
      </div>
    );
  }
}

export default Pessoas;
