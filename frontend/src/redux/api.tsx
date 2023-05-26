"use client";

import axios from 'axios';

const api = axios.create({
  baseURL: "https://j8c205.p.ssafy.io",
  // baseURL : "http://localhost:8082"
})

export default api;