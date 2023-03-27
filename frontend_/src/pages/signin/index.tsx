import { signIn } from "next-auth/react";
import Image from "next/image";


export default function SignIn() {
  const socialLogin = (e :any, provider :any) => {
    e.preventDefault();
    signIn(provider); 
  }


  
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      
    </div>

    
  )

}