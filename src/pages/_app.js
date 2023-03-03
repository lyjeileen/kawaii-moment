import 'src/styles/globals.css';
import { SessionProvider } from 'next-auth/react';
import Head from 'next/head';
import Navbar from 'components/Navbar';

export default function App({ Component, pageProps }) {
  return (
    <SessionProvider session={pageProps.session}>
      <Head>
        <title>Kawaii Moment</title>
        <meta name="description" content="Kawaii Moment" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Component {...pageProps} />
    </SessionProvider>
  );
}
