import axios from "axios";

export const api = axios.create({
  //baseURL: "https://backendbt-0qxn.onrender.com/api" //url de render 
  baseURL: "http://localhost:8080/api" //url local
});
