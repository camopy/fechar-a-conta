import { EventEmitter } from "events";

import dispatcher from "../dispatcher";

class PessoaStore extends EventEmitter {
  constructor() {
    super()
    // this.pessoas = [
    //   {id: "1", nome: "Paulo", valorPago: 0},
    //   {id: "2", nome: "Fran", valorPago: 0},
    //   {id: "3", nome: "Stones", valorPago: 0},
    //   {id: "4", nome: "Diego", valorPago: 0},
    //   {id: "5", nome: "Ligia", valorPago: 0},
    //   {id: "6", nome: "Foca", valorPago: 0},
    //   {id: "7", nome: "Carlotta", valorPago: 0},
    //   {id: "8", nome: "Maíra", valorPago: 0}
    // ]
    this.pessoas = this.getPessoas();
  }

  getPessoas() {
    return localStorage.getItem("pessoas") != null ? JSON.parse(localStorage.getItem("pessoas")) : [];
  }

  setPessoas(pessoas) {
    localStorage.setItem("pessoas", JSON.stringify(pessoas));
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
  }

  getAll() {
    return this.pessoas;
  }

  clearAllData() {
    this.pessoas = [];
    this.setPessoas(this.pessoas);
  }

  handleActions(action){
    switch (action.type) {
      case "CREATE_PESSOA": {
        this.createPessoa(action.nome);
        break;
      }
      case "DELETE_PESSOA": {
        this.deletePessoa(action.id)
        this.emit("change");
        break;
      }
      case "CLEAR_DATA": {
        this.clearAllData();
        this.emit("change");
        break;
      }
      default:
        break;        
    }
  }
}

const pessoaStore = new PessoaStore();
dispatcher.register(pessoaStore.handleActions.bind(pessoaStore));

//@todo remover
window.pessoaStore = pessoaStore;
window.dispatcher = dispatcher;

export default pessoaStore;