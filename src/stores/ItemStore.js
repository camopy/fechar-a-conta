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

  createItem(nome, valorUnitario, quantidade) {
    const id = Date.now();

    this.itens.push({
      id, 
      nome,
      valorUnitario: 0,
      quantidade: 0
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

  getAll() {
    return this.itens;
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
      case "UPDATE_QUANTIDADE": {
        this.updateQuantidade(action.id, action.quantidade)
        break;
      }
      case "UPDATE_VALOR_UNITARIO": {
        this.updateValorUnitario(action.id, action.valorUnitario)
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