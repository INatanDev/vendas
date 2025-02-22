import type { AppProps } from "next/app";
import 'bulma/css/bulma.css'
import 'components/common/loader/loader.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
