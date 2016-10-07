import { EventEmitter } from "events";

class ItemStore extends EventEmitter {
  constructor() {
    super()
    this.itens = [
      {id: "1", nome: "Cerveja", valorUnitario: 6, quantidade: 6},
      {id: "2", nome: "Catuaba", valorUnitario: 12, quantidade: 2},
      {id: "3", nome: "Vodka", valorUnitario: 22, quantidade: 1},
    ]
  }

  getAll() {
    return this.itens;
  }
}

const itemStore = new ItemStore();

export default itemStore;