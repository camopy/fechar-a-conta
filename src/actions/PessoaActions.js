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

// export function reloadTodos() {
//   // axios("http://someurl.com/somedataendpoint").then((data) => {
//   //   console.log("got the data!", data);
//   // })
//   dispatcher.dispatch({type: "FETCH_TODOS"});
//   setTimeout(() => {
//     dispatcher.dispatch({type: "RECEIVE_TODOS", todos: [
//       {
//         id: 8484848484,
//         text: "Go Shopping Again",
//         complete: false
//       },
//       {
//         id: 6262627272,
//         text: "Hug Wife",
//         complete: true
//       },
//     ]});
//   }, 1000);
// }