import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {List} from 'material-ui/List';
import Pessoa from '../components/Pessoa';

class Pessoas extends Component {
  render() {
    var pessoas = [
      {id: "1", nome: "Paulo", valorPago: 0},
      {id: "2", nome: "Fran", valorPago: 0},
      {id: "3", nome: "Stones", valorPago: 0},
      {id: "4", nome: "Diego", valorPago: 0},
      {id: "5", nome: "Ligia", valorPago: 0},
      {id: "6", nome: "Foca", valorPago: 0},
    ]

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
