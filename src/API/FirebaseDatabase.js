import axios from 'axios'

const FirebaseInstance = axios.create({
    baseURL: 'https://yellowcultivator-burgerapp.firebaseio.com/'
});

export default FirebaseInstance;