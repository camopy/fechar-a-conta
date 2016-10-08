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