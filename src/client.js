import axios from "axios";

const client = axios.create({baseURL : "http://3.85.130.74:8080"});

export default client;