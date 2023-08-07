import axios from "axios";
const BASE_URL = "https://iroda-shop.onrender.com/api/v1";

export default axios.create({
  baseURL: BASE_URL,
});
