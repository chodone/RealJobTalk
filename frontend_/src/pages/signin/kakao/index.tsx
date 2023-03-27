import React, { useEffect } from "react";
import { useRouter } from "next/router";
import axios from "axios";

export default function Kakao() {
  const router = useRouter();
  const code = (router.asPath.split("?")[1] || "").split("=")[1];
  console.log(code);

  useEffect(() => {
    axios
      .post(`http://localhost:8080/api/kakao/callback`, {
        code,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">

      <h2>카카오</h2>
    </div>
  );
}
