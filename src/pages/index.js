import Head from 'next/head';
import prisma from 'lib/prisma';
import { getVideos } from 'lib/data';
import Navbar from '/components/Navbar';

export default function Home({ videos }) {
  return (
    <>
      <Head>
        <title>Youtube</title>
        <meata name="description" content="A great YouTube Clone" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <header>
        <Navbar />
      </header>
    </>
  );
}

export const getServerSideProps = async () => {
  let videos = await getVideos({}, prisma);
  videos = JSON.parse(JSON.stringify(videos));
  return { props: { videos } };
};
