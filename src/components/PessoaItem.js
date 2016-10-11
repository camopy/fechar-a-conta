import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
// import {ListItem} from 'material-ui/List';
// import Paper from 'material-ui/Paper';
import * as PessoaActions from "../actions/PessoaActions";

class PessoaItem extends Component {
  constructor(){
    super();
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(){
    PessoaActions.updateItemPessoa(this.props.pessoa, this.props.checked, this.props.itemId)
  }
  
  render() {
    const { pessoa, checked } = this.props;
    const style = {
      marginBottom: 16,
    };

    return (        
      <Checkbox
        label={pessoa.nome}
        checked={checked}
        style={style}
        onCheck={this.handleCheck}
      />      
    );
  }
}

export default PessoaItem;