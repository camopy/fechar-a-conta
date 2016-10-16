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

export function updateValorPago(id, valorPago) {
  dispatcher.dispatch({
    type: "UPDATE_VALOR_PAGO",
    id,
    valorPago
  });
}