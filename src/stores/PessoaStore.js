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

  getToggleDezPorCento() {
    return localStorage.getItem("toggleDezPorCento") != null ? JSON.parse(localStorage.getItem("toggleDezPorCento")) : [];
  }

  setToggleDezPorCento(toggle) {
    localStorage.setItem("toggleDezPorCento", JSON.stringify(toggle));
    this.emit("changeToggleDezPorCento");
    this.emit("change");
  }

  clearAllData() {
    this.pessoas = [];
    this.setPessoas(this.pessoas);
    this.emit("change");
    this.setToggleDezPorCento(true);
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
      case "UPDATE_VALOR_PAGO": {
        this.updateValorPago(action.id, action.valorPago)
        break;
      }
      case "TOGGLE_DEZ_POR_CENTO": {
        this.setToggleDezPorCento(action.toggled)
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