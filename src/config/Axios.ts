import axios from "axios";

const baseURL = "http://localhost:3000";

const Axios = axios.create({
  baseURL,
});

export default Axios;