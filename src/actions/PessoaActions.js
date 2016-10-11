import dispatcher from "../dispatcher";

export function createPessoa(nome) {
  dispatcher.dispatch({
    type: "CREATE_PESSOA",
    nome,
  });
}

export function deletePessoa(id) {
  dispatcher.dispatch({
    type: "DELETE_PESSOA",
    id,
  });
}

export function updateItemPessoa(pessoa, checked, itemId) {
  dispatcher.dispatch({
    type: "UPDATE_ITEM_PESSOA",
    pessoa,
    checked,
    itemId
  });
}

export function updateValorPago(id, valorPago) {
  dispatcher.dispatch({
    type: "UPDATE_VALOR_PAGO",
    id,
    valorPago
  });
}