import axios from 'axios';

export function fetchTasks(userId, date) {
  return function(dispatch) {
    var url = 'http://localhost:3001/home/'+userId+'/'+date;
    axios.get(url)
         .then((response) => {
           console.log(response);
           dispatch({type: "FETCH_TASKS_FULFILLED", payload: response.data})
         })
         .catch((error) => {
           console.log(error);
         })
  }
}

export function addTask(userId, task) {
    var url = 'http://localhost:3001/home/'+userId;
    return axios.post(url, task)
}

export function deleteTask(userId, id) {
    var url = 'http://localhost:3001/home/'+userId + '/' +id;
    return axios.delete(url)
}
