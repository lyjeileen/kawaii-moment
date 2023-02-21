import 'src/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Navbar from 'components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Youtube</title>
        <meta name="description" content="A great YouTube Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
