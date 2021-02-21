import "../globalStyles.css";
import Layout from "../components/Layout";
import Head from "next/head";
import Router from "next/router";

Router.onRouteChangeStart = (url) => {
  console.log({ url });
  NProgress.start();
};

function HackerNewsClone({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>Hacker News Clone</title>
        <meta name="viewport" content="width=device-width" />
      </Head>
      <Layout>
        <div className="appInner">
          <Component {...pageProps} />
        </div>
      </Layout>
    </>
  );
}

export default HackerNewsClone;
