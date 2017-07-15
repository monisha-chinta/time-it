import axios from 'axios';

export function addUser(fbUser) {
    var url = 'http://localhost:3001/user/';
    var user = {
      userId: fbUser.id,
      name: fbUser.name,
      displayPicture: fbUser.picture.data.url
    }
    return axios.post(url, user);
}
