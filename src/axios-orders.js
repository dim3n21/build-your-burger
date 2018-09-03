import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://build-the-burger.firebaseio.com/'
});

export default instance;
