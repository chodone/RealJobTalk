import '../styles/globals.css'
import Layout from "@components/Layout"
import type { AppProps } from 'next/app'
import { RecoilRoot, atom, selector, useRecoilState, useRecoilValue} from 'recoil';


function MyApp({
  Component,
  pageProps : { session, ...pageProps },
}: AppProps) {
  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  );
}

export default MyApp
