export default function reducer(state={
  tasks: [],
  fetching: false,
  fetched: false,
  error: null
}, action) {
  switch(action.type) {
    case "FETCH_TASKS": {
      return {...state, fetching: true}
    }
    case "FETCH_TASKS_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_TASKS_FULFILLED": {
      return {...state, fetching: false, fetched: true, tasks: action.payload}
    }
    case "FETCH_USERS_TASKS": {
      return {...state, fetching: true}
    }
    case "FETCH_USERS_TASKS_REJECTED": {
      return {...state, fetching: false, error: action.payload}
    }
    case "FETCH_USERS_TASKS_FULFILLED": {
      return {...state, fetching: false, fetched: true, tasks: action.payload}
    }
  }

  return state;
}
