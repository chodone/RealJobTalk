"use client";

import Image from "next/image";
import React, { FormEvent,use,useState } from "react";
import logo from "@public/images/logo.png";
import { useRouter } from "next/navigation";
import { useForm, useWatch, Control} from "react-hook-form";


interface FormData {
  email: string
  nickname: string
  password: string
  passwordConfirm: string
  message:string
}



function EmailCheckButton({ control, setEmailAva }: { control: Control<FormData>, setEmailAva:React.Dispatch<React.SetStateAction<boolean>> }) {
  const email = useWatch({
    control,
    name: "email",
    defaultValue: "default"
  });
  const emailCheck = (e: FormEvent) => {
    e.preventDefault();
    fetch("http://localhost:8082/api/member/email/check", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data === true) {
          console.log("Success:", data);
          setEmailAva(true);
        } else if (data.status === 400) {
          alert(data.message);
        }
      });
  }
    
      return (
        <button onClick={(e) => {emailCheck(e)}} className="bg-green-500 text-white rounded-md px-1 my-2 text-xs float-right">중복체크</button>
      )
    
  }

  function NicknameCheckButton({ control, setNickAva }: { control: Control<FormData>, setNickAva:React.Dispatch<React.SetStateAction<boolean>> }) {
    const nickname = useWatch({
      control,
      name: "nickname",
      defaultValue: "nickname"
    });
    const emailCheck = (e: FormEvent) => {
      e.preventDefault()
      fetch("http://localhost:8082/api/member/email/check", {
        method: "POST",
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        },
        body: JSON.stringify({nickname}),
      })
      .then((response) => response.json())
        .then((data) => {
        console.log(data)
        if (data === true) {
          console.log("Success:", data);
          setNickAva(true);
        }
        else if(data.status=== 400){
          alert(data.message)
        }
    })
      
    }
  

  return (
    <button onClick={(e) => {emailCheck(e)}} className="bg-green-500 text-white rounded-md px-1 my-2 text-xs float-right">중복체크</button>
  )
}




const SignUphtmlForm = () => {
  const [emailAva, setEmailAva] = useState(false)
  const [nickAva, setNickAva] = useState(false)

  const MainLogo = logo;
  const router = useRouter()
  const { register,
    handleSubmit,
    control,
    watch,
    formState: { isSubmitting, errors },} = useForm<FormData>({mode:"onChange"})
  
  const onSubmit = handleSubmit(({ email, nickname, password }) => {
    fetch("http://localhost:8082/api/member/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: JSON.stringify({ email, nickname, password }),
    })
    .then((response) => response.json())
    .then((data) => {
      if (data.status === 200) {
        console.log("Success:", data);
        router.push("/signin");
      }
      else {
        alert(data.message)
      }
  })

  })

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="absolute inset-0 bg-gradient-to-r from-green-300 to-green-400 shadow-lg transhtmlForm -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-md mx-auto">
            <div className=" w-96 ">
              <Image className="h-8 w-32" src={MainLogo} alt="" />
            </div>
            <div className="divide-y divide-gray-200">
              <form action="" onSubmit={onSubmit} className="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
                <div className="relative">
                  <input
                    autoComplete="off"
                    aria-invalid = {errors.email ? "true" : "false"}
                    id="email"
                    type="text"           
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Email address"
                    {...register("email", {
                      required: {
                        value: true,
                        message: "이메일을 입력해주세요.",
                      },
                      pattern: {
                        value: /\w+@\w+\.\w+/,
                        message: "Email 형식이 맞지 않습니다.",
                      },
                    })}
                    onChange={() => {setEmailAva(false)}}
                  />
                  {!emailAva ? <EmailCheckButton control={control} setEmailAva={setEmailAva} /> : <p className="text-green-700 text-xs"> 사용가능한 Email 입니다. </p>}
                  <label
                    htmlFor="email"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>  
                </div>
                <div className="relative ">
                  <input
                    {...register("nickname", {
                      required: {
                        value: true,
                        message: "닉네임을 입력해주세요.",
                      },
                    })}
                    onChange={() => {setNickAva(false)}}
                    autoComplete="off"
                    id="nickname"
                    type="text"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Nickname"
                  />
                    {!nickAva ? <NicknameCheckButton control={control} setNickAva={setNickAva} /> : <p className="text-green-700 text-xs"> 사용가능한 Nickname 입니다. </p>}
                  <label
                    htmlFor="nickname"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Nickname
                  </label>  
                </div>
                <div className="relative">
                  <input
                    {...register("password", {
                      required: {
                        value: true,
                        message: "비밀번호를 입력해주세요.",
                      },
                    })}
                    autoComplete="off"
                    id="password"
                    name="password"
                    type="password"
                    className="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                    placeholder="Password"
                  />
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
                          return "비밀번호가 일치하지 않습니다.";
                        }
                      },
                    })}
                  />
                  {errors && <p className="text-red-500 text-xs">{errors.passwordConfirm?.message}</p>}
                  <label
                    htmlFor="passwordConfirm"
                    className="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Password Confirm
                  </label>
                </div>
                <div className="relative">
                  <button className="bg-green-500 text-white rounded-md px-2 py-1">Submit</button>
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