import axios from 'axios';
import { SERVER_URL } from '../settings/AppSettings';

export function addUser(fbUser) {
    var url = SERVER_URL + '/user/';
    var user = {
      userId: fbUser.id,
      name: fbUser.name,
      displayPicture: fbUser.picture.data.url
    }
    return axios.post(url, user);
}
