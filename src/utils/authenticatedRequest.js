import axios from "axios";
import { base_url } from "./environment";

let authenticatedRequest = async (options) => {
  let { method, url, token } = options;
  const headers = {
    Authorization: `Bearer ${token}`,
  };
  let response = await fetch(url, {
    method: method,
    headers: headers,
  });
  let data = await response.json();
  return data;
};

export default authenticatedRequest;
