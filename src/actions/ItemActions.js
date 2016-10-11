import dispatcher from "../dispatcher";

export function createItem(nome) {
  dispatcher.dispatch({
    type: "CREATE_ITEM",
    nome,
  });
}

export function deleteItem(id) {
  dispatcher.dispatch({
    type: "DELETE_ITEM",
    id,
  });
}

export function updateQuantidade(id, quantidade) {
  dispatcher.dispatch({
    type: "UPDATE_QUANTIDADE",
    id,
    quantidade
  });
}

export function updateValorUnitario(id, valorUnitario) {
  dispatcher.dispatch({
    type: "UPDATE_VALOR_UNITARIO",
    id,
    valorUnitario
  });
}