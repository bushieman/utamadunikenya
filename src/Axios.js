import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5001/utamaduni-wa-kenya/us-central1/api", //from firebase functions
});

export default instance;
