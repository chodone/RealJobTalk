"use client";

import Image from "next/image";
import React, { FormEvent,use,useState } from "react";
import logo from "@public/images/logo.png";
import { useRouter } from "next/navigation";
import { useForm, useWatch, Control, UseFormRegister, FieldErrors } from "react-hook-form";
import { debounce } from "lodash"


interface FormData {
  email: string
  nickname: string
  password: string
  passwordConfirm: string
  message:string
}


function EmailInput({ register, errors, name }:{ register:UseFormRegister<FormData>, errors:FieldErrors<FormData>, name:string }) {
  const [check, checkState] = useState(false);
  const [available, availableState] = useState(false);
  const [overlap, overlapState] = useState(false);

  const callApi = debounce(async (value) => {
    console.log(value)
    const email = value
    await fetch("https://j8c205.p.ssafy.io/api/member/email/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        checkState(false);

        if (data === true) {
          console.log("data")
          availableState(true);
          overlapState(false);
        } else if (data.status === 400) {
          overlapState(true);
          availableState(false);
        }
      })
      .catch((err) => {
        console.debug(err);

      });
  }, 1000);



  return (
    <>
      <input
        autoComplete="off"
        id="email"
        aria-invalid={errors.email ? "true" : "false"}
        type="email"
        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
        placeholder="Email address"
        {...register("email", {
          required: {
            value: true,
            message: "Email을 입력해주세요.",
          },
          
          pattern: {
            value: /\w+@\w+\.\w+/,
            message: "Email 형식이 맞지 않습니다.",
          },

          validate: async (value) => {
            if (!errors.email) {
              checkState(true);
              await callApi(value);
              return available ? true : "중복된 Email이 존재합니다!";
            }
          },
        })}
      />
      {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
      {!errors.email && check && (
        <div className="flex justify-start">
          <p className="text-green-500 text-xs ">Email check..</p>
          <svg
            className="animate-spin -ml-1 mr-3 h-4 w-8 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="indigo"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="green"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      {!errors.email && !check && available && (
        <p className="text-green-500 text-xs">사용가능한 Email입니다!</p>
      )}
      {!errors.email && !check && overlap && (
        <p className="text-red-700 text-xs">중복된 Email이 존재합니다!</p>
      )}
      <label
        htmlFor="email"
        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
      >
        Email Address
      </label>
    </>
  );
  
}


function NicknameInput({ register, errors, name }:{ register:UseFormRegister<FormData>, errors:FieldErrors<FormData>, name:string }) {
  const [check, checkState] = useState(false);
  const [available, availableState] = useState(false);
  const [overlap, overlapState] = useState(false);

  const callApi = debounce(async (value) => {
    console.log(value)
    const nickname = value
    await fetch("https://j8c205.p.ssafy.io/api/member/nickname/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ nickname }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data)
        checkState(false);

        if (data === true) {
          console.log("data")
          availableState(true);
          overlapState(false);
        } else if (data.status === 400) {
          overlapState(true);
          availableState(false);
        }
      })
      .catch((err) => {
        console.debug(err);

      });
  }, 1000);



  return (
    <>
      <input
        autoComplete="off"
        id="nickname"
        aria-invalid={errors.email ? "true" : "false"}
        type="nickname"
        className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
        placeholder="nickname"
        {...register("nickname", {
          required: {
            value: true,
            message: "Nickname을 입력해주세요.",
          },
          
          maxLength: {
            value: 40,
            message: "Nickname은 최대 40자까지 가능합니다.",
          },

          validate: async (value) => {
            if (!errors.email) {
              checkState(true);
              await callApi(value);
              return available ? true : "중복된 Nickname이 존재합니다!";
            }
          },
        })}
      />
      {errors.nickname && <p className="text-red-500 text-xs">{errors.nickname.message}</p>}
      {!errors.nickname && check && (
        <div className="flex justify-start">
          <p className="text-green-500 text-xs ">Nickname check..</p>
          <svg
            className="animate-spin -ml-1 mr-3 h-4 w-8 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="indigo"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="green"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
            ></path>
          </svg>
        </div>
      )}
      {!errors.nickname && !check && available && (
        <p className="text-green-500 text-xs">사용가능한 Nickname입니다!</p>
      )}
      {!errors.nickname && !check && overlap && (
        <p className="text-red-700 text-xs">중복된 Nickname이 존재합니다!</p>
      )}
      <label
        htmlFor="email"
        className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
      >
        Nickname
      </label>
    </>
  );
  
}




const SignUphtmlForm = () => {
  const [emailAva, setEmailAva] = useState(false)
  const [nickAva, setNickAva] = useState(false)
  const [emailInput ,setEmailInput] = useState("")

  const MainLogo = logo;
  const router = useRouter()
  const { register,
    handleSubmit,
    watch,
    formState: { isSubmitting, errors }, } = useForm<FormData>({ mode: "onChange" })
  
    
  
  const onSubmit = handleSubmit(({ email, nickname, password }) => {
    fetch("https://j8c205.p.ssafy.io/api/member/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, nickname, password }),
    })
    .then((response) => response.json())
    .then((data ) => {
      console.log();
      if (data.status === 400) {
        alert(data.message)
      }
      else {
        console.log("Success:", data);
        router.push("/signin");
      }
    })
    .catch((err) => {
      console.debug(err);
    });
  

  })

  return (
    <div className=" animate-fade-up min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-400 shadow-lg transhtmlForm -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className=" w-96 ">
              <Image className="h-8 w-32" src={MainLogo} alt="" />
            </div>
            <div className="divide-y divide-gray-200">
              <form
                action=""
                onSubmit={onSubmit}
                className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="relative">
                  <EmailInput register={register} errors={errors} name="email" />
                </div>
                <div className="relative ">
                  <NicknameInput register={register} errors={errors} name="nickname" />
                </div>
                <div className="relative">
                  <input
                    autoComplete="off"
                    id="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                    {...register("password", {
                      required: {
                        value: true,
                        message: "비밀번호를 입력해주세요.",
                      },
                      pattern: {
                        value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/,
                        message:
                          "비밀번호는 대문자, 소문자, 특수문자, 숫자를 포함해야합니다 (8~16 글자)",
                      },
                    })}
                  />
                  {errors && <p className="text-red-500 text-xs">{errors.password?.message}</p>}
                  <label
                    htmlFor="password"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password
                  </label>
                </div>

                <div className="relative">
                  <input
                    autoComplete="off"
                    id="passwordConfirm"
                    type="password"
                    aria-invalid={errors?.passwordConfirm ? "true" : "false"}
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                    {...register("passwordConfirm", {
                      required: {
                        value: true,
                        message: "비밀번호를 입력해주세요.",
                      },
                      // pattern: {
                      //   value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,16}$/,
                      //   message: "비밀번호는 대문자, 소문자, 특수문자, 숫자를 포함해야합니다 (8~16 글자)",
                      // },
                      validate: (value) => {
                        if (value != watch("password")) {
                          console.log(watch("password"));
                          return "비밀번호가 일치하지 않습니다.";
                        }
                      },
                    })}
                  />
                  {errors && (
                    <p className="text-red-500 text-xs">{errors.passwordConfirm?.message}</p>
                  )}
                  <label
                    htmlFor="passwordConfirm"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password Confirm
                  </label>
                </div>
                <div className="relative">
                <button className="bg-green-500 h-14 w-full text-white rounded-md px-2 py-1">Submit</button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUphtmlForm;