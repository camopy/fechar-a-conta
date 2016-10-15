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

export function updatePessoaItem(pessoa, checked, itemId) {
  dispatcher.dispatch({
    type: "UPDATE_PESSOA_ITEM",
    pessoa,
    checked,
    itemId
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

export function removePessoaFromAllItens(pessoaId) {
  dispatcher.dispatch({
    type: "REMOVE_PESSOA_FROM_ALL_ITENS",
    pessoaId
  });
}

export function removePessoaFromItem(itemId, pessoaId) {
  dispatcher.dispatch({
    type: "REMOVE_PESSOA_FROM_ITEM",
    itemId,
    pessoaId
  });
}