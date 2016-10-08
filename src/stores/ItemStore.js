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

  createItem(nome, valorUnitario, quantidade) {
    const id = Date.now();

    this.itens.push({
      id, 
      nome,
      valorUnitario,
      quantidade  
    })

    this.emit("change");
  }

  getAll() {
    return this.itens;
  }
}

const itemStore = new ItemStore();

//@todo remover
window.itemStore = itemStore;

export default itemStore;