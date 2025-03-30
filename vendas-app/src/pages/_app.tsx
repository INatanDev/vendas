import type { AppProps } from "next/app";
import 'bulma/css/bulma.css'
import 'components/common/loader/loader.css'
import 'primereact/resources/primereact.min.css'
import 'primereact/resources/themes/md-light-indigo/theme.css'
import '/node_modules/primeflex/primeflex.css'

export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />;
}
