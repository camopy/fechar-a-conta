import React, { Component } from 'react';
import Checkbox from 'material-ui/Checkbox';
import * as ItemActions from "../actions/ItemActions";

class PessoaItem extends Component {
  constructor(){
    super();
    this.handleCheck = this.handleCheck.bind(this);
  }

  handleCheck(){
    ItemActions.updatePessoaItem(this.props.pessoa, this.props.checked, this.props.itemId)
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