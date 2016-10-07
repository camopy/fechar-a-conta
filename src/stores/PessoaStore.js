import { EventEmitter } from "events";

class PessoaStore extends EventEmitter {
  constructor() {
    super()
    this.pessoas = [
      {id: "1", nome: "Paulo", valorPago: 0},
      {id: "2", nome: "Fran", valorPago: 0},
      {id: "3", nome: "Stones", valorPago: 0},
      {id: "4", nome: "Diego", valorPago: 0},
      {id: "5", nome: "Ligia", valorPago: 0},
      {id: "6", nome: "Foca", valorPago: 0},
    ]
  }

  getAll() {
    return this.pessoas;
  }
}

const pessoaStore = new PessoaStore();

export default pessoaStore;