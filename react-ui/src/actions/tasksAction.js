import axios from 'axios';

export function fetchTasks(userId, date) {
  return function(dispatch) {
    var url = 'http://localhost:3001/home/'+userId+'/'+date;
    axios.get(url)
         .then((response) => {
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

export function updateTask(userId, id, task) {
    var url = 'http://localhost:3001/home/'+ userId + '/' +id;
    return axios.put(url, task)
}

export function deleteTask(userId, id) {
    var url = 'http://localhost:3001/home/'+userId + '/' +id;
    return axios.delete(url)
}

export function fetchAllUsersTasks(userId, date) {
  return function(dispatch) {
    var url = 'http://localhost:3001/admin/'+userId+'/'+date;
    axios.get(url)
         .then((response) => {
           dispatch({type: "FETCH_USERS_TASKS_FULFILLED", payload: response.data})
         })
         .catch((error) => {
           console.log(error);
         })
  }
}
