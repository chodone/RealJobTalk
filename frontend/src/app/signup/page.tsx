import SignInForm from "@/components/SignInForm";

//여기서 반드시 form으로 감싸주어야 signincheck 부분에서 받을 수 있었다.

export default function SignInPage() {

  const url =
    `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${process.env.REACT_APP_REDIRECT_URI}&response_type=code`;
  
  return (
    <>
      <SignInForm />
    </>
    );
  
}

