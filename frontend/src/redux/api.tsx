"use client";

import axios from 'axios';

const api = axios.create({
  baseURL: "https://j8c205.p.ssafy.io",
})

export default api;