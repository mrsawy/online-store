import axios from "axios";
import { base_url } from "./environment";

let authenticatedRequest = async (options) => {
  try {
    let { method, url, token, body } = options;
    if (!token) {
      token = localStorage.getItem(`token`);
    }
    const headers = {
      Authorization: `Bearer ${token}`,
      // "Content-Type": "application/json"
      // accep:`application/json`
    };
    let response = await fetch(url, {
      method: method,
      headers: headers,
      body,
    });
    let data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
  }
};





export default authenticatedRequest;
