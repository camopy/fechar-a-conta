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

export function updatePessoa(pessoa, checked, itemId) {
  dispatcher.dispatch({
    type: "UPDATE_PESSOA",
    pessoa,
    checked,
    itemId
  });
}