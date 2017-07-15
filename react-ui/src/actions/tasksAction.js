import axios from 'axios';
import { SERVER_URL } from '../settings/AppSettings';

export function fetchTasks(userId, date) {
  return function(dispatch) {
    var url = SERVER_URL + '/home/' + userId + '/' + date;
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
    var url = SERVER_URL + '/home/' + userId;
    return axios.post(url, task)
}

export function updateTask(userId, id, task) {
    var url = SERVER_URL + '/home/' + userId + '/' + id;
    return axios.put(url, task)
}

export function deleteTask(userId, id) {
    var url = SERVER_URL + '/home/' + userId + '/' + id;
    return axios.delete(url)
}

export function fetchAllUsersTasks(userId, date) {
  return function(dispatch) {
    var url = SERVER_URL + '/admin/' + userId + '/' + date;
    axios.get(url)
         .then((response) => {
           dispatch({type: "FETCH_USERS_TASKS_FULFILLED", payload: response.data})
         })
         .catch((error) => {
           console.log(error);
         })
  }
}
