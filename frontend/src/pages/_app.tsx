import '../styles/globals.css'
import Layout from "@components/Layout"
import type { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"


function MyApp({
  Component,
  pageProps : { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session} refetchInterval={5 * 60}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}

export default MyApp
