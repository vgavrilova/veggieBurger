import axios from "axios";

const instance = axios.create({
  baseURL: "https://veggie-burger-dcb7c.firebaseio.com/",
});

export default instance;
