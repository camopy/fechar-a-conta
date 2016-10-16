import dispatcher from "../dispatcher";

export function toggleDezPorCento(toggled) {
  dispatcher.dispatch({
    type: "TOGGLE_DEZ_POR_CENTO",
    toggled
  });
}