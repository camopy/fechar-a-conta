import dispatcher from "../dispatcher";

export function clearData() {
  dispatcher.dispatch({
    type: "CLEAR_DATA"
  });
}