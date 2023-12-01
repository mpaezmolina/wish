import "../styles/main.css";
import Layout from "../components/layout/Layout";
import GA from "../components/GA";
import Head from "next/head";
import { Fragment } from "react";

function MyApp({ Component, pageProps }) {
  return (
    <Fragment>
      <GA />
      <Layout>
        <Head>
          <title>Wish</title>
          <meta name="description" content="Wish." />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </Fragment>
  );
}

export default MyApp;
