import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PessoaStore extends EventEmitter {
  constructor() {
    super()
    this.pessoas = this.getPessoas();
  }

  getPessoas() {
    return localStorage.getItem("pessoas") != null ? JSON.parse(localStorage.getItem("pessoas")) : [];
  }

  setPessoas(pessoas) {
    localStorage.setItem("pessoas", JSON.stringify(pessoas));
  }

  updateValorPago(id, valorPago){
    var pessoaEditar = this.pessoas.find(function(pessoa){
      return pessoa.id === id
    });
    const index = this.pessoas.indexOf(pessoaEditar);
    this.pessoas[index].valorPago = valorPago;
    this.setPessoas(this.pessoas);
    this.emit("change");
  }

  updateItemPessoa(objPessoa, checked, itemId){
    var pessoaEditar = this.pessoas.find(function(pessoa){
      return pessoa.id === objPessoa.id
    });
    const index = this.pessoas.indexOf(pessoaEditar);
    if(!checked){
      pessoaEditar.itens.push(itemId);
      this.pessoas[index] = pessoaEditar;
      this.setPessoas(this.pessoas); 
    }
    else{
      pessoaEditar.itens = pessoaEditar.itens.filter(function(item){
        return item !== itemId
      })
      this.pessoas[index] = pessoaEditar;
      this.setPessoas(this.pessoas);
    }
    this.emit("changeItensPessoa");
  }

  createPessoa(nome) {
    const id = Date.now();

    this.pessoas.push({
      id,
      nome,
      valorPago: 0
    });

    this.setPessoas(this.pessoas);
    this.emit("change");
  }

  deletePessoa(id) {
    this.pessoas = this.pessoas.filter(function(pessoa) {
        return pessoa.id !== id;
    });
    this.setPessoas(this.pessoas);
    this.emit("change");
  }

  getAll() {
    return this.pessoas;
  }

  clearAllData() {
    this.pessoas = [];
    this.setPessoas(this.pessoas);
    this.emit("change");
  }

  handleActions(action){
    switch (action.type) {
      case "CREATE_PESSOA": {
        this.createPessoa(action.nome);
        break;
      }
      case "DELETE_PESSOA": {
        this.deletePessoa(action.id)
        break;
      }
      case "UPDATE_ITEM_PESSOA": {
        this.updateItemPessoa(action.pessoa, action.checked, action.itemId)
        break;
      }
      case "UPDATE_VALOR_PAGO": {
        this.updateValorPago(action.id, action.valorPago)
        break;
      }
      case "CLEAR_DATA": {
        this.clearAllData();
        break;
      }
      default:
        break;        
    }
  }
}

const pessoaStore = new PessoaStore();
dispatcher.register(pessoaStore.handleActions.bind(pessoaStore));

export default pessoaStore;