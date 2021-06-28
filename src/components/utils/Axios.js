import axios from "axios";
// for cleaner code we creat an axios create and assign it to Axios variable that will be used in the signup.js file
const Axios = axios.create({
  baseURL:
    process.env.NODE_ENV === "development"
      ? "http://localhost:8080"
      : "deploy CLOUD ADDRESS",
  timeout: 50000,
});

export default Axios;
