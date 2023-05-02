import "../styles/globals.css";
import store from "../store/index";
import { Provider } from "react-redux";
import Layout from "@/components/layout";

export default function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}
