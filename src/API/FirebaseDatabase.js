import axios from "axios";

const FirebaseInstance = axios.create({
    baseURL: "https://testproj-2d6d9.firebaseio.com/",
});

export default FirebaseInstance;
