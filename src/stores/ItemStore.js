import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class ItemStore extends EventEmitter {
  constructor() {
    super()
    this.itens = this.getItens();
  }

  getItens() {
    return localStorage.getItem("itens") != null ? JSON.parse(localStorage.getItem("itens")) : [];
  }

  setItens(itens) {
    localStorage.setItem("itens", JSON.stringify(itens));
  }

  updateQuantidade(id, quantidade){
    var itemEditar = this.itens.find(function(item){
      return item.id === id
    });
    const index = this.itens.indexOf(itemEditar);
    this.itens[index].quantidade = quantidade;
    this.setItens(this.itens);
    this.emit("change");
  }

  updateValorUnitario(id, valorUnitario){
    var itemEditar = this.itens.find(function(item){
      return item.id === id
    });
    const index = this.itens.indexOf(itemEditar);
    this.itens[index].valorUnitario = valorUnitario;
    this.setItens(this.itens);
    this.emit("change");
  }

  updatePessoaItem(objPessoa, checked, itemId){
    var itemEditar = this.itens.find(function(item){
      return item.id === itemId
    });
    const index = this.itens.indexOf(itemEditar);
    if(!checked){
      itemEditar.pessoas.push(objPessoa.id);
      this.itens[index] = itemEditar;
      this.setItens(this.itens); 
    }
    else{
      itemEditar.pessoas = itemEditar.pessoas.filter(function(pessoa){
        return pessoa !== objPessoa.id
      })
      this.itens[index] = itemEditar;
      this.setItens(this.itens);
    }
    this.emit("changePessoasItem");
  }

  createItem(nome, valorUnitario, quantidade) {
    const id = Date.now();

    this.itens.push({
      id, 
      nome,
      valorUnitario: 0,
      quantidade: 1,
      pessoas: []
    })

    this.setItens(this.itens);
    this.emit("change");
  }

  deleteItem(id) {
    this.itens = this.itens.filter(function(item) {
        return item.id !== id;
    });
    this.setItens(this.itens);
    this.emit("change");
  }

  removePessoaFromAllItens(pessoaId) {
    this.itens.forEach(function(item) {
      item.pessoas = item.pessoas.filter(function(pessoa){
        return pessoa !== pessoaId;
      });
    });

    this.setItens(this.itens);
    this.emit("change");
  }

  removePessoaFromItem(itemId, pessoaId) {
    this.itens.forEach(function(item) {
      if(item.id === itemId){
        item.pessoas = item.pessoas.filter(function(pessoa){
          return pessoa !== pessoaId;
        });
      }
    });

    this.setItens(this.itens);
    this.emit("changeItensPessoa");
  }

  getAll() {
    return this.itens;
  }

  getItensPessoa(pessoaId) {
    return this.itens.filter(function(item){
      return item.pessoas.indexOf(pessoaId) >= 0;
    });
  }

  clearAllData() {
    this.itens = [];
    this.setItens(this.itens);
    this.emit("change");
  }

  handleActions(action){
    switch (action.type) {
      case "CREATE_ITEM": {
        this.createItem(action.nome);
        break;
      }
      case "DELETE_ITEM": {
        this.deleteItem(action.id)
        break;
      }
      case "UPDATE_PESSOA_ITEM": {
        this.updatePessoaItem(action.pessoa, action.checked, action.itemId)
        break;
      }
      case "UPDATE_QUANTIDADE": {
        this.updateQuantidade(action.id, action.quantidade)
        break;
      }
      case "UPDATE_VALOR_UNITARIO": {
        this.updateValorUnitario(action.id, action.valorUnitario)
        break;
      }
      case "REMOVE_PESSOA_FROM_ALL_ITENS": {
        this.removePessoaFromAllItens(action.pessoaId)
        break;
      }
      case "REMOVE_PESSOA_FROM_ITEM": {
        this.removePessoaFromItem(action.itemId, action.pessoaId)
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

const itemStore = new ItemStore();
dispatcher.register(itemStore.handleActions.bind(itemStore));

export default itemStore;